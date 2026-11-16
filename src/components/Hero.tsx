// Ruta: src/components/Hero.tsx
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { ArrowRight, CalendarCheck } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const LINE_1 = "Clear Strategy.";
const LINE_2 = "Real Growth.";

// Visual line: the full text is rendered invisibly to reserve its space, so
// typing never shifts the layout; the typed part is overlaid on top.
function TypedLine({ full, typed, caret }: { full: string; typed: string; caret: boolean }) {
  return (
    <span className="relative block">
      <span className="invisible">{full}</span>
      <span className="absolute inset-0">
        {typed}
        {caret && (
          <span className="ml-1 inline-block h-[0.8em] w-0.5 translate-y-[0.05em] bg-cyan-500" />
        )}
      </span>
    </span>
  );
}

export default function Hero() {
  const { count, done } = useTypewriter(`${LINE_1} ${LINE_2}`);
  const typed1 = LINE_1.slice(0, count);
  const typed2 = LINE_2.slice(0, Math.max(0, count - LINE_1.length - 1));
  const onLine2 = count > LINE_1.length;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-linear-to-b from-navy-950 to-navy-900"
    >
      {/* Corporate architecture photo; eager-loaded because it is above the fold */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-navy-950/85" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-navy-900" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-5 pb-36 pt-28 text-center sm:px-6 sm:pb-44 sm:pt-32"
      >
        {/* Soft radial glow behind the text for legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,13,31,0.88),rgba(6,13,31,0.5)_60%,transparent)] sm:h-[40rem] sm:w-[40rem] lg:h-[52rem] lg:w-[52rem]"
        />

        <motion.h1
          variants={item}
          className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span className="sr-only">Clear Strategy. Real Growth.</span>
          <span aria-hidden="true" className="block">
            <TypedLine full={LINE_1} typed={typed1} caret={!done && !onLine2} />
            <span className="block text-cyan-500">
              <TypedLine full={LINE_2} typed={typed2} caret={!done && onLine2} />
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-base leading-relaxed text-silver-300 sm:mt-6 sm:text-lg md:text-xl"
        >
          We turn complex business challenges into clear, measurable growth.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10 sm:w-auto sm:flex-row"
        >
          <a
            href="#contacto"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 sm:w-auto"
          >
            <CalendarCheck size={20} />
            Schedule a Consultation
          </a>
          <a
            href="#servicios"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition-colors hover:border-cyan-400 hover:bg-white/10 sm:w-auto"
          >
            Explore Services
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative scroll cue; static when the visitor prefers reduced motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-silver-400">
          Scroll to explore
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-5 bg-cyan-500"
            initial={{ y: reduceMotion ? 0 : "-100%" }}
            animate={reduceMotion ? { y: 0 } : { y: ["-100%", "240%"] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }
            }
          />
        </span>
      </div>
    </section>
  );
}
