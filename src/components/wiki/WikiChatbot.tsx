"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

/**
 * WikiChatbot — floating launcher + chat panel mounted on every wiki page.
 *
 * - Calls POST /api/chat with the conversation history + current pathname
 * - Renders assistant messages as Markdown (links inside the bot's answers
 *   route to wiki pages)
 * - Persists the conversation in localStorage so navigation between wiki
 *   articles doesn't wipe context
 * - Surfaces a small confirmation banner inside the chat thread when the
 *   bot's create_support_ticket tool fires successfully
 */

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  /** Set only on the assistant turn where a ticket was created. */
  ticket?: {
    created: boolean;
    subject?: string;
    error?: string;
  };
}

const STORAGE_KEY = "smilepass-wiki-chat-v1";
const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi 👋 I'm the SmilePass wiki assistant. Ask me anything about setting up the platform, building plans, taking payments or running your practice on SmilePass. If I can't answer, I'll open a support ticket for you.",
};

export default function WikiChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Restore persisted history (if any) on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      /* ignore — corrupt storage just falls back to welcome */
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota / private-mode — non-fatal */
    }
  }, [messages]);

  // Auto-scroll to bottom on new message.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, pending]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Esc closes the panel when focused inside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleReset = useCallback(() => {
    setMessages([WELCOME]);
    setInput("");
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || pending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Drop the welcome message before sending — it's UI-only.
          messages: nextMessages
            .filter((m, idx) => !(idx === 0 && m === WELCOME))
            .map((m) => ({ role: m.role, content: m.content })),
          pathname,
        }),
      });

      if (!res.ok) {
        const errText =
          res.status === 400
            ? "Sorry — that message didn't go through. Try rephrasing?"
            : "Something went wrong. Please try again in a moment.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errText },
        ]);
        return;
      }

      const data = (await res.json()) as {
        text: string;
        ticket?: { created: boolean; subject?: string; error?: string };
      };

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text, ticket: data.ticket },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Network error — please try again. If it keeps happening, use the [Contact form](/contact) and we'll follow up.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }, [input, messages, pending, pathname]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void handleSend();
      }
    },
    [handleSend],
  );

  const hasConversation = useMemo(
    () => messages.length > 1 || messages[0] !== WELCOME,
    [messages],
  );

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open SmilePass wiki assistant — support online"
          className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full text-paper shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-hover) 100%)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            className="w-6 h-6 mx-auto"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 9h10M7 13h6m-9 7l3-3h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2h-1z"
            />
          </svg>
          {/* Online status dot on the launcher */}
          <span
            aria-hidden
            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-paper"
            style={{ boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.6)", animation: "smilepass-pulse 2s ease-out infinite" }}
          />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="SmilePass wiki assistant"
          className="fixed bottom-6 right-6 z-[90] w-[min(380px,calc(100vw-2rem))] h-[min(580px,calc(100vh-3rem))] bg-paper rounded-2xl shadow-2xl border border-divider flex flex-col overflow-hidden"
        >
          {/* Header */}
          <header
            className="flex items-center justify-between gap-3 px-4 py-3 text-paper"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-hover) 100%)",
            }}
          >
            <div>
              <p className="text-[0.7rem] font-semibold tracking-[0.16em] uppercase opacity-80">
                Ask the wiki
              </p>
              <p className="text-[0.98rem] font-semibold leading-snug">
                SmilePass Assistant
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  aria-hidden
                  className="inline-block w-2 h-2 rounded-full bg-emerald-400"
                  style={{ boxShadow: "0 0 6px rgba(74, 222, 128, 0.8)" }}
                />
                <span className="text-[0.72rem] font-medium opacity-90">
                  Support online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {hasConversation && (
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Start a new conversation"
                  title="Start a new conversation"
                  className="w-8 h-8 rounded-full hover:bg-paper/15 flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-4 h-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 019-9 9 9 0 016.4 2.6M21 12a9 9 0 01-9 9 9 9 0 01-6.4-2.6M21 3v6h-6M3 21v-6h6" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="w-8 h-8 rounded-full hover:bg-paper/15 flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-4 h-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-mist/40 flex flex-col gap-3"
          >
            {messages.map((m, idx) => (
              <MessageBubble key={idx} message={m} />
            ))}

            {pending && (
              <div className="self-start max-w-[85%] bg-paper border border-divider rounded-2xl rounded-tl-md px-4 py-2.5">
                <span className="inline-flex gap-1 items-center">
                  <Dot delay={0} />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </span>
              </div>
            )}
          </div>

          {/* Input */}
          <footer className="border-t border-divider bg-paper p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about SmilePass…"
                disabled={pending}
                className="flex-1 resize-none border border-divider rounded-xl bg-paper px-3.5 py-2.5 text-[0.93rem] text-purple-deep placeholder:text-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple transition-colors disabled:opacity-60 max-h-32"
              />
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={pending || input.trim() === ""}
                aria-label="Send"
                className="flex-shrink-0 w-10 h-10 rounded-xl text-paper flex items-center justify-center disabled:opacity-40 transition-opacity"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-hover) 100%)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-4 h-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0L13 6m6 6l-6 6" />
                </svg>
              </button>
            </div>
            <p className="text-[0.7rem] text-purple-deep/55 mt-2 leading-snug">
              Powered by Claude. The assistant can open a support ticket on
              your behalf when needed.
            </p>
          </footer>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.92rem] leading-relaxed ${
          isUser
            ? "bg-brand-purple text-paper rounded-tr-md"
            : "bg-paper border border-divider text-purple-deep rounded-tl-md"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div className="chatbot-msg">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {!isUser && message.ticket && (
        <div className="mt-2 max-w-[85%]">
          {message.ticket.created ? (
            <div className="bg-brand-purple/10 border border-brand-purple/30 text-purple-deep text-[0.82rem] rounded-lg px-3 py-2 flex items-start gap-2">
              <span aria-hidden className="text-brand-purple mt-0.5">✓</span>
              <span>
                Ticket opened
                {message.ticket.subject ? ` — "${message.ticket.subject}"` : ""}
                . The team will be in touch shortly.
              </span>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 text-red-700 text-[0.82rem] rounded-lg px-3 py-2">
              Couldn't open a ticket automatically:{" "}
              {message.ticket.error ?? "unknown error"}. Please use the{" "}
              <a href="/contact" className="font-semibold underline">
                contact form
              </a>{" "}
              instead.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-purple-deep/40"
      style={{
        animation: "smilepass-typing 1.2s ease-in-out infinite",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}
