function UserGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface AvatarProps {
  name?: string | null;
  /** Diameter in pixels. Defaults to 28. */
  size?: number;
}

function initial(name: string | null | undefined): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase();
}

/**
 * Round monogram avatar — used in testimonials, lead lists, etc.
 * Falls back to a generic glyph when no name is provided.
 */
export default function Avatar({ name, size = 28 }: AvatarProps) {
  const letter = initial(name);
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--color-brand-purple, #7D7AF2)",
        color: "var(--color-paper, #FFFFFF)",
        fontSize: Math.round(size * 0.42),
        fontWeight: 600,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {letter || <UserGlyph size={Math.round(size * 0.5)} />}
    </span>
  );
}
