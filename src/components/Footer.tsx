// Ruta: src/components/Footer.tsx
import Glyph from "./icons/Glyph";

const explore = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#servicios" },
  { label: "Process", href: "/#proceso" },
  { label: "Client Guide", href: "/#guide" },
];

const start = [
  { label: "Discovery Workbook", href: "/discovery" },
  { label: "Send a short note", href: "/#contacto" },
  { label: "Privacy Policy", href: "/privacy" },
];

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-500">{title}</p>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="inline-block py-1.5 text-sm text-silver-300 transition-colors hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="relative bg-navy-950 text-silver-400">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showCta && (
          <div className="flex flex-col gap-6 border-b border-white/10 py-14 md:flex-row md:items-center md:justify-between">
            <h2 className="text-balance font-display text-4xl font-normal tracking-tight text-white">
              Ready for a <em className="text-cyan-400">clearer strategy?</em>
            </h2>
            <a
              href="/discovery"
              className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-cyan-500 pl-7 pr-6 text-base font-semibold text-navy-950 transition-colors hover:bg-cyan-400"
            >
              Start Your Discovery
              <Glyph name="arrowRight" size={18} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        )}

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <a href="/" aria-label="Emerge Strategic Advisors, home" className="inline-block">
              <img
                src="/logo.webp"
                alt="Emerge Strategic Advisors"
                width={3253}
                height={774}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto sm:h-14"
              />
            </a>
            <p className="mt-5 max-w-xs font-display text-xl italic leading-snug text-silver-300">
              A clearer picture. A stronger strategy.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-6">
            <LinkList title="Explore" links={explore} />
            <LinkList title="Start here" links={start} />
          </nav>
        </div>

        <div className="border-t border-white/10 py-6 text-xs">
          © 2026 Emerge Strategic Advisors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
