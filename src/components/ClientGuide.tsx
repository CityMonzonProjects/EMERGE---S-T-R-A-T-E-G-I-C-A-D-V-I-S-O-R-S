// Ruta: src/components/ClientGuide.tsx
import { useState } from "react";
import { m } from "framer-motion";
import Eyebrow from "./Eyebrow";
import Glyph from "./icons/Glyph";
import Icon from "./icons/Icon";
import { fadeUp, inView, stagger } from "./motion";

const faqs = [
  {
    question: "How do we start?",
    answer:
      "Start with our Discovery Workbook. It walks you through your company, goals, finances, marketing, customers and operations. Once you submit it, an advisor reviews your answers and contacts you to arrange a discovery conversation. Scope, deliverables and timeline are agreed before any engagement begins.",
  },
  {
    question: "Why do you ask for such a detailed workbook?",
    answer:
      "Because good strategy starts with facts. The workbook lets us arrive at our first conversation already understanding your business, so the time is spent on your priorities rather than on background. It also helps both sides confirm early whether we are the right fit.",
  },
  {
    question: "Do I need to answer every question?",
    answer:
      "No. Only your name, email and company are required. Skip anything that does not apply, mark it N/A, or note that you would rather discuss it in person. Your progress is saved on your device, so you can complete it over several sittings.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "Our methodology is built on fundamentals that apply across sectors: positioning, customer economics, sales, marketing and operations. We work with growth-oriented organizations and tailor every engagement to the dynamics of your market.",
  },
  {
    question: "How long is a typical engagement?",
    answer:
      "Most engagements follow our 90-day roadmap: 30 days of discovery and audit, 30 days of strategy and optimization, and 30 days of execution and review. Longer-term support can be scoped if your goals require it.",
  },
  {
    question: "What will you need from us?",
    answer:
      "Access to your key stakeholders and a handful of documents, such as your business plan, financial summary, marketing and sales reports, website analytics and brand guidelines. The last step of the workbook helps you list what is available.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes. What you share is used only to evaluate and prepare for a potential engagement. Workbook answers stay in your browser until you choose to submit them. See our Privacy Policy for details.",
  },
];

export default function ClientGuide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="guide" className="on-light scroll-mt-24 bg-paper py-24 text-navy-950 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-32">
            <m.div variants={fadeUp}>
              <Eyebrow index="04">Client Guide</Eyebrow>
            </m.div>
            <m.h2
              variants={fadeUp}
              className="mt-7 font-display text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.02em]"
            >
              Before we <em className="text-cyan-700">begin.</em>
            </m.h2>
            <m.p variants={fadeUp} className="mt-6 max-w-sm text-lg leading-relaxed text-navy-800/80">
              Clear answers to the questions we hear most before starting an engagement with Emerge.
            </m.p>
            <m.div
              variants={fadeUp}
              className="mt-10 hidden rounded-2xl border border-navy-950/10 bg-white p-6 lg:block"
            >
              <Icon name="conversation" size={34} className="text-navy-950" />
              <div className="mt-4">
                <p className="font-semibold">Have a question first?</p>
                <a
                  href="#contacto"
                  className="group mt-1 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-navy-950"
                >
                  Send us a short note
                  <Glyph name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </m.div>
          </div>
        </m.div>

        <div className="border-t border-navy-950/15 lg:col-span-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-navy-950/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-start gap-5 py-7 text-left sm:gap-8"
                  >
                    <span aria-hidden="true" className="w-7 shrink-0 pt-1 font-display text-lg italic text-cyan-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-2xl leading-snug sm:text-[1.75rem]">
                      {faq.question}
                    </span>
                    <span
                      className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-navy-950 bg-navy-950 text-white"
                          : "border-navy-950/20 text-navy-950 group-hover:border-navy-950"
                      }`}
                    >
                      <Glyph name="plus" size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 pl-12 pr-4 text-lg leading-relaxed text-navy-800/80 sm:pl-15 sm:pr-16">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
