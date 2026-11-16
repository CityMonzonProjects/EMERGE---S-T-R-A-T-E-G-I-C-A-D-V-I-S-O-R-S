// Ruta: src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import Glyph from "./icons/Glyph";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#servicios", id: "servicios" },
  { label: "Process", href: "#proceso", id: "proceso" },
  { label: "Client Guide", href: "#guide", id: "guide" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);

      // Scrollspy: the section under the navbar is the active one
      const stack = document.elementsFromPoint(window.innerWidth / 2, 96);
      const host = stack.find((el) => !el.closest("header") && el.closest("section"));
      setActiveId(host?.closest<HTMLElement>("section")?.id ?? "");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const glass = scrolled || open;
  const shell = glass
    ? "border-white/12 bg-navy-950/85 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md backdrop-saturate-150"
    : "border-transparent bg-transparent py-4";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main"
        className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-6 ${shell}`}
      >
        <a href="#" aria-label="Emerge Strategic Advisors, back to top" className="flex items-center">
          <img
            src="/logo.webp"
            alt="Emerge Strategic Advisors"
            width={3253}
            height={774}
            decoding="async"
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                  active ? "text-white" : "text-silver-300 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-cyan-500 transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="/discovery"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-500 py-2.5 pl-5 pr-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-cyan-400"
          >
            Start Your Discovery
            <Glyph name="arrowUpRight" size={16} className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full text-silver-300 transition-colors hover:text-white lg:hidden"
        >
          <Glyph name={open ? "close" : "menu"} size={24} />
        </button>

        {/* Reading progress */}
        <m.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute inset-x-6 bottom-0 h-px origin-left bg-cyan-500 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/12 bg-navy-950/95 p-3 backdrop-blur-md lg:hidden"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-medium text-silver-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                  <Glyph name="arrowRight" size={18} className="text-silver-500" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/discovery"
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 text-sm font-semibold text-navy-950"
          >
            Start Your Discovery
            <Glyph name="arrowUpRight" size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
