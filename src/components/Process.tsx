// Ruta: src/components/Process.tsx
import { motion, type Variants } from "framer-motion";

type Phase = {
  days: string;
  title: string;
  points: string[];
};

const phases: Phase[] = [
  {
    days: "Days 1-30",
    title: "Discovery & Audit",
    points: [
      "Stakeholder interviews and document collection",
      "Marketing, sales and competitive audit",
      "Baseline metrics and KPI definition",
    ],
  },
  {
    days: "Days 31-60",
    title: "Strategy & Optimization",
    points: [
      "Opportunity sizing and prioritized roadmap",
      "Quick wins across marketing and sales",
      "Process and systems improvements",
    ],
  },
  {
    days: "Days 61-90",
    title: "Execution & Review",
    points: [
      "Launch of priority growth initiatives",
      "KPI tracking and reporting cadence",
      "Executive review and next-phase planning",
    ],
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Process() {
  return (
    <section id="proceso" className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Our Proven Process
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            The 90-Day Roadmap
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-silver-300">
            A structured path from first conversation to measurable results,
            with clear owners, milestones and KPIs at every stage.
          </p>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8"
        >
          {phases.map(({ days, title, points }, index) => (
            <motion.li
              key={days}
              variants={item}
              className="rounded-2xl border border-t-2 border-navy-800 border-t-cyan-500 bg-navy-900 p-7 shadow-lg shadow-black/20 sm:p-8"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Phase {index + 1}
              </span>
              <p className="mt-1 text-sm leading-relaxed text-silver-300">{days}</p>
              <h3 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-white">
                {title}
              </h3>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-silver-300">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
