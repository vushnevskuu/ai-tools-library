import Image from "next/image";

interface PreviewImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "auto";
}

export function PreviewImage({
  src,
  alt,
  className = "",
  aspectRatio = "video",
}: PreviewImageProps) {
  const aspectClass =
    aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "square"
        ? "aspect-square"
        : "";

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 ${aspectClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
