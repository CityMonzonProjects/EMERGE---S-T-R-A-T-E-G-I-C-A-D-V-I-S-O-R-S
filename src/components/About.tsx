// Ruta: src/components/About.tsx
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80";

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
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle parallax: the photo drifts slower than the page
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-20 sm:py-28 lg:py-32"
    >
      {/* Full-bleed office photo */}
      <motion.img
        src={OFFICE_IMAGE}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={reduceMotion ? undefined : { y: imageY }}
        className="absolute -inset-y-[6%] inset-x-0 h-[112%] w-full max-w-none object-cover"
      />
      {/* Light navy tint overall; stronger on the text side */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-navy-950/70 via-navy-950/20 to-transparent"
      />
      {/* Keeps the tagline legible over the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-navy-950/70 to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
        {/* Glass text panel */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="rounded-3xl border border-white/10 bg-navy-950/80 p-6 shadow-2xl shadow-navy-950/40 backdrop-blur-md sm:p-10 lg:col-span-7 lg:p-14"
        >
          <motion.span
            variants={item}
            className="text-sm font-semibold uppercase tracking-widest text-cyan-400"
          >
            About Emerge
          </motion.span>

          <motion.h2
            variants={item}
            className="text-balance mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Strategy built on a clearer picture.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-xl leading-relaxed text-silver-300 sm:text-2xl"
          >
            Emerge Strategic Advisors helps organizations see their business
            as it really is and decide, with confidence, where to grow next.
          </motion.p>

          <div className="mt-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                variants={item}
                className="grid gap-3 border-t border-white/15 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                    0{index + 1}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
                    {pillar.label}
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-silver-300 sm:text-xl">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photo side: the image takes the lead, with the tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-balance font-display text-3xl font-semibold leading-tight text-white drop-shadow-[0_2px_12px_rgba(6,13,31,0.8)] sm:text-4xl lg:col-span-5 lg:pb-6 lg:text-5xl"
        >
          A clearer picture.
          <br />A stronger strategy.
        </motion.p>
      </div>
    </section>
  );
}
