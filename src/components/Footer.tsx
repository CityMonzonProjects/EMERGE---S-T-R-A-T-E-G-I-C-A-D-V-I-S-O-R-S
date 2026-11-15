// Ruta: src/components/Footer.tsx  (REEMPLAZA TODO)
const links = [
  { label: "Services", href: "/#servicios" },
  { label: "Process", href: "/#proceso" },
  { label: "Contact", href: "/#contacto" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-950 text-silver-400">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Closing call to action */}
        <div className="mb-12 flex flex-col items-center gap-6 border-b border-white/10 pb-12 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready for a clearer strategy?
          </h2>
          <a
            href="/#contacto"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            Schedule a Consultation
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:items-start md:text-left">
          <div>
            <a href="/" aria-label="Emerge Strategic Advisors, back to top" className="inline-block">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Strategic Advisory for Lasting Growth.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-3 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs">
          © 2026 Emerge Strategic Advisors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
