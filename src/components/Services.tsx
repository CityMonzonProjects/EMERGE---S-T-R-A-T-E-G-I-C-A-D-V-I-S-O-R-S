// Ruta: src/components/Services.tsx
import { m } from "framer-motion";
import Eyebrow from "./Eyebrow";
import Photo, { type PhotoName } from "./Photo";
import Icon from "./icons/Icon";
import type { IconName } from "./icons/names";
import { EASE, fadeUp, inView, stagger } from "./motion";

type Service = {
  title: string;
  icon: IconName;
  photo: PhotoName;
  alt: string;
  description: string;
  points: string[];
};

const services: Service[] = [
  {
    title: "Strategic Diagnosis",
    icon: "diagnosis",
    photo: "diagnosis",
    alt: "Advisors in suits reviewing documents together at a table",
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
    icon: "growth",
    photo: "growth-chart",
    alt: "Hand-drawn growth chart on paper with a pen and ruler",
    description:
      "We turn the diagnosis into a 90-day roadmap with initiatives, owners, budget and clear success metrics.",
    points: ["90-day and 12-month goals", "Quick wins and long-term initiatives", "KPIs and regular progress reviews"],
  },
  {
    title: "Operational Optimization",
    icon: "operations",
    photo: "workshop",
    alt: "Team planning workshop with notes on a whiteboard",
    description:
      "We prepare your organization to scale: processes, capacity, technology and teams aligned with the growth you want.",
    points: ["Bottleneck identification", "Process and systems improvement", "Scalability and capacity planning"],
  },
];

const steps = [
  { week: "Week 1", title: "Discovery", text: "Stakeholders, documents and baseline." },
  { week: "Week 2", title: "Audit", text: "Marketing, sales and competition." },
  { week: "Week 3", title: "Recommendations", text: "Opportunities, goals and KPIs." },
  { week: "Week 4", title: "Decisions", text: "Executive review and kickoff." },
];

function Points({ points, onDark }: { points: string[]; onDark?: boolean }) {
  return (
    <ul className={`space-y-2.5 text-sm leading-relaxed ${onDark ? "text-silver-300" : "text-navy-800/80"}`}>
      {points.map((p) => (
        <li key={p} className="flex items-start gap-3">
          <span aria-hidden="true" className={`mt-2.5 h-px w-4 shrink-0 ${onDark ? "bg-cyan-400" : "bg-cyan-700"}`} />
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  const [lead, ...rest] = services;

  return (
    <section id="servicios" className="on-light scroll-mt-24 bg-white py-24 text-navy-950 sm:py-32">
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
              <Eyebrow index="02">Services</Eyebrow>
            </m.div>
            <m.h2
              variants={fadeUp}
              className="mt-7 text-balance font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em]"
            >
              Three disciplines. <em className="text-cyan-700">One integrated plan.</em>
            </m.h2>
          </div>
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-navy-800/80 lg:col-span-5 lg:pb-2">
            We partner with companies that want to grow with clarity, working side by side with your
            team: first we understand, then we prioritize and, finally, we help you execute.
          </m.p>
        </m.div>

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-5 lg:grid-cols-12 lg:grid-rows-2"
        >
          {/* Lead service: full-bleed photo card */}
          <m.article
            variants={fadeUp}
            className="group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy-950 p-7 text-white [--icon-accent:var(--color-cyan-400)] sm:p-10 lg:col-span-7 lg:row-span-2 lg:min-h-[40rem]"
          >
            <Photo
              name={lead.photo}
              alt={lead.alt}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_30%] opacity-60 grayscale transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/80 to-navy-800/40 mix-blend-multiply" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-navy-950 to-transparent" />
            <div className="flex items-end justify-between gap-6">
              <Icon name={lead.icon} size={44} className="text-white" />
              <span aria-hidden="true" className="font-display text-6xl italic leading-none text-white/25">
                01
              </span>
            </div>
            <h3 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">{lead.title}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-silver-300">{lead.description}</p>
            <div className="mt-8 border-t border-white/15 pt-6">
              <Points points={lead.points} onDark />
            </div>
          </m.article>

          {rest.map((s, i) => (
            <m.article
              key={s.title}
              variants={fadeUp}
              className="group grid overflow-hidden rounded-[1.75rem] border border-navy-950/10 bg-paper sm:grid-cols-[1fr_38%] lg:col-span-5"
            >
              <div className="flex flex-col p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <Icon name={s.icon} size={36} className="text-navy-950" />
                  <span aria-hidden="true" className="font-display text-4xl italic leading-none text-navy-950/20">
                    0{i + 2}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-800/80">{s.description}</p>
                <div className="mt-6">
                  <Points points={s.points} />
                </div>
              </div>
              <div className="relative order-first min-h-44 overflow-hidden sm:order-none sm:min-h-0">
                <Photo
                  name={s.photo}
                  alt={s.alt}
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                />
              </div>
            </m.article>
          ))}
        </m.div>

        {/* First 30 days */}
        <div className="mt-24 grid gap-12 border-t border-navy-950/10 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>What to expect</Eyebrow>
            <h3 className="mt-5 font-display text-4xl leading-tight">Your first 30 days</h3>
            <p className="mt-4 max-w-sm leading-relaxed text-navy-800/80">
              A structured first month, from discovery to decisions.
            </p>
          </div>
          <m.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="relative grid gap-10 border-l border-navy-950/15 pl-7 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:col-span-8 lg:grid-cols-4 lg:gap-6"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px bg-navy-950/15 lg:block" />
            <m.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-cyan-700 lg:block"
            />
            {steps.map((step) => (
              <m.li key={step.week} variants={fadeUp} className="relative">
                <span aria-hidden="true" className="absolute -left-[calc(1.75rem+8px)] top-0 block size-[15px] rounded-full border-2 border-cyan-700 bg-white sm:relative sm:left-0" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:mt-5">{step.week}</p>
                <p className="mt-2 text-lg font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-800/80">{step.text}</p>
              </m.li>
            ))}
          </m.ol>
        </div>
      </div>
    </section>
  );
}
