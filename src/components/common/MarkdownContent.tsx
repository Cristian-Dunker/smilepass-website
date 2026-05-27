import ReactMarkdown, { type Components } from "react-markdown";
import Link from "next/link";
import { resolveWikiHref } from "@/data/wiki/articles";
import { resolveStrategyHref } from "@/data/strategy/strategies";

/**
 * Shared Markdown renderer for wiki articles and strategy plays — the single
 * place that renders `react-markdown` in the app.
 *
 * Article/strategy bodies author internal links in the flat form
 * `/wiki/<slug>` and `/strategy/<slug>` because that's the natural way to
 * write them. The canonical routes are nested (`/wiki/<track>/<slug>`,
 * `/strategy/<category>/<slug>`), so we rewrite those hrefs at render time
 * instead of forcing authors to encode the parent segment or maintaining a
 * wall of redirects.
 */
export function rewriteDocHref(href: string): string {
  const wiki = href.match(/^\/wiki\/([a-z0-9-]+)\/?$/);
  if (wiki) return resolveWikiHref(wiki[1]);
  const strategy = href.match(/^\/strategy\/([a-z0-9-]+)\/?$/);
  if (strategy) return resolveStrategyHref(strategy[1]);
  return href;
}

const components: Components = {
  a({ href, children }) {
    const target = typeof href === "string" ? href : "";
    if (target.startsWith("/")) {
      return <Link href={rewriteDocHref(target)}>{children}</Link>;
    }
    return (
      <a href={target} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

interface Props {
  children: string;
  className?: string;
}

export default function MarkdownContent({ children, className }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
