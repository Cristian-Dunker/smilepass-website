"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface VimeoFacadeProps {
  /** Full Vimeo player URL, e.g. https://player.vimeo.com/video/123456789 */
  src: string;
  title?: string;
  /** Optional thumbnail override — defaults to Vimeo's CDN thumb. */
  thumbnail?: string;
}

/**
 * Renders a lightweight thumbnail + play button.
 * The heavy Vimeo iframe is only loaded when the user clicks play.
 * Keeps LCP fast.
 */
export default function VimeoFacade({
  src,
  title = "Video",
  thumbnail,
}: VimeoFacadeProps) {
  const [active, setActive] = useState(false);

  const videoId = src.match(/\/video\/(\d+)/)?.[1] ?? "";
  const thumbUrl = thumbnail || `https://vumbnail.com/${videoId}.jpg`;

  const handlePlay = useCallback(() => setActive(true), []);

  if (active) {
    return (
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`${src}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
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
      className="group relative w-full cursor-pointer border-0 p-0 bg-transparent"
      style={{ aspectRatio: "16/9" }}
    >
      <Image
        src={thumbUrl}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover object-center"
        style={{ filter: "brightness(.88) saturate(.9)" }}
      />

      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brand-purple group-hover:bg-black/50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7 sm:w-8 sm:h-8 ml-1 text-white transition-colors duration-300 group-hover:text-brand-purple"
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
