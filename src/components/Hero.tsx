// Ruta: src/components/Hero.tsx
import type { ReactNode } from "react";
import { m } from "framer-motion";
import { PARTS, SECTIONS } from "../data/workbook";
import Eyebrow from "./Eyebrow";
import Photo from "./Photo";
import Glyph from "./icons/Glyph";
import Icon from "./icons/Icon";
import type { IconName } from "./icons/names";
import { EASE } from "./motion";

const disciplines: { icon: IconName; label: string }[] = [
  { icon: "diagnosis", label: "Strategic Diagnosis" },
  { icon: "growth", label: "Growth Planning" },
  { icon: "operations", label: "Operational Optimization" },
];

// Headline line that slides up from behind a mask
function Line({ children, delay, className = "" }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <m.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-navy-950 bg-[radial-gradient(70%_55%_at_85%_0%,rgba(0,194,255,0.12),transparent_70%)]"
    >
      {/* Column guides: the page's 12-column grid, drawn as hairlines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-4 px-5 sm:px-8 lg:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={`border-l border-white/[0.045] ${i >= 4 ? "hidden lg:block" : ""} ${
                i === 3 ? "border-r lg:border-r-0" : ""
              } ${i === 11 ? "border-r" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="flex flex-col justify-center lg:col-span-7 lg:pr-6">
          <Eyebrow onDark>Strategic Advisory Firm</Eyebrow>

          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6rem)] font-normal leading-[0.95] tracking-[-0.025em] text-white">
            <Line delay={0.05}>Clear Strategy.</Line>
            <Line delay={0.18} className="italic text-cyan-400">
              Real Growth.
            </Line>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver-300 sm:text-xl">
            We turn complex business challenges into clear, measurable growth, working side by side
            with leadership teams from diagnosis to execution.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/discovery"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-cyan-500 pl-7 pr-6 text-base font-semibold text-navy-950 transition-colors hover:bg-cyan-400"
            >
              Start Your Discovery
              <span className="grid size-8 place-items-center rounded-full bg-navy-950 text-cyan-400 transition-transform group-hover:translate-x-0.5">
                <Glyph name="arrowRight" size={16} />
              </span>
            </a>
            <a
              href="#proceso"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-base font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              How We Work
            </a>
          </div>

          <p className="mt-8 flex items-center gap-3 text-sm text-silver-400">
            <Icon name="workbook" size={22} className="shrink-0 text-silver-300" />
            Every engagement begins with our Discovery Workbook.
          </p>
        </div>

        {/* Photo collage */}
        <div className="relative mx-auto mb-10 w-full max-w-md sm:max-w-lg lg:col-span-5 lg:mb-0 lg:max-w-none">
          <m.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
            className="relative overflow-hidden rounded-[1.75rem]"
          >
            <Photo
              name="executive"
              alt="Business executive in a dark suit, fastening his jacket"
              priority
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="aspect-4/5 w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/70 via-transparent to-transparent" />
          </m.div>

          <m.div
            {...rise(0.7)}
            className="absolute -bottom-10 -left-3 w-[56%] overflow-hidden rounded-2xl border-[6px] border-navy-950 shadow-2xl shadow-black/40 sm:-left-10"
          >
            <Photo
              name="handshake"
              alt="Two business partners shaking hands"
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="aspect-4/3 w-full object-cover"
            />
          </m.div>

          <m.div
            {...rise(0.95)}
            className="absolute -right-2 top-6 w-60 rounded-2xl border border-white/10 bg-navy-950/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:-right-6 sm:top-10"
          >
            <div className="flex items-center gap-3">
              <Icon name="workbook" size={26} className="text-silver-300" />
              <p className="text-sm font-semibold text-white">Discovery Workbook</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-silver-400">
              {PARTS.length} parts · {SECTIONS.length} short steps · saves as you go
            </p>
            <div aria-hidden="true" className="mt-3 flex gap-1">
              {PARTS.map((p, i) => (
                <span key={p.id} className={`h-1 flex-1 rounded-full ${i < 3 ? "bg-cyan-500" : "bg-white/15"}`} />
              ))}
            </div>
          </m.div>
        </div>
      </div>

      {/* The three disciplines */}
      <div className="relative border-t border-white/10">
        <ul className="mx-auto grid max-w-7xl px-5 sm:grid-cols-3 sm:px-8">
          {disciplines.map((d, i) => (
            <li key={d.label} className={`border-white/10 ${i > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}>
              <a
                href="#servicios"
                className={`group flex items-center gap-4 py-6 text-silver-300 transition-colors hover:text-white ${
                  i > 0 ? "sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <span aria-hidden="true" className="font-display text-sm italic text-cyan-400">
                  0{i + 1}
                </span>
                <Icon name={d.icon} size={28} />
                <span className="text-sm font-semibold tracking-wide sm:text-[15px]">{d.label}</span>
                <Glyph
                  name="arrowRight"
                  size={16}
                  className="ml-auto opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
