// Ruta: src/components/About.tsx
import { motion, type Variants } from "framer-motion";

const pillars = [
  {
    label: "Our Mission",
    text: "To give leaders a clearer picture of their business and a stronger strategy to grow it, turning insight into decisions and decisions into measurable results.",
  },
  {
    label: "Our Vision",
    text: "To be the trusted strategic partner of ambitious companies, known for rigorous thinking and for plans that actually get executed.",
  },
  {
    label: "Our Approach",
    text: "Rigorous diagnosis first: we study your market, customers, finances and operations before recommending anything. Then we build actionable plans with prioritized initiatives, clear owners and KPIs your team can deliver.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Text column */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="lg:col-span-7"
        >
          <motion.span
            variants={item}
            className="text-sm font-semibold uppercase tracking-widest text-cyan-700"
          >
            About Emerge
          </motion.span>

          <motion.h2
            variants={item}
            className="text-balance mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl md:text-6xl"
          >
            Strategy built on a clearer picture.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-800/80 sm:text-xl"
          >
            Emerge Strategic Advisors helps organizations see their business
            as it really is and decide, with confidence, where to grow next.
          </motion.p>

          <div className="mt-12 space-y-0">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                variants={item}
                className="grid gap-3 border-t border-navy-900/10 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
              >
                <div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-cyan-700">
                    0{index + 1}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-navy-950">
                    {pillar.label}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-navy-800/80 sm:text-lg">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-cyan-400 via-cyan-500 to-cyan-600 p-8 text-navy-950 sm:min-h-[28rem] sm:p-10 lg:sticky lg:top-28 lg:min-h-[34rem]">
            <svg
              aria-hidden="true"
              viewBox="0 0 400 500"
              preserveAspectRatio="xMidYMid slice"
              className="pointer-events-none absolute inset-0 h-full w-full text-navy-950/20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M-20 440 C 120 320, 240 180, 430 110" />
              <path d="M-20 480 C 140 360, 260 220, 430 160" />
              <path d="M-20 520 C 160 400, 280 260, 430 210" />
              <circle cx="320" cy="120" r="90" />
              <circle cx="320" cy="120" r="50" />
            </svg>

            <span className="relative text-sm font-semibold uppercase tracking-widest">
              Emerge Strategic Advisors
            </span>
            <p className="text-balance relative font-display text-3xl font-semibold leading-tight sm:text-4xl">
              A clearer picture.
              <br />A stronger strategy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
