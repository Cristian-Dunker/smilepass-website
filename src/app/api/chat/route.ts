import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { WIKI_TRACKS, WIKI_ARTICLES, getArticlesInTrack } from "@/data/wiki/articles";
import { sendSupportTicket } from "@/app/actions/send-support-ticket";

/**
 * /api/chat — wiki chatbot endpoint.
 *
 * - Accepts the conversation history + the page the user is on
 * - Calls Claude with the wiki content as system-prompt knowledge
 * - Provides a `create_support_ticket` tool that escalates to the Notion
 *   Support Tickets DB when the chatbot can't answer or the user asks
 * - Returns the final assistant text + (optionally) ticket-creation status
 *
 * V1 is non-streaming for simplicity: the client shows a "thinking…"
 * indicator while waiting for the JSON response. Streaming can be added
 * later by switching to `client.messages.stream` + a ReadableStream.
 */

export const runtime = "nodejs";

const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8000),
      }),
    )
    .min(1)
    .max(40),
  /** Pathname the visitor is reading when they ask. Used for ticket source. */
  pathname: z.string().max(300).optional(),
  /** Optional — passed through to support tickets when the chatbot escalates. */
  userEmail: z.string().email().max(200).optional(),
  userName: z.string().max(120).optional(),
});

/* ─────────────────────────────────────────────────────────── */
/* Build the system prompt — knowledge base baked in once per request.    */

function buildSystemPrompt(): string {
  const trackBlocks = WIKI_TRACKS
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((track) => {
      const articles = getArticlesInTrack(track.id);
      const articleBlocks = articles
        .map(
          (a) =>
            `### ${a.title} — slug: ${a.slug}\n` +
            `Lead: ${a.lead}\n\n` +
            `${a.body}\n\n` +
            `Link to this article: /wiki/${a.slug}`,
        )
        .join("\n\n---\n\n");
      return `## Track ${track.order}: ${track.title}\n${track.description}\n\n${articleBlocks}`;
    })
    .join("\n\n===\n\n");

  return `You are the SmilePass support assistant — a chatbot embedded on the SmilePass website wiki. SmilePass is a dental payments platform for Australian practices.

# Your job
Help practice staff (dentists, receptionists, admins) use SmilePass. Answer their product questions clearly and quickly using the knowledge base below. When you genuinely cannot answer, open a support ticket for them.

# Tone
- Practical and warm. Talk like a helpful colleague, not a sales rep.
- Concise — short paragraphs, lists where lists help. Don't pad.
- Australian English spelling (organisation, customise, colour).
- Never invent product features. If the knowledge base does not cover it, say so.

# Citations
When you answer from the knowledge base, end your reply with a "Read more:" line listing the relevant article links, e.g.
"Read more: [Adding new members](/wiki/adding-members)"
Only cite articles that genuinely informed your answer. Maximum 3 cites.

# Escalation rule
Use the create_support_ticket tool when ANY of these are true:
1. The question is not covered by the knowledge base
2. The user explicitly asks for human help, or asks to "open a ticket", "talk to support", etc.
3. The user reports a bug, a billing error, or anything that needs a human to investigate

Before opening a ticket:
- If you DON'T have the user's email yet, ask for it in your reply ("So we can follow up — what's the best email?") and DO NOT call the tool yet
- Once you have their email (or they decline to share), call the tool with a clear subject + a message that contains everything relevant from the conversation
- After the tool succeeds, tell the user the ticket is open and what to expect next

# Tool spec
\`create_support_ticket\` parameters:
- subject (required) — short headline, like "Cannot create membership plan"
- message (required) — full description including conversation context
- userEmail (optional) — only include if the user shared it
- userName (optional) — only include if the user shared it

# Knowledge base — SmilePass wiki articles

${trackBlocks}

# Reminder
Stay focused on SmilePass product questions. If a user asks about something unrelated (e.g. dental clinical advice, programming help, current events), politely redirect them back to SmilePass topics or escalate via a ticket.`;
}

/* ─────────────────────────────────────────────────────────── */

