// Ruta: src/components/Contact.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import {Send, ShieldCheck } from "lucide-react";

type FormData = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

const initialForm: FormData = { name: "", email: "", message: "" };

// Netlify Forms: the form is declared statically in public/__forms.html
const encode = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

const inputClasses =
  "w-full rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-white placeholder:text-silver-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30";

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get("bot-field");
    if (honeypot) return; // bots fill the hidden field; humans never see it

    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-24 relative overflow-hidden bg-linear-to-b from-navy-950 to-navy-900 py-24"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-navy-700/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Contact
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-silver-300">
            Tell us about your business and goals. We will review your message
            and schedule a conversation to explore how Emerge can bring clarity
            and momentum to your strategy.
          </p>

          <ul className="mt-8 space-y-4 text-silver-300">
            <li className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-cyan-500" />
              Everything you share is kept confidential.
            </li>
          </ul>
        </motion.div>

        <motion.form
          name="contact"
          method="POST"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
        >
          <div className="space-y-5">
            <p aria-hidden="true" className="sr-only">
              <label>
                Do not fill this field if you are human
                <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-silver-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-silver-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-silver-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your business and what you want to achieve"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Send size={18} />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "error" && (
              <p role="alert" className="text-center text-sm font-medium text-red-300">
                Something went wrong and your message was not sent. Please try again in a moment.
              </p>
            )}

            {status === "sent" && (
              <p
                role="status"
                className="text-center text-sm font-medium text-cyan-400"
              >
                Thank you! Your message has been sent. We will be in touch soon.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
