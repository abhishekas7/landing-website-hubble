import Image from "next/image";
import { useEffect, useState } from "react";

export interface ModelRenderLoadingProps {
  image: string;
}

export default function ModelRenderLoading({ image }: ModelRenderLoadingProps) {
  const [visible, setVisible] = useState(true);

  // Slight delay before mount animation completes
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`absolute inset-0 z-10 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Chip image placeholder */}
      <div className="relative h-full w-full overflow-hidden bg-transparent">
        <Image
          src={image}
          alt="Loading 3D model…"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Loading label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/30 px-4 py-1.5 backdrop-blur-sm">
        <span className="h-2 w-2 animate-ping rounded-full bg-white/80" />
        <span className="text-xs font-medium text-white/80 tracking-wide">
          Loading model…
        </span>
      </div>
    </div>
  );
}
