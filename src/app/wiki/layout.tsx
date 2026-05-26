import WikiChatbot from "@/components/wiki/WikiChatbot";

/**
 * Layout shared by `/wiki` (index) and every `/wiki/[slug]` article.
 *
 * Its only job is to mount the floating WikiChatbot so the assistant is
 * available on every wiki page without each page having to import it.
 */
export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WikiChatbot />
    </>
  );
}
