import Link from "next/link";

const BASE_URL = "https://smilepass.com.au";

export interface BreadcrumbItem {
  label: string;
  /** Path WITHOUT the base URL. Omit on the last (current) item. */
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  /**
   * Colour variant. `dark` = over dark backgrounds (ink).
   * `light` = over paper/bone backgrounds.
   */
  variant?: "dark" | "light";
  /** Skip rendering BreadcrumbList JSON-LD if the parent already emits it. */
  hideSchema?: boolean;
  className?: string;
}

export default function Breadcrumbs({ items, variant = "dark", hideSchema = false, className = "" }: Props) {
  if (items.length === 0) return null;

  const isDark = variant === "dark";
  const textClass = isDark ? "text-clay/70" : "text-ink/70";
  const linkHover = "hover:text-brand-purple transition-colors";
  const sepClass = isDark ? "text-clay/30" : "text-ink/30";
  const currentClass = isDark ? "text-brand-purple" : "text-brand-purple";

  const schema = hideSchema
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
        })),
      };

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[0.65rem] tracking-[0.15em] uppercase ${textClass}`}
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
                {i > 0 && (
                  <span aria-hidden="true" className={sepClass}>
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? currentClass : ""}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={linkHover}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
