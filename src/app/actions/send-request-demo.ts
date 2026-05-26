"use server";

import { requestDemoSchema } from "@/lib/schemas/request-demo";

/**
 * Server Action — creates a "Demo Requests" row in the SmilePass HUB Notion
 * database from a public form submission.
 *
 * Env vars required (set in production / .env.local):
 *   - NOTION_API_KEY                — internal integration secret, with access
 *                                     to the SmilePass HUB page
 *   - NOTION_DEMO_REQUESTS_DB_ID    — the Demo Requests database UUID (no dashes
 *                                     required, both forms accepted by Notion)
 *
 * The action returns a discriminated result; the client renders success/error
 * UI off of it. We never leak the raw Notion API response to the client.
 */

interface SuccessResult {
  success: true;
}
interface ErrorResult {
  success: false;
  error: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "practiceWebsite" | "notes", string>>;
}
export type RequestDemoResult = SuccessResult | ErrorResult;

const NOTION_VERSION = "2022-06-28";

export async function sendRequestDemo(input: unknown): Promise<RequestDemoResult> {
  const parsed = requestDemoSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: ErrorResult["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        (key === "name" ||
          key === "email" ||
          key === "phone" ||
          key === "practiceWebsite" ||
          key === "notes") &&
        !fieldErrors[key]
      ) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      success: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DEMO_REQUESTS_DB_ID;

  if (!apiKey || !databaseId) {
    // Fail-soft in dev: still let the user know it didn't actually land somewhere.
    console.error(
      "[sendRequestDemo] Missing NOTION_API_KEY or NOTION_DEMO_REQUESTS_DB_ID — skipping Notion write.",
      { hasKey: Boolean(apiKey), hasDbId: Boolean(databaseId), payload: data },
    );
    return {
      success: false,
      error:
        "We could not record your request right now. Please email enquiries@smilepass.com.au and we will get back to you.",
    };
  }

  // Normalise the practice website to a real URL — Notion's URL property rejects bare domains.
  const websiteUrl = /^https?:\/\//i.test(data.practiceWebsite)
    ? data.practiceWebsite
    : `https://${data.practiceWebsite}`;

  const body = {
    parent: { database_id: databaseId },
    properties: {
      Name: { title: [{ text: { content: data.name } }] },
      Email: { email: data.email },
      Phone: { phone_number: data.phone },
      "Practice website": { url: websiteUrl },
      Notes: {
        rich_text: data.notes ? [{ text: { content: data.notes } }] : [],
      },
      "Source page": {
        rich_text: data.sourcePage
          ? [{ text: { content: data.sourcePage } }]
          : [],
      },
      Status: { select: { name: "New" } },
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
      // No edge caching — this is a one-shot mutation.
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[sendRequestDemo] Notion API error", res.status, text);
      return {
        success: false,
        error:
          "We could not record your request right now. Please try again in a moment, or email enquiries@smilepass.com.au.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendRequestDemo] network error", err);
    return {
      success: false,
      error:
        "Network error — please try again, or email enquiries@smilepass.com.au.",
    };
  }
}
