/**
 * Shared "New" badge for wiki content added in the latest expansion.
 *
 * Rendered wherever a new track or article surfaces — the index cards, the
 * track landings, the side menu and the article header — driven by
 * `NEW_TRACK_IDS` / `NEW_ARTICLE_SLUGS` in `@/data/wiki/articles`. One badge,
 * one place to restyle. Presentational only (no hooks), so it works in both
 * server and client components.
 */
export default function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-purple/12 text-brand-purple text-[0.6rem] font-bold tracking-[0.14em] uppercase px-2 py-0.5 leading-none ${className}`}
    >
      New
    </span>
  );
}
