"use client";

import Image from "next/image";
import { useMode } from "@/components/mode/mode-provider";

const SOURCES = {
  dev: { src: "/avatars/rober8b.png", alt: "rober8b pixel art portrait" },
  client: { src: "/avatars/rober8b-photo.png", alt: "Robertino Barbuto portrait" },
} as const;

export function IdentityAvatar({ size = 144 }: { size?: number }) {
  const { mode } = useMode();
  const { src, alt } = SOURCES[mode];

  return (
    <div
      role="img"
      aria-label={alt}
      className="shrink-0 overflow-hidden rounded-xl"
      style={{ width: size, height: size }}
    >
      <Image
        key={mode}
        src={src}
        alt=""
        width={size}
        height={size}
        priority
        quality={95}
        style={{ width: size, height: size, objectFit: "cover" }}
      />
    </div>
  );
}
