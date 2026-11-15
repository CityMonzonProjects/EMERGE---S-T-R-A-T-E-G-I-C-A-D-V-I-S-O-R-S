// Ruta: src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CalendarCheck, Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#servicios", id: "servicios" },
  { label: "Process", href: "#proceso", id: "proceso" },
  { label: "Contact", href: "#contacto", id: "contacto" },
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

      const stack = document.elementsFromPoint(window.innerWidth / 2, 48);
      const host = stack.find(
        (el) => !el.closest("header") && el.closest("section"),
      );
      const section = host?.closest<HTMLElement>("section");

      setActiveId(section?.id ?? "");
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

  const shell = !glass
    ? "border-transparent bg-transparent py-3.5"
    : "border-white/15 bg-navy-950/80 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md backdrop-saturate-150";
  const linkBase = "text-silver-300 hover:text-cyan-400";
  const linkActive = "text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-5 ${shell}`}
      >
        {/* Logo: white wordmark; the navbar glass is always dark so it stays legible */}
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

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  active ? linkActive : linkBase
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-cyan-500 transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <CalendarCheck size={16} />
            Schedule a Consultation
          </a>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`rounded-lg p-2 transition-colors md:hidden ${linkBase}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute inset-x-6 bottom-0 h-0.5 origin-left rounded-full bg-cyan-500 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/15 bg-navy-950/80 p-5 backdrop-blur-md backdrop-saturate-150 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium ${linkBase}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-navy-950"
            >
              <CalendarCheck size={16} />
              Schedule a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
