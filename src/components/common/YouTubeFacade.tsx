"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface YouTubeFacadeProps {
  /** Full YouTube watch URL or video id. */
  src: string;
  title?: string;
  /** Override the auto-derived thumbnail. */
  thumbnail?: string;
}

/**
 * Lightweight YouTube embed: renders the thumbnail + play button until the
 * user clicks, then swaps for the real iframe. Keeps LCP fast.
 *
 * Mirrors `VimeoFacade.tsx`; same pattern, different URL.
 */
export default function YouTubeFacade({
  src,
  title = "Watch the video",
  thumbnail,
}: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);

  const videoId = extractVideoId(src);
  const thumbUrl = thumbnail || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = useCallback(() => setActive(true), []);

  if (active) {
    return (
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Play video: ${title}`}
      onClick={handlePlay}
      className="group relative w-full cursor-pointer border-0 p-0 bg-transparent rounded-2xl overflow-hidden"
      style={{ aspectRatio: "16/9" }}
    >
      <Image
        src={thumbUrl}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-center"
        style={{ filter: "brightness(.85)" }}
        unoptimized
      />
      <div className="absolute inset-0 bg-purple-deep/30 transition-opacity duration-300 group-hover:bg-purple-deep/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-paper/95 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7 sm:w-8 sm:h-8 ml-1 text-brand-purple transition-colors duration-300 group-hover:text-brand-purple-hover"
          >
            <path
              d="M8 5.14v13.72a.5.5 0 0 0 .76.43l11.2-6.86a.5.5 0 0 0 0-.86L8.76 4.71a.5.5 0 0 0-.76.43z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}

function extractVideoId(src: string): string {
  // Already a video id (11 chars, alphanumeric + dash/underscore)
  if (/^[A-Za-z0-9_-]{11}$/.test(src)) return src;
  // youtu.be/<id>
  const short = src.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (short) return short[1];
  // youtube.com/watch?v=<id>
  const watch = src.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watch) return watch[1];
  // youtube.com/embed/<id>
  const embed = src.match(/embed\/([A-Za-z0-9_-]{11})/);
  if (embed) return embed[1];
  return "";
}
