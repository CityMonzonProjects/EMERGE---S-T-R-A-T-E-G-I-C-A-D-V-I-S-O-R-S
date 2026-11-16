// Ruta: src/components/Process.tsx
import { m } from "framer-motion";
import Eyebrow from "./Eyebrow";
import Photo from "./Photo";
import Icon from "./icons/Icon";
import type { IconName } from "./icons/names";
import { EASE, fadeUp, inView, stagger } from "./motion";

type Phase = { days: string; title: string; icon: IconName; points: string[] };

const phases: Phase[] = [
  {
    days: "Days 1–30",
    title: "Discovery & Audit",
    icon: "diagnosis",
    points: [
      "Stakeholder interviews and document collection",
      "Marketing, sales and competitive audit",
      "Baseline metrics and KPI definition",
    ],
  },
  {
    days: "Days 31–60",
    title: "Strategy & Optimization",
    icon: "compass",
    points: [
      "Opportunity sizing and prioritized roadmap",
      "Quick wins across marketing and sales",
      "Process and systems improvements",
    ],
  },
  {
    days: "Days 61–90",
    title: "Execution & Review",
    icon: "growth",
    points: [
      "Launch of priority growth initiatives",
      "KPI tracking and reporting cadence",
      "Executive review and next-phase planning",
    ],
  },
];

const markers = [0, 30, 60, 90];

export default function Process() {
  return (
    <section id="proceso" className="relative isolate scroll-mt-24 overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <Photo name="skyline" alt="" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950 via-navy-950/80 to-navy-950" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-6 -z-10 select-none font-display text-[clamp(14rem,32vw,26rem)] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]"
      >
        90
      </span>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <m.div variants={fadeUp}>
              <Eyebrow index="03" onDark>
                How We Work
              </Eyebrow>
            </m.div>
            <m.h2
              variants={fadeUp}
              className="mt-7 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em]"
            >
              The 90-Day <em className="text-cyan-400">Roadmap.</em>
            </m.h2>
          </div>
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-silver-300 lg:col-span-5 lg:pb-2">
            A structured path from first conversation to measurable results, with clear owners,
            milestones and KPIs at every stage.
          </m.p>
        </m.div>

        {/* Day track (desktop) */}
        <div aria-hidden="true" className="relative mt-20 hidden lg:block">
          <div className="h-px bg-white/15" />
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1.8, ease: EASE }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-cyan-500"
          />
          {markers.map((d, i) => (
            <div
              key={d}
              className={`absolute top-0 ${i === markers.length - 1 ? "-translate-x-full text-right" : i > 0 ? "-translate-x-1/2 text-center" : ""}`}
              style={{ left: `${(i / (markers.length - 1)) * 100}%` }}
            >
              <span
                className={`absolute -top-[6px] size-[13px] rounded-full border-2 border-cyan-500 bg-navy-950 ${
                  i === markers.length - 1 ? "right-0" : i > 0 ? "left-1/2 -translate-x-1/2" : "left-0"
                }`}
              />
              <span className="mt-5 block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-silver-400">
                Day {d}
              </span>
            </div>
          ))}
        </div>

        <m.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-0"
        >
          {phases.map((phase, i) => (
            <m.li
              key={phase.days}
              variants={fadeUp}
              className={`relative border-l border-white/15 pl-8 lg:pr-8 ${i === 0 ? "lg:border-l-0 lg:pl-0" : "lg:pl-10"}`}
            >
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 size-[13px] rounded-full border-2 border-cyan-500 bg-navy-950 lg:hidden"
              />
              <div className="flex items-center gap-4">
                <Icon name={phase.icon} size={36} className="text-silver-300" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Phase {i + 1} · {phase.days}
                </p>
              </div>
              <h3 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">{phase.title}</h3>
              <ul className="mt-6 space-y-3 leading-relaxed text-silver-300">
                {phase.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-cyan-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
