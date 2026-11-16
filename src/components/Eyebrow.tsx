// Ruta: src/components/Eyebrow.tsx
// Editorial section label: italic index, hairline, small caps.
import type { ReactNode } from "react";

export default function Eyebrow({
  index,
  onDark = false,
  children,
}: {
  index?: string;
  onDark?: boolean;
  children: ReactNode;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        onDark ? "text-silver-400" : "text-navy-800/75"
      }`}
    >
      {index && (
        <>
          <span
            className={`font-display text-base font-normal normal-case italic tracking-normal ${
              onDark ? "text-cyan-400" : "text-cyan-700"
            }`}
          >
            {index}
          </span>
          <span aria-hidden="true" className={`h-px w-10 ${onDark ? "bg-white/25" : "bg-navy-950/20"}`} />
        </>
      )}
      {children}
    </p>
  );
}