const TOOLS: Anthropic.Tool[] = [
  {
    name: "create_support_ticket",
    description:
      "Open a support ticket in the SmilePass HUB Notion database. Use when the user's question is outside the knowledge base, they explicitly want human help, or they're reporting a bug or billing issue. Always ask for their email first if you don't have it.",
    input_schema: {
      type: "object" as const,
      properties: {
        subject: {
          type: "string",
          description: "Short one-line headline summarising the issue.",
        },
        message: {
          type: "string",
          description:
            "Full description of the issue or question, including relevant context from the conversation.",
        },
        userEmail: {
          type: "string",
          description: "User's email address if they shared one (omit otherwise).",
        },
        userName: {
          type: "string",
          description: "User's name if they shared one (omit otherwise).",
        },
      },
      required: ["subject", "message"],
    },
  },
];

/* ─────────────────────────────────────────────────────────── */

interface ChatResponse {
  text: string;
  ticket?: {
    created: boolean;
    subject?: string;
    error?: string;
    url?: string;
  };
}

export async function POST(req: Request): Promise<NextResponse<ChatResponse | { error: string }>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        text:
          "The chatbot is temporarily unavailable. Please use the [Contact form](/contact) or browse the [wiki](/wiki) in the meantime.",
      },
      { status: 200 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request shape" }, { status: 400 });
  }

  const { messages, pathname, userEmail, userName } = parsed.data;

  // TODO(client-identity): once the marketing site gains auth/sessions,
  // resolve the logged-in client (practice id, primary user email, plan
  // tier) here and pass that context into the support-ticket payload below
  // so each ticket lands in Notion tagged to the right customer. For now
  // the Notion DB has User Email / User Name columns ready to receive
  // whatever the chatbot collects in conversation.
  const client = new Anthropic({ apiKey });
  const system = buildSystemPrompt();

  // Multi-turn loop to handle tool use. Capped at 3 hops to avoid runaway.
  const conversation: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
  let ticketResult: ChatResponse["ticket"] | undefined;

  for (let hop = 0; hop < 3; hop++) {
    let response: Anthropic.Message;
    try {
      response = await client.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system,
        tools: TOOLS,
        messages: conversation,
      });
    } catch (err) {
      console.error("[/api/chat] Claude error", err);
      return NextResponse.json(
        {
          text:
            "Sorry — something went wrong reaching the assistant. Please try again in a moment, or use the [Contact form](/contact) if it keeps happening.",
        },
        { status: 200 },
      );
    }

    // If Claude wants to use a tool, execute it and loop.
    const toolUseBlock = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    );

    if (toolUseBlock && toolUseBlock.name === "create_support_ticket") {
      const toolInput = toolUseBlock.input as {
        subject?: string;
        message?: string;
        userEmail?: string;
        userName?: string;
      };

      const result = await sendSupportTicket({
        subject: toolInput.subject,
        message: toolInput.message,
        userEmail: toolInput.userEmail ?? userEmail,
        userName: toolInput.userName ?? userName,
        sourcePage: pathname,
        source: "Chatbot",
      });

      ticketResult = result.success
        ? { created: true, subject: toolInput.subject, url: result.ticketUrl }
        : { created: false, subject: toolInput.subject, error: result.error };

      // Echo the assistant's tool-use turn back, then send the tool result, then loop.
      conversation.push({ role: "assistant", content: response.content });
      conversation.push({
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUseBlock.id,
            content: result.success
              ? `Ticket created successfully. Subject: "${toolInput.subject}". Notion URL: ${result.ticketUrl ?? "(none returned)"}`
              : `Ticket creation FAILED: ${result.error}`,
            is_error: !result.success,
          },
        ],
      });
      continue;
    }

    // No tool use — extract the final text and return.
    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n\n")
      .trim();

    return NextResponse.json({
      text: text || "I'm here — what would you like to know about SmilePass?",
      ...(ticketResult ? { ticket: ticketResult } : {}),
    });
  }

  // Safety: hit the hop cap without a clean stop.
  return NextResponse.json({
    text:
      "I got stuck mid-conversation. If you'd like, ask again with a bit more detail — or I can open a ticket so the team can follow up.",
    ...(ticketResult ? { ticket: ticketResult } : {}),
  });
}
