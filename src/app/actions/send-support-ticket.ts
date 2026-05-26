"use server";

import { supportTicketSchema, type SupportTicketInput } from "@/lib/schemas/support-ticket";

/**
 * Server Action — writes a new row into the SmilePass HUB
 * "Support Tickets" Notion database.
 *
 * Called by the chatbot Route Handler when its create_support_ticket tool
 * fires. Designed to also be callable from a standalone web form later.
 *
 * Env vars required:
 *   - NOTION_API_KEY                — same key used by send-request-demo
 *   - NOTION_SUPPORT_TICKETS_DB_ID  — UUID of the Support Tickets DB
 *
 * TODO(client-identity): once the site gains auth/sessions, the caller
 * (chatbot Route Handler today) should pass the logged-in client's
 * canonical identifier through to here so tickets are tagged to the right
 * customer. The Notion DB already has User Email / User Name columns; add
 * a Client column / relation when the data model is firmer.
 */

interface SuccessResult {
  success: true;
  /** Notion-side URL to the created ticket — useful for chatbot citations. */
  ticketUrl?: string;
}
interface ErrorResult {
  success: false;
  error: string;
}
export type SupportTicketResult = SuccessResult | ErrorResult;

const NOTION_VERSION = "2022-06-28";

export async function sendSupportTicket(
  input: unknown,
): Promise<SupportTicketResult> {
  const parsed = supportTicketSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid input.";
    return { success: false, error: firstIssue };
  }

  const data: SupportTicketInput = parsed.data;
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_SUPPORT_TICKETS_DB_ID;

  if (!apiKey || !databaseId) {
    console.error(
      "[sendSupportTicket] Missing NOTION_API_KEY or NOTION_SUPPORT_TICKETS_DB_ID — skipping Notion write.",
      { hasKey: Boolean(apiKey), hasDbId: Boolean(databaseId), payload: data },
    );
    return {
      success: false,
      error:
        "We could not record your ticket right now. Please email enquiries@smilepass.com.au and we will get back to you.",
    };
  }

  const body = {
    parent: { database_id: databaseId },
    properties: {
      Subject: { title: [{ text: { content: data.subject } }] },
      Message: { rich_text: [{ text: { content: data.message } }] },
      Status: { select: { name: "Open" } },
      Source: { select: { name: data.source } },
      ...(data.userEmail
        ? { "User Email": { email: data.userEmail } }
        : {}),
      ...(data.userName
        ? { "User Name": { rich_text: [{ text: { content: data.userName } }] } }
        : {}),
      ...(data.sourcePage
        ? { "Source Page": { url: data.sourcePage } }
        : {}),
    },
  };

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[sendSupportTicket] Notion API error", res.status, text);
      return {
        success: false,
        error:
          "We could not record your ticket right now. Please try again in a moment, or email enquiries@smilepass.com.au.",
      };
    }

    // Best-effort: surface the ticket URL Notion returns so the chatbot can confirm.
    let ticketUrl: string | undefined;
    try {
      const json = (await res.json()) as { url?: string };
      ticketUrl = json.url;
    } catch {
      // Non-fatal — the ticket was created, we just don't have its URL handy.
    }

    return { success: true, ticketUrl };
  } catch (err) {
    console.error("[sendSupportTicket] network error", err);
    return {
      success: false,
      error:
        "Network error — please try again, or email enquiries@smilepass.com.au.",
    };
  }
}
