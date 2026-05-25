import Image from "next/image";

const AVATAR_SRC = "/avatars/rober8b.png";

export function PixelAvatar({ size = 56 }: { size?: number }) {
  return (
    <div
      role="img"
      aria-label="rober8b pixel art portrait"
      className="shrink-0 overflow-hidden rounded-xl"
      style={{ width: size, height: size }}
    >
      <Image
        src={AVATAR_SRC}
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
