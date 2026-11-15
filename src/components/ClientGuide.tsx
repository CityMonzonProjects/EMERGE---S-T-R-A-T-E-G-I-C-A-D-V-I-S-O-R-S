// Ruta: src/components/ClientGuide.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do we start?",
    answer:
      "We begin with a discovery conversation and a short intake workbook covering your company profile, goals, challenges, finances and marketing. From there we agree on scope, deliverables and timeline before the engagement kicks off.",
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
      "Access to your key stakeholders and a handful of documents, such as your business plan, financial summary, marketing and sales reports, website analytics and brand guidelines. We will give you a clear checklist at kickoff.",
  },
];

export default function ClientGuide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="guide" className="bg-slate-50 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Client Guide
          </span>
          <h2 className="text-balance mt-4 font-display text-4xl font-semibold leading-[1.1] text-navy-950 sm:text-5xl">
            What to Expect
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-800/80">
            Clear answers to the questions we hear most before starting an
            engagement with Emerge.
          </p>
          <a
            href="#contacto"
            className="group mt-8 inline-flex items-center gap-2 font-semibold text-cyan-700 transition-colors hover:text-navy-950"
          >
            Still have questions? Contact us
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="space-y-3 lg:col-span-7"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-cyan-600/40 shadow-md shadow-navy-900/5"
                    : "border-navy-900/10"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-base font-semibold text-navy-950 sm:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={22}
                      aria-hidden="true"
                      className={`shrink-0 text-cyan-700 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 leading-relaxed text-navy-800/80 sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
