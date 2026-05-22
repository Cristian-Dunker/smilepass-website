"use client";

import { useRef, useEffect } from "react";

interface HeroVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Pause N seconds before the end (avoids loop hiccup). */
  stopBeforeEnd?: number;
}

export default function HeroVideo({
  src,
  poster,
  className,
  style,
  stopBeforeEnd = 2,
}: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.playbackRate = 0.5;

    const onTimeUpdate = () => {
      if (v.duration && v.currentTime >= v.duration - stopBeforeEnd) {
        v.pause();
      }
    };

    v.addEventListener("timeupdate", onTimeUpdate);
    return () => v.removeEventListener("timeupdate", onTimeUpdate);
  }, [stopBeforeEnd]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={style}
    />
  );
}
