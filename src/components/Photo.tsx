// Ruta: src/components/Photo.tsx
// Self-hosted photography in public/images (WebP, 800w + 1600w).
// Source: Unsplash, used under the Unsplash License (free commercial use,
// no attribution required). Original photo IDs, for reference:
//   executive    1507679799987-c73779587ccf   handshake  1521791136064-7986c2920216
//   boardroom    1573164574572-cb89e39749b4   advisory   1573497491208-6b1acb260507
//   diagnosis    1551135049-8a33b5883817      growth-chart 1543286386-2e659306cd6c
//   workshop     1552664730-d307ca884978      skyline    1480714378408-67cf0d13bc1b
//   success      1600880292203-757bb62b4baf
export type PhotoName =
  | "executive"
  | "handshake"
  | "boardroom"
  | "advisory"
  | "diagnosis"
  | "growth-chart"
  | "workshop"
  | "skyline"
  | "success";

type PhotoProps = {
  name: PhotoName;
  /** Empty string marks the photo as decorative. */
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function Photo({ name, alt, className, sizes = "100vw", priority = false }: PhotoProps) {
  return (
    <img
      src={`/images/${name}-1600.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1067}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
