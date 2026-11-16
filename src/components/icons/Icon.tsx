// Ruta: src/components/icons/Icon.tsx
// Emerge icon set: fine-line, 32px grid, 1.25 stroke. Every icon has one
// accent element (class "ic-a") drawn in the brand cyan; the rest follows
// currentColor. Set --icon-accent on a parent to recolor the accent.
import type { ReactNode } from "react";
import type { IconName } from "./names";

const A = "ic-a";

const ICONS: Record<IconName, ReactNode> = {
  diagnosis: (
    <>
      <circle cx="14" cy="14" r="9" />
      <path d="M20.5 20.5 28 28" />
      <path className={A} d="M10.5 17.5v-3M14 17.5v-7M17.5 17.5v-4.5" />
    </>
  ),
  growth: (
    <>
      <path d="M4 4v24h24" />
      <path className={A} d="m8.5 21.5 5.5-5.5 4 3.5 8-9M21.5 10.5H26V15" />
    </>
  ),
  operations: (
    <>
      <circle cx="7" cy="24" r="3" />
      <circle cx="25" cy="24" r="3" />
      <path d="m18.1 11 4.8 9M20.5 24h-9M9.1 20l4.8-9" />
      <circle className={A} cx="16" cy="7" r="3" />
    </>
  ),
  compass: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 4v2.5M16 25.5V28M4 16h2.5M25.5 16H28" />
      <path className={A} d="m20 12-2.4 5.6L12 20l2.4-5.6z" />
    </>
  ),
  horizon: (
    <>
      <path d="M3 21h26M8 25h16M12 29h8" />
      <path
        className={A}
        d="M9.5 21a6.5 6.5 0 0 1 13 0M16 7v3M7.5 10.5l2 2M24.5 10.5l-2 2"
      />
    </>
  ),
  stairs: (
    <>
      <path d="M4 28h6v-6h6v-6h6v-6h6" />
      <path className={A} d="M25 10V3.5l3.5 1.75L25 7" />
    </>
  ),
  building: (
    <>
      <path d="M6 28V6.5L18 4v24M18 12h8v16M3 28h26M10 10h4M10 15h4M10 20h4" />
      <path className={A} d="M21 16.5h2M21 20.5h2M21 24.5h2" />
    </>
  ),
  layers: (
    <>
      <path d="m4 16 12 6 12-6M4 22l12 6 12-6" />
      <path className={A} d="m16 4 12 6-12 6-12-6z" />
    </>
  ),
  wave: (
    <>
      <path d="M3 26h26M8 26v2M16 26v2M24 26v2" />
      <path
        className={A}
        d="M3 15c3.5 0 3.5-8 7-8s3.5 13 7 13 3.5-9 7-9c2.5 0 3.5 3 5 3"
      />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6" width="24" height="22" rx="2.5" />
      <path d="M4 12h24M10.5 3.5v5M21.5 3.5v5" />
      <path className={A} d="M9 17.5h2M15 17.5h2M21 17.5h2M9 22.5h2M15 22.5h2" />
    </>
  ),
  orgchart: (
    <>
      <path d="M16 10.5V21M7 21v-4.5h18V21" />
      <circle cx="7" cy="24.5" r="3" />
      <circle cx="16" cy="24.5" r="3" />
      <circle cx="25" cy="24.5" r="3" />
      <rect className={A} x="12" y="3.5" width="8" height="7" rx="1.5" />
    </>
  ),
  target: (
    <>
      <circle cx="14.5" cy="17.5" r="11" />
      <circle cx="14.5" cy="17.5" r="6" />
      <path className={A} d="M14.5 17.5 27 5M22 5h5v5" />
    </>
  ),
  flag: (
    <>
      <path d="M7 29V3.5M4 29h7" />
      <path className={A} d="M7 5h17l-4 5.5 4 5.5H7" />
    </>
  ),
  summit: (
    <>
      <path d="m3 27 9.5-16 5.5 9 3.5-5.5L29 27z" />
      <path className={A} d="M12.5 11V4l4.5 2-4.5 2" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="18" r="9" />
      <path d="M21 9.5 27.5 3M23 3h4.5v4.5" />
      <path
        className={A}
        d="M14.6 14.6c-.6-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2s1.1 1.7 2.6 2.1 2.9.9 2.9 2.3-1.3 2.2-2.9 2.2c-1.2 0-2.2-.5-2.9-1.5M12 11.4v1.8M12 22.8v1.8"
      />
    </>
  ),
  pie: (
    <>
      <path d="M14 7a11 11 0 1 0 11 11H14z" />
      <path className={A} d="M17.5 3.5a11 11 0 0 1 11 11h-11z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M5 13v6a1.5 1.5 0 0 0 1.5 1.5H9L19 26V6L9 11.5H6.5A1.5 1.5 0 0 0 5 13zM10 20.5l1.5 6.5h3l-1.2-5.2" />
      <path className={A} d="M23 12.5a5 5 0 0 1 0 7M26 9.5a9 9 0 0 1 0 13" />
    </>
  ),
  broadcast: (
    <>
      <path d="M10.3 21.7a8 8 0 0 1 0-11.4M21.7 10.3a8 8 0 0 1 0 11.4M6.1 25.9a14 14 0 0 1 0-19.8M25.9 6.1a14 14 0 0 1 0 19.8" />
      <circle className={A} cx="16" cy="16" r="2.5" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="11" r="4.5" />
      <path d="M3.5 27a8.5 8.5 0 0 1 17 0" />
      <path className={A} d="M20 6.9a4.5 4.5 0 0 1 0 8.2M23.5 19.2c3 1.2 5 4.2 5 7.8" />
    </>
  ),
  balance: (
    <>
      <path d="M16 6v21M10 27h12M6 9h20" />
      <circle cx="16" cy="5" r="1.5" />
      <path className={A} d="M6 9 2.5 17a3.5 3.5 0 0 0 7 0zM26 9l-3.5 8a3.5 3.5 0 0 0 7 0z" />
    </>
  ),
  seal: (
    <>
      <circle cx="16" cy="13" r="9" />
      <path d="M11 20.5 9 29l7-3.5 7 3.5-2-8.5" />
      <path
        className={A}
        d="m16 8.6 1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z"
      />
    </>
  ),
  funnel: (
    <>
      <path d="M4 5h24l-9 11v8l-6 3.5V16z" />
      <path className={A} d="M8.6 10.5h14.8" />
    </>
  ),
  link: (
    <>
      <rect x="3" y="11" width="15" height="10" rx="5" />
      <rect className={A} x="14" y="11" width="15" height="10" rx="5" />
    </>
  ),
  chip: (
    <>
      <rect x="8" y="8" width="16" height="16" rx="2" />
      <path d="M12 4v4M16 4v4M20 4v4M12 24v4M16 24v4M20 24v4M4 12h4M4 16h4M4 20h4M24 12h4M24 16h4M24 20h4" />
      <rect className={A} x="12.5" y="12.5" width="7" height="7" rx="1" />
    </>
  ),
  rook: (
    <>
      <path d="M10.5 22 12 13h8l1.5 9M9 13h14M9 13V6h3v3h2.5V6h3v3H20V6h3v7" />
      <path className={A} d="M8 28h16v-3.5A2.5 2.5 0 0 0 21.5 22h-11A2.5 2.5 0 0 0 8 24.5z" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 23a11.5 11.5 0 1 1 23 0M7.6 14.6l1.6 1.1M16 10v2M24.4 14.6l-1.6 1.1M4 27h24" />
      <path className={A} d="m16 23 5.5-6.5" />
      <circle className={A} cx="16" cy="23" r="1.8" />
    </>
  ),
  history: (
    <>
      <path d="M8.6 8.6A10.5 10.5 0 1 1 5.5 16M8.6 3.8v4.8H3.8" />
      <path className={A} d="M16 10.5V16l4 2.5" />
    </>
  ),
  calendarCheck: (
    <>
      <rect x="4" y="6" width="24" height="22" rx="2.5" />
      <path d="M4 12h24M10.5 3.5v5M21.5 3.5v5" />
      <path className={A} d="m11.5 19.5 3 3 6-6" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 8.5V25a2 2 0 0 0 2 2h21a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H15l-3-3.5H5.5a2 2 0 0 0-2 2z" />
      <path className={A} d="M10 17h12M10 21.5h8" />
    </>
  ),
  idcard: (
    <>
      <rect x="3.5" y="6.5" width="25" height="19" rx="2.5" />
      <path d="M18 13h6M18 17.5h6" />
      <circle className={A} cx="11" cy="13.5" r="3" />
      <path className={A} d="M6.5 21.5c.6-2.3 2.4-3.5 4.5-3.5s3.9 1.2 4.5 3.5" />
    </>
  ),
  lock: (
    <>
      <rect x="6" y="14" width="20" height="14" rx="2.5" />
      <path d="M10.5 14V9.5a5.5 5.5 0 0 1 11 0V14" />
      <path className={A} d="M16 19v4" />
    </>
  ),
  hourglass: (
    <>
      <path d="M8 4h16M8 28h16M10 4c0 6 6 7.5 6 12s-6 6-6 12M22 4c0 6-6 7.5-6 12s6 6 6 12" />
      <path className={A} d="M12.5 25.5c1-1.5 2.2-2.5 3.5-2.5s2.5 1 3.5 2.5zM13 9h6" />
    </>
  ),
  conversation: (
    <>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h13A2.5 2.5 0 0 1 22 7.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.1A2.5 2.5 0 0 1 4 15.5z" />
      <path
        className={A}
        d="M25.5 11.5A2.5 2.5 0 0 1 28 14v8a2.5 2.5 0 0 1-2 2.4V28l-4.5-3.5H16a2.5 2.5 0 0 1-2.5-2.5v-1"
      />
    </>
  ),
  workbook: (
    <>
      <path d="M16 8.5C13 6 8.5 5.5 4 6v19c4.5-.5 9 0 12 2.5 3-2.5 7.5-3 12-2.5V6c-4.5-.5-9 0-12 2.5zM16 8.5v19" />
      <path className={A} d="M20.5 6.6V14l2-1.6 2 1.6V5.9" />
    </>
  ),
  checklist: (
    <>
      <rect x="6" y="5" width="20" height="24" rx="2.5" />
      <path d="M12 3.5h8V7h-8zM17 13.5h5M17 19h5M17 24.5h5" />
      <path className={A} d="m10 13.5 1.3 1.3 2.2-2.6M10 19l1.3 1.3 2.2-2.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24" />
      <path
        className={A}
        d="M16 4c3.3 3.3 5 7.3 5 12s-1.7 8.7-5 12c-3.3-3.3-5-7.3-5-12s1.7-8.7 5-12z"
      />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Accessible name. Omit for decorative icons (the default). */
  title?: string;
};

export default function Icon({
  name,
  size = 32,
  strokeWidth = 1.25,
  className,
  title,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
