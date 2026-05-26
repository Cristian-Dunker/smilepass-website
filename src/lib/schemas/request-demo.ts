import { z } from "zod";

/**
 * Request a Demo form schema.
 *
 * Single source of truth — used by:
 *   - the client form for live + submit-time validation
 *   - the Server Action for input parsing (DTO at boundary, per work rule #5)
 *   - the embedded contact-page form (same component, same schema)
 *
 * Keep the column names in the Notion `Demo Requests` database in sync with
 * the field labels here (Name, Email, Phone, Practice website, Notes).
 */
export const requestDemoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a contact number.")
    .max(40, "Phone number is too long."),
  practiceWebsite: z
    .string()
    .trim()
    .min(3, "Please enter your practice website.")
    .max(200, "Website URL is too long.")
    .refine(
      (value) => {
        // Accept bare domains (smilepass.com.au) and full URLs alike.
        const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
        try {
          new URL(withProtocol);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid website (e.g. yourpractice.com.au)." },
    ),
  /** Free-text message — optional. Capped to avoid abuse / Notion field limits. */
  notes: z
    .string()
    .trim()
    .max(2000, "Please keep your message under 2000 characters.")
    .optional(),
  /** Optional context for the lead — path of the page the form was submitted from. */
  sourcePage: z.string().trim().max(200).optional(),
});

export type RequestDemoInput = z.infer<typeof requestDemoSchema>;
