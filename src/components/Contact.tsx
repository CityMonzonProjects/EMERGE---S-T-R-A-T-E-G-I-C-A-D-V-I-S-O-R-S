// Ruta: src/components/Contact.tsx
// Closing section: the Discovery Workbook is the main way to start. A short
// note form stays available (collapsed) for quick questions and privacy
// requests, since the site publishes no email or phone.
import { useState, type ChangeEvent, type FormEvent } from "react";
import { m } from "framer-motion";
import { PARTS } from "../data/workbook";
import Eyebrow from "./Eyebrow";
import Photo from "./Photo";
import Glyph from "./icons/Glyph";
import Icon from "./icons/Icon";
import type { IconName } from "./icons/names";
import { fadeUp, inView, stagger } from "./motion";

type NoteData = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

const emptyNote: NoteData = { name: "", email: "", message: "" };

const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: "workbook", title: "Complete the workbook", text: "At your own pace. Progress saves on your device." },
  { icon: "diagnosis", title: "We review your answers", text: "An advisor studies your business before we meet." },
  { icon: "conversation", title: "Discovery conversation", text: "Priorities, fit, scope and next steps." },
];

const inputClasses =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-silver-500 transition-colors focus:border-cyan-500";

function QuickNote() {
  const [form, setForm] = useState<NoteData>(emptyNote);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (new FormData(e.currentTarget).get("bot-field")) return; // spam trap

    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...form }).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm(emptyNote);
    } catch {
      setStatus("error");
    }
  };

  return (
    <details className="group mt-10 rounded-2xl border border-white/12 bg-white/[0.03]">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-sm font-semibold text-white sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3">
          <Icon name="conversation" size={24} className="text-silver-300" />
          Have a quick question first? Send us a short note.
        </span>
        <Glyph name="chevronDown" size={18} className="shrink-0 text-silver-400 transition-transform group-open:rotate-180" />
      </summary>

      <form name="contact" method="POST" onSubmit={handleSubmit} className="border-t border-white/10 p-5 sm:p-6">
        <p aria-hidden="true" className="sr-only">
          <label>
            Do not fill this field if you are human
            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="note-name" className="mb-2 block text-sm font-medium text-silver-300">
              Name
            </label>
            <input id="note-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="note-email" className="mb-2 block text-sm font-medium text-silver-300">
              Email
            </label>
            <input id="note-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="note-message" className="mb-2 block text-sm font-medium text-silver-300">
              Message
            </label>
            <textarea
              id="note-message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className={`${inputClasses} resize-y`}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:border-cyan-400 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Glyph name="send" size={16} />
            {status === "sending" ? "Sending…" : "Send note"}
          </button>
          <div aria-live="polite" className="text-sm">
            {status === "error" && (
              <p role="alert" className="font-medium text-red-300">
                Something went wrong and your note was not sent. Please try again in a moment.
              </p>
            )}
            {status === "sent" && (
              <p role="status" className="font-medium text-cyan-400">
                Thank you. Your note has been sent and we will be in touch soon.
              </p>
            )}
          </div>
        </div>
      </form>
    </details>
  );
}

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative isolate scroll-mt-24 overflow-hidden bg-navy-900 bg-[radial-gradient(60%_50%_at_0%_100%,rgba(0,194,255,0.08),transparent_70%)] py-24 text-white sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Photo with a glimpse of the workbook */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16 lg:col-span-6 lg:mb-0"
        >
          <Photo
            name="success"
            alt="Two colleagues celebrating a result with a high five at the office"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-5/4 w-full rounded-[1.75rem] object-cover"
          />
          <div
            aria-hidden="true"
            className="on-light absolute -bottom-16 right-3 w-[min(19rem,86%)] rounded-2xl bg-white p-5 text-navy-950 shadow-2xl shadow-black/40 sm:-right-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800/75">Discovery Workbook</p>
              <Icon name="workbook" size={22} />
            </div>
            <ul className="mt-4 space-y-2.5">
              {PARTS.slice(0, 4).map((p, i) => (
                <li key={p.id} className="flex items-center gap-3 text-sm">
                  {i < 2 ? (
                    <span className="grid size-4 place-items-center rounded-full bg-cyan-700 text-white">
                      <Glyph name="check" size={11} />
                    </span>
                  ) : (
                    <span className="relative size-4 overflow-hidden rounded-full border border-navy-950/30">
                      {i === 2 && <span className="absolute inset-y-0 left-0 w-1/2 bg-cyan-700" />}
                    </span>
                  )}
                  <span className={i < 2 ? "text-navy-800/75" : "font-semibold"}>{p.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-navy-950/10">
              <div className="h-full w-[38%] rounded-full bg-cyan-700" />
            </div>
          </div>
        </m.div>

        <m.div variants={stagger} initial="hidden" whileInView="visible" viewport={inView} className="lg:col-span-6 lg:pl-10">
          <m.div variants={fadeUp}>
            <Eyebrow index="05" onDark>
              Begin
            </Eyebrow>
          </m.div>
          <m.h2
            variants={fadeUp}
            className="mt-7 text-balance font-display text-[clamp(2.5rem,4.6vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.02em]"
          >
            Ready to accelerate <em className="text-cyan-400">your growth?</em>
          </m.h2>
          <m.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-silver-300">
            We work with leaders who are ready to look closely at their business. The first step is
            our Discovery Workbook: a guided walk through your company, goals, finances, marketing,
            customers and operations, so our first conversation starts from your reality.
          </m.p>

          <m.ol variants={fadeUp} className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-navy-900 p-5">
                <div className="flex items-center justify-between">
                  <Icon name={s.icon} size={28} className="text-silver-300" />
                  <span aria-hidden="true" className="font-display text-lg italic text-cyan-400">
                    {i + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-silver-400">{s.text}</p>
              </li>
            ))}
          </m.ol>

          <m.div variants={fadeUp} className="mt-10 flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
            <a
              href="/discovery"
              className="group inline-flex min-h-14 items-center justify-center gap-3 self-start whitespace-nowrap rounded-full bg-cyan-500 pl-7 pr-6 text-base font-semibold text-navy-950 transition-colors hover:bg-cyan-400 max-sm:self-stretch max-sm:whitespace-normal"
            >
              Start the Discovery Workbook
              <span className="grid size-8 place-items-center rounded-full bg-navy-950 text-cyan-400 transition-transform group-hover:translate-x-0.5">
                <Glyph name="arrowRight" size={16} />
              </span>
            </a>
            <p className="text-sm leading-relaxed text-silver-400">
              About 45–60 minutes. Only name, email
              <br className="hidden xl:block" /> and company are required.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <QuickNote />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
