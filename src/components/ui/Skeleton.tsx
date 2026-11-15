// Ruta: src/components/ui/Skeleton.tsx
// Neutral placeholder block. Decorative: hidden from assistive tech, and the
// pulse is disabled for visitors who prefer reduced motion.
type SkeletonProps = { className?: string };

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}
