import { z } from "zod";

/**
 * Support Ticket schema — used by the chatbot's create_support_ticket tool
 * and (in the future) by any standalone "open a ticket" form.
 *
 * Single source of truth: parsed both client-side (when relevant) and
 * server-side in the Server Action that writes to the Notion Support
 * Tickets database. Keep field names aligned with the Notion column names.
 */
export const supportTicketSchema = z.object({
  /** Short headline for the issue. Becomes the Notion page title. */
  subject: z
    .string()
    .trim()
    .min(3, "Subject is too short.")
    .max(200, "Subject is too long."),
  /** Full description of the issue or question. */
  message: z
    .string()
    .trim()
    .min(5, "Message is too short.")
    .max(4000, "Message is too long."),
  /** Optional — the email to reply to. The chatbot will ask for it if needed. */
  userEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .optional(),
  /** Optional — the user's name as captured in conversation. */
  userName: z
    .string()
    .trim()
    .max(120, "Name is too long.")
    .optional(),
  /** Optional — where the user was when they opened the ticket. */
  sourcePage: z
    .string()
    .trim()
    .max(300)
    .optional(),
  /** How the ticket entered the system. */
  source: z.enum(["Chatbot", "Web form"]).default("Chatbot"),
});

export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
