// Ruta: src/components/About.tsx
import { m } from "framer-motion";
import Eyebrow from "./Eyebrow";
import Photo from "./Photo";
import Icon from "./icons/Icon";
import type { IconName } from "./icons/names";
import { fadeUp, inView, stagger } from "./motion";

const pillars: { icon: IconName; label: string; text: string }[] = [
  {
    icon: "compass",
    label: "Our Mission",
    text: "To give leaders a clearer picture of their business and a stronger strategy to grow it, turning insight into decisions and decisions into measurable results.",
  },
  {
    icon: "horizon",
    label: "Our Vision",
    text: "To be the trusted strategic partner of ambitious companies, known for rigorous thinking and for plans that actually get executed.",
  },
  {
    icon: "stairs",
    label: "Our Approach",
    text: "Rigorous diagnosis first: we study your market, customers, finances and operations before recommending anything. Then we build actionable plans with prioritized initiatives, clear owners and KPIs your team can deliver.",
  },
];

export default function About() {
  return (
    <section id="about" className="on-light relative scroll-mt-24 bg-paper py-24 text-navy-950 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Collage */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 mb-14 lg:sticky lg:top-32 lg:order-1 lg:col-span-6 lg:mb-0 lg:self-start lg:mt-16"
        >
          <Photo
            name="boardroom"
            alt="Leadership team meeting around a long boardroom table"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-4/3 w-full rounded-[1.75rem] object-cover"
          />
          <div className="absolute -bottom-14 right-3 w-[48%] overflow-hidden rounded-2xl border-8 border-paper shadow-xl shadow-navy-950/15 sm:-right-6">
            <Photo
              name="advisory"
              alt="Two executives in a one-to-one advisory conversation"
              sizes="(min-width: 1024px) 22vw, 50vw"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <figure className="absolute -top-10 left-4 max-w-[17rem] rounded-2xl bg-navy-950 p-6 text-white shadow-2xl shadow-navy-950/25 sm:left-8 lg:-left-6">
            <blockquote className="font-display text-2xl italic leading-snug">
              A clearer picture.
              <br />
              <span className="text-cyan-400">A stronger strategy.</span>
            </blockquote>
          </figure>
        </m.div>

        {/* Text */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="order-1 lg:order-2 lg:col-span-6 lg:pl-10"
        >
          <m.div variants={fadeUp}>
            <Eyebrow index="01">About Emerge</Eyebrow>
          </m.div>
          <m.h2
            variants={fadeUp}
            className="mt-7 text-balance font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em]"
          >
            Strategy built on a <em className="text-cyan-700">clearer picture.</em>
          </m.h2>
          <m.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-navy-800/85 sm:text-xl">
            Emerge Strategic Advisors helps organizations see their business as it really is and
            decide, with confidence, where to grow next.
          </m.p>

          <ul className="mt-12 border-t border-navy-950/10">
            {pillars.map((p) => (
              <m.li
                key={p.label}
                variants={fadeUp}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-navy-950/10 py-7"
              >
                <Icon name={p.icon} size={34} className="mt-0.5 text-navy-950" />
                <div>
                  <h3 className="font-display text-2xl leading-tight">{p.label}</h3>
                  <p className="mt-2 leading-relaxed text-navy-800/80">{p.text}</p>
                </div>
              </m.li>
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  );
}
