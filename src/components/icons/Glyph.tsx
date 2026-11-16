// Ruta: src/components/icons/Glyph.tsx
// Small interface glyphs (arrows, menu, check...) drawn to match the Emerge
// icon set. 24px grid, always decorative: pair them with visible text or an
// aria-label on the control.
import type { ReactNode } from "react";

export type GlyphName =
  | "arrowRight"
  | "arrowLeft"
  | "arrowUpRight"
  | "chevronDown"
  | "menu"
  | "close"
  | "check"
  | "plus"
  | "send"
  | "download"
  | "edit"
  | "restart"
  | "info";

const GLYPHS: Record<GlyphName, ReactNode> = {
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  arrowLeft: <path d="M19.5 12h-15M10.5 6l-6 6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  menu: <path d="M4 8.5h16M4 15.5h10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  send: <path d="M20.5 3.5 10.5 13.5M20.5 3.5l-6 17-4-7-7-4z" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  edit: <path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4" />,
  restart: <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4v3.5H8" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
};

export default function Glyph({
  name,
  size = 20,
  className,
}: {
  name: GlyphName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {GLYPHS[name]}
    </svg>
  );
}
