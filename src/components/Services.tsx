// Ruta: src/components/Services.tsx
import { motion, type Variants } from "framer-motion";

type Service = {
  title: string;
  description: string;
  points: string[];
};

const services: Service[] = [
  {
    title: "Strategic Diagnosis",
    description:
      "We get to know your business, market and customers inside out to uncover where the biggest opportunities and real risks are.",
    points: [
      "Positioning and competitive analysis",
      "Review of finances, marketing and sales",
      "Clear findings and priorities",
    ],
  },
  {
    title: "Growth Plan",
    description:
      "We turn the diagnosis into a 90-day roadmap with initiatives, owners, budget and clear success metrics.",
    points: [
      "90-day and 12-month goals",
      "Quick wins and long-term initiatives",
      "KPIs and regular progress reviews",
    ],
  },
  {
    title: "Operational Optimization",
    description:
      "We prepare your organization to scale: processes, capacity, technology and teams aligned with the growth you want.",
    points: [
      "Bottleneck identification",
      "Process and systems improvement",
      "Scalability and capacity planning",
    ],
  },
];

const steps = [
  { week: "Week 1", title: "Discovery", text: "Stakeholders, documents and baseline." },
  { week: "Week 2", title: "Audit", text: "Marketing, sales and competition." },
  { week: "Week 3", title: "Recommendations", text: "Opportunities, goals and KPIs." },
  { week: "Week 4", title: "Decisions", text: "Executive review and kickoff." },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <section
      id="servicios"
      className="scroll-mt-24 bg-slate-50 py-20 text-navy-950 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-700">
            Services
          </span>
          <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Our Services
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-800/80 sm:text-lg">
            Emerge Strategic Advisors partners with companies that want to grow
            with clarity. We work side by side with your team: first we
            understand, then we prioritize and, finally, we help you execute.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ title, description, points }, index) => (
            <motion.article
              key={title}
              variants={item}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-navy-900 p-6 shadow-lg shadow-navy-950/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-950/25 sm:p-8 md:last:col-span-2 lg:last:col-span-1"
            >
              {/* Cyan accent line */}
              <span className="absolute inset-x-0 top-0 h-1 bg-cyan-500" />

              <span
                aria-hidden="true"
                className="block font-display text-5xl font-medium leading-none text-silver-500 sm:text-6xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance mt-8 font-display text-2xl font-semibold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-silver-300">
                {description}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm leading-relaxed text-silver-300">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        {/* First 30 days */}
        <div className="mt-16 sm:mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-balance text-center font-display text-2xl font-semibold"
          >
            What to Expect: Your First 30 Days
          </motion.h3>

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step) => (
              <motion.li
                key={step.week}
                variants={item}
                className="rounded-xl border border-navy-900/10 bg-white p-5"
              >
                <span className="text-sm font-semibold uppercase tracking-widest text-cyan-700">
                  {step.week}
                </span>
                <p className="mt-1 font-semibold text-navy-950">{step.title}</p>
                <p className="mt-1 text-sm text-navy-800/80">{step.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
