import type { Metadata } from "next";
import RequestDemoForm from "@/components/forms/RequestDemoForm";

export const metadata: Metadata = {
  title: "Contact SmilePass — Dental Membership and Payment Plan Software",
  description:
    "Talk to the SmilePass team about running dental membership plans, in-house payment plans or online payments at your Australian practice. Reply within one business day, or start free instantly.",
  alternates: { canonical: "https://smilepass.com.au/contact" },
  openGraph: {
    title: "Contact SmilePass",
    description:
      "Send us a message — or start free instantly without waiting on the team.",
    url: "https://smilepass.com.au/contact",
  },
};

/**
 * /contact — form-only contact surface.
 *
 * The form is the single channel of communication: no displayed phone or
 * email channels here so every enquiry lands in the same Notion DB the
 * sales team works from.
 *
 * Layout: 2-col on desktop with hero copy on the left and the form card on
 * the right, both visible above the fold. Mobile stacks vertically.
 */
export default function ContactPage() {
  return (
    <section className="bg-mist pt-[110px] lg:pt-[130px] pb-16 lg:pb-20 px-6 lg:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Hero copy */}
        <div className="lg:col-span-5 lg:pt-6">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5 reveal">
            Get in touch
          </p>
          <h1
            className="text-purple-deep mb-6 reveal reveal-delay-1"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            We&apos;d love to <em className="display-accent text-brand-purple">hear from you.</em>
          </h1>
          <p className="text-[1.05rem] text-purple-deep/75 leading-relaxed mb-6 reveal reveal-delay-2">
            Tell us about your practice and what you would like SmilePass to
            help with. Fill out the form and a team member will be in touch
            shortly.
          </p>
          <p className="text-[0.92rem] text-purple-deep/65 leading-relaxed reveal reveal-delay-3">
            Every enquiry — sales, partnerships, support — comes through the
            form so nothing slips between inboxes.
          </p>
        </div>

        {/* Right: Form card */}
        <div className="lg:col-span-7 reveal reveal-delay-1">
          <div className="bg-paper rounded-2xl border border-divider shadow-md p-7 lg:p-9">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
              Send us a message
            </p>
            <h2
              className="text-purple-deep text-[1.5rem] lg:text-[1.65rem] mb-3"
              style={{ fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.01em" }}
            >
              Get in touch with the team
            </h2>
            <p className="text-[0.92rem] text-purple-deep/70 leading-relaxed mb-6">
              Have a question, or want a hand getting set up? Fill in the form
              and someone will be in touch shortly. Ready to dive in? You can
              also{" "}
              <a
                href="https://app.smilepass.com.au/pages/authentication/first-access"
                className="text-brand-purple font-semibold hover:text-brand-purple-hover"
              >
                start free
              </a>{" "}
              without waiting on us.
            </p>
            <RequestDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
