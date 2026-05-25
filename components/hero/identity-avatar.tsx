"use client";

import Image from "next/image";
import { useMode } from "@/components/mode/mode-provider";
import { AsciiPortrait } from "@/components/hero/ascii-portrait";

export function IdentityAvatar({ size = 144 }: { size?: number }) {
  const { mode } = useMode();

  if (mode === "dev") {
    return (
      <AsciiPortrait
        src="/avatars/rober8b-photo.png"
        size={size}
        alt="rober8b ASCII portrait"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Robertino Barbuto portrait"
      className="shrink-0 overflow-hidden rounded-xl"
      style={{ width: size, height: size }}
    >
      <Image
        key={mode}
        src="/avatars/rober8b-photo.png"
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
