// Ruta: src/components/discovery/DiscoveryPage.tsx
// The Client Discovery Workbook as a guided, multi-step form at /discovery.
// Progress is saved in the visitor's browser; nothing is sent until submit.
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { PARTS, QUESTION_COUNT, SECTIONS, type Section } from "../../data/workbook";
import { usePageMeta } from "../../hooks/usePageMeta";
import Glyph from "../icons/Glyph";
import Icon from "../icons/Icon";
import type { IconName } from "../icons/names";
import QuestionField from "./QuestionField";
import {
  answeredCount,
  buildPayload,
  clearSaved,
  firstInvalidSection,
  formatAll,
  loadSaved,
  minutesFor,
  saveProgress,
  sectionProgress,
  sectionStatus,
  validateSection,
  type Answers,
  type SectionStatus,
} from "./answers";

const WELCOME = 0;
const REVIEW = SECTIONS.length + 1;
const PART_OF = SECTIONS.map((s) => PARTS.findIndex((p) => p.sections.includes(s)));

type SendStatus = "idle" | "sending" | "sent" | "error";

const btnPrimary =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy-950 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-950/5";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700";

function StatusMark({ status, active }: { status: SectionStatus; active?: boolean }) {
  if (status === "complete") {
    return (
      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-cyan-700 text-white">
        <Glyph name="check" size={11} />
      </span>
    );
  }
  return (
    <span
      className={`relative size-4 shrink-0 overflow-hidden rounded-full border ${
        active ? "border-navy-950" : "border-navy-950/30"
      }`}
    >
      {status === "partial" && <span className="absolute inset-y-0 left-0 w-1/2 bg-cyan-700" />}
    </span>
  );
}

const STATUS_LABEL: Record<SectionStatus, string> = {
  empty: "not started",
  partial: "in progress",
  complete: "complete",
};

function Contents({
  current,
  answers,
  onGo,
}: {
  current: number;
  answers: Answers;
  onGo: (step: number) => void;
}) {
  return (
    <nav aria-label="Workbook sections">
      <ol className="space-y-7">
        {PARTS.map((part, pi) => (
          <li key={part.id}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800/70">
              Part {pi + 1} · {part.title}
            </p>
            <ol className="mt-2.5 border-l border-navy-950/10">
              {part.sections.map((s) => {
                const step = SECTIONS.indexOf(s) + 1;
                const active = step === current;
                const status = sectionStatus(s, answers);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onGo(step)}
                      aria-current={active ? "step" : undefined}
                      className={`-ml-px flex w-full items-center gap-3 border-l-2 py-1.5 pl-4 pr-2 text-left text-sm transition-colors ${
                        active
                          ? "border-cyan-700 font-semibold text-navy-950"
                          : "border-transparent text-navy-800/80 hover:text-navy-950"
                      }`}
                    >
                      <StatusMark status={status} active={active} />
                      <span>{s.title}</span>
                      <span className="sr-only">, {STATUS_LABEL[status]}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => onGo(REVIEW)}
            aria-current={current === REVIEW ? "step" : undefined}
            className={`flex items-center gap-3 text-sm font-semibold transition-colors ${
              current === REVIEW ? "text-navy-950" : "text-cyan-700 hover:text-navy-950"
            }`}
          >
            <Glyph name="check" size={16} />
            Review &amp; submit
          </button>
        </li>
      </ol>
    </nav>
  );
}

function SavedNote({ state }: { state: "idle" | "saved" | "unavailable" }) {
  if (state === "idle") return null;
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-navy-800/70">
      <Glyph name={state === "saved" ? "check" : "info"} size={14} />
      {state === "saved" ? "Saved on this device" : "Autosave is unavailable in this browser"}
    </p>
  );
}

function Heading({ children, headingRef }: { children: ReactNode; headingRef: Ref<HTMLHeadingElement> }) {
  return (
    <h1
      ref={headingRef}
      tabIndex={-1}
      className="text-balance font-display text-4xl font-normal leading-[1.08] tracking-tight text-navy-950 outline-none sm:text-5xl"
    >
      {children}
    </h1>
  );
}

export default function DiscoveryPage() {
  usePageMeta("Discovery Workbook | Emerge Strategic Advisors");

  const [saved] = useState(loadSaved);
  const [answers, setAnswers] = useState<Answers>(() => saved?.answers ?? {});
  const [step, setStep] = useState(WELCOME);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveState, setSaveState] = useState<"idle" | "saved" | "unavailable">(saved ? "saved" : "idle");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentsRef = useRef<HTMLDetailsElement>(null);
  const lastStep = useRef(saved?.step ?? 0);
  const latest = useRef({ answers, step: saved?.step ?? 0 });
  const mounted = useRef(false);

  const answered = answeredCount(answers);
  const hasProgress = answered > 0;

  useEffect(() => {
    latest.current = { answers, step: lastStep.current };
  });

  // Autosave (debounced) and a final flush when the tab is hidden or closed
  useEffect(() => {
    if (status === "sent" || (!hasProgress && lastStep.current === 0)) return;
    const t = window.setTimeout(
      () => setSaveState(saveProgress(answers, lastStep.current) ? "saved" : "unavailable"),
      400,
    );
    return () => window.clearTimeout(t);
  }, [answers, step, status, hasProgress]);

  useEffect(() => {
    const flush = () => {
      if (status !== "sent" && answeredCount(latest.current.answers) > 0) {
        saveProgress(latest.current.answers, latest.current.step);
      }
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [status]);

  // Each step behaves like a new page: back to top, focus on its heading
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const update = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest[key];
        return rest;
      });
    }
  };

  const moveTo = (target: number) => {
    const clamped = Math.min(Math.max(target, WELCOME), REVIEW);
    if (clamped > WELCOME) lastStep.current = clamped;
    setStep(clamped);
  };

  const go = (target: number) => {
    setErrors({});
    moveTo(target);
    if (contentsRef.current) contentsRef.current.open = false;
  };

  const next = (section: Section) => {
    const found = validateSection(section, answers);
    const first = Object.keys(found)[0];
    if (first) {
      setErrors(found);
      requestAnimationFrame(() => document.getElementById(`q-${first}`)?.focus());
      return;
    }
    go(step + 1);
  };

  const resetAll = () => {
    clearSaved();
    lastStep.current = 0;
    setAnswers({});
    setSaveState("idle");
    setConfirmReset(false);
  };

  const downloadCopy = () => {
    const url = URL.createObjectURL(new Blob([formatAll(answers)], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "emerge-discovery-workbook.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (new FormData(e.currentTarget).get("bot-field")) return; // spam trap

    const invalid = firstInvalidSection(answers);
    if (invalid >= 0) {
      moveTo(invalid + 1);
      setErrors(validateSection(SECTIONS[invalid], answers));
      return;
    }
    if (!consent) {
      setConsentError(true);
      document.getElementById("consent")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(buildPayload(answers)).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      clearSaved();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const firstName = (answers.contactName ?? "").trim().split(/\s+/)[0];
  const sectionIndex = step - 1;
  const section = step > WELCOME && step < REVIEW ? SECTIONS[sectionIndex] : null;
  const withContents = status !== "sent" && step !== WELCOME;
  const progress = status === "sent" ? 100 : Math.round((Math.min(step, REVIEW) / REVIEW) * 100);

  let view: ReactNode;

  if (status === "sent") {
    view = (
      <div className="mx-auto max-w-2xl py-10 text-center sm:py-16">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-navy-950 text-white [--icon-accent:var(--color-cyan-500)]">
          <Icon name="checklist" size={40} />
        </span>
        <div className="mt-8">
          <Heading headingRef={headingRef}>
            Thank you{firstName ? `, ${firstName}` : ""}.
          </Heading>
        </div>
        <p className="mt-5 text-lg leading-relaxed text-navy-800/80">
          Your Discovery Workbook has been received. An Emerge advisor will review your answers
          personally and contact you to arrange your discovery conversation.
        </p>
        <a href="/" className={`${btnPrimary} mt-10`}>
          <Glyph name="arrowLeft" size={18} />
          Back to home
        </a>
      </div>
    );
  } else if (step === WELCOME) {
    view = (
      <div>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className={eyebrow}>Client Discovery Workbook</p>
            <div className="mt-5">
              <Heading headingRef={headingRef}>
                Let&rsquo;s get a clear picture of your business.
              </Heading>
            </div>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-800/85">
              Thank you for considering Emerge. Before our first conversation, we ask leaders to
              walk us through their business with this workbook. It is the same one we use in every
              engagement, and it means our first meeting starts from your reality rather than from
              generic questions.
            </p>

            {hasProgress ? (
              <div className="mt-8 rounded-2xl border border-navy-950/10 bg-white p-5 sm:p-6">
                <p className="font-semibold text-navy-950">Welcome back.</p>
                <p className="mt-1 text-sm text-navy-800/80">
                  You have answered {answered} of {QUESTION_COUNT} questions. Your progress was saved
                  on this device.
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-navy-950/10">
                  <div
                    className="h-full rounded-full bg-cyan-700"
                    style={{ width: `${Math.round((answered / QUESTION_COUNT) * 100)}%` }}
                  />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button type="button" className={btnPrimary} onClick={() => go(lastStep.current || 1)}>
                    Continue where you left off
                    <Glyph name="arrowRight" size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {confirmReset ? (
                    <span className="flex flex-wrap items-center gap-2 text-sm text-navy-900">
                      Clear all answers?
                      <button type="button" className="rounded-full px-3 py-2 font-semibold text-red-700 hover:bg-red-700/5" onClick={resetAll}>
                        Yes, start over
                      </button>
                      <button type="button" className="rounded-full px-3 py-2 font-semibold hover:bg-navy-950/5" onClick={() => setConfirmReset(false)}>
                        Keep my answers
                      </button>
                    </span>
                  ) : (
                    <button type="button" className={btnGhost} onClick={() => setConfirmReset(true)}>
                      <Glyph name="restart" size={16} />
                      Start over
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <button type="button" className={btnPrimary} onClick={() => go(1)}>
                  Begin the workbook
                  <Glyph name="arrowRight" size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-sm text-navy-800/75">Plan for about 45–60 minutes, in one sitting or several.</p>
              </div>
            )}
          </div>

          <figure className="relative lg:col-span-5">
            <img
              src="/images/advisory-1600.webp"
              srcSet="/images/advisory-800.webp 800w, /images/advisory-1600.webp 1600w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Two business leaders in conversation at a table by an office window"
              width={1600}
              height={1067}
              className="aspect-4/3 w-full rounded-2xl object-cover lg:aspect-4/5"
            />
            <figcaption className="absolute -bottom-6 left-4 right-4 rounded-xl bg-navy-950 p-5 text-white shadow-2xl shadow-navy-950/25 sm:left-auto sm:right-6 sm:w-72 [--icon-accent:var(--color-cyan-500)]">
              <div className="flex items-center gap-3">
                <Icon name="workbook" size={28} className="text-silver-300" />
                <p className="text-sm font-semibold">{PARTS.length} parts · {SECTIONS.length} short steps</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-silver-300">
                Only your name, email and company are required. Everything else is optional.
              </p>
            </figcaption>
          </figure>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-navy-950/10 bg-navy-950/10 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
            { icon: "conversation", title: "Your own words", text: "Short answers and bullet points are perfect. There are no wrong answers." },
            { icon: "checklist", title: "Skip freely", text: "Mark anything N/A, skip a section, or note that you'd rather discuss it in person." },
            { icon: "hourglass", title: "Saves as you go", text: "Progress is kept on this device, so you can stop and return anytime." },
            { icon: "lock", title: "Confidential", text: "Used only to prepare for our work together. Nothing is sent until you submit." },
            ] satisfies { icon: IconName; title: string; text: string }[]
          ).map((item) => (
            <li key={item.title} className="bg-white p-6">
              <Icon name={item.icon} size={30} className="text-navy-950" />
              <p className="mt-4 font-semibold text-navy-950">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-800/80">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-normal tracking-tight text-navy-950">What we&rsquo;ll cover</h2>
            <p className="mt-3 leading-relaxed text-navy-800/80">
              Seven parts, from the basics of your company to how you would like to work with us.
            </p>
            <p className="mt-6 text-sm font-semibold text-navy-950">Helpful to have at hand</p>
            <ul className="mt-2 space-y-1.5 text-sm text-navy-800/80">
              {[
                "Approximate revenue and margins",
                "Your marketing budget by channel",
                "Sales and customer figures you track",
                "The names of the tools you use",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-cyan-700" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-navy-950/10 bg-navy-950/10 sm:grid-cols-2 lg:col-span-8">
            {PARTS.map((part, i) => (
              <li key={part.id} className="flex gap-4 bg-white p-5 sm:last:odd:col-span-2">
                <span aria-hidden="true" className="font-display text-2xl italic leading-none text-cyan-700">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-navy-950">{part.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-800/80">{part.summary}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-navy-800/70">
                    {part.sections.length} {part.sections.length === 1 ? "step" : "steps"}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  } else if (section) {
    const partIndex = PART_OF[sectionIndex];
    const part = PARTS[partIndex];
    const firstOfPart = part.sections[0] === section;
    const hasRequired = section.questions.some((q) => q.required);
    view = (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next(section);
        }}
      >
        <p className={eyebrow}>
          Part {partIndex + 1} of {PARTS.length} · {part.title}
        </p>
        {firstOfPart && <p className="mt-2 text-sm text-navy-800/75">{part.summary}</p>}
        <div className="mt-6 flex items-start gap-4 sm:gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-navy-950 text-silver-300 [--icon-accent:var(--color-cyan-500)] sm:size-16">
            <Icon name={section.icon} size={30} />
          </span>
          <div className="pt-1">
            <Heading headingRef={headingRef}>{section.title}</Heading>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-800/85">{section.intro}</p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-800/70">
          <span>
            Step {step} of {SECTIONS.length}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {section.questions.length} {section.questions.length === 1 ? "question" : "questions"}, about{" "}
            {minutesFor(section)} min
          </span>
          <span aria-hidden="true">·</span>
          <span>{hasRequired ? "Fields marked Required are needed" : "Every question is optional"}</span>
        </p>

        <div className="mt-10 grid gap-x-6 gap-y-10 border-t border-navy-950/10 pt-10 md:grid-cols-2">
          {section.questions.map((q, i) => (
            <QuestionField
              key={q.id}
              question={q}
              number={i + 1}
              answers={answers}
              error={errors[q.id]}
              onChange={update}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-navy-950/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" className={btnGhost} onClick={() => go(step - 1)}>
            <Glyph name="arrowLeft" size={18} />
            {step === 1 ? "Introduction" : "Back"}
          </button>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
            <SavedNote state={saveState} />
            <button type="submit" className={btnPrimary}>
              {step === SECTIONS.length ? "Review answers" : "Continue"}
              <Glyph name="arrowRight" size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    const missing = firstInvalidSection(answers);
    view = (
      <form name="discovery" method="POST" noValidate onSubmit={submit}>
        <p className={eyebrow}>Final step</p>
        <div className="mt-5">
          <Heading headingRef={headingRef}>Review &amp; submit</Heading>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-800/85">
          Thank you for your time. Here is an overview of your answers. You can still open any step
          to add or change something before you send it.
        </p>

        <div className="mt-8 rounded-2xl border border-navy-950/10 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-navy-950">
              {answered} of {QUESTION_COUNT} questions answered
            </p>
            <p className="text-sm text-navy-800/70">Unanswered questions are simply left blank.</p>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-navy-950/10">
            <div className="h-full rounded-full bg-cyan-700" style={{ width: `${Math.round((answered / QUESTION_COUNT) * 100)}%` }} />
          </div>
        </div>

        {missing >= 0 && (
          <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-red-700/30 bg-red-50 p-5 text-sm text-red-900">
            <Glyph name="info" size={18} className="mt-0.5 shrink-0" />
            <p>
              We still need your name, a valid email and your company name.{" "}
              <button type="button" className="font-semibold underline underline-offset-2" onClick={() => go(missing + 1)}>
                Go to {SECTIONS[missing].title}
              </button>
            </p>
          </div>
        )}

        <div className="mt-10 space-y-8">
          {PARTS.map((part, pi) => (
            <section key={part.id} aria-labelledby={`review-${part.id}`}>
              <h2 id={`review-${part.id}`} className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-800/70">
                Part {pi + 1} · {part.title}
              </h2>
              <ul className="mt-3 divide-y divide-navy-950/10 rounded-2xl border border-navy-950/10 bg-white">
                {part.sections.map((s) => {
                  const { answered: done, total } = sectionProgress(s, answers);
                  return (
                    <li key={s.id} className="flex items-center gap-4 px-5 py-3.5">
                      <StatusMark status={sectionStatus(s, answers)} />
                      <span className="flex-1 text-sm font-medium text-navy-950">{s.title}</span>
                      <span className="hidden text-sm text-navy-800/70 sm:inline">
                        {done} of {total}
                      </span>
                      <button
                        type="button"
                        onClick={() => go(SECTIONS.indexOf(s) + 1)}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-cyan-700 hover:bg-navy-950/5 hover:text-navy-950"
                      >
                        <Glyph name="edit" size={15} />
                        Edit<span className="sr-only"> {s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p aria-hidden="true" className="sr-only">
          <label>
            Do not fill this field if you are human
            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="mt-12 rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
          <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                setConsentError(false);
              }}
              aria-invalid={consentError || undefined}
              aria-describedby={consentError ? "consent-error" : undefined}
              className="mt-1 size-5 shrink-0 cursor-pointer accent-cyan-500"
            />
            <span className="text-sm leading-relaxed text-silver-300">
              I agree that Emerge Strategic Advisors may use this information to evaluate and prepare
              for a potential engagement, as described in the{" "}
              <a href="/privacy" target="_blank" rel="noopener" className="font-semibold text-white underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {consentError && (
            <p id="consent-error" className="mt-3 pl-8 text-sm font-medium text-red-300">
              Please confirm you agree before sending.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Glyph name="send" size={18} />
              {status === "sending" ? "Sending…" : "Send my workbook"}
            </button>
            <button
              type="button"
              onClick={downloadCopy}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400 hover:bg-white/5"
            >
              <Glyph name="download" size={18} />
              Download a copy
            </button>
          </div>

          <div aria-live="polite" className="mt-4 min-h-6">
            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-red-300">
                Something went wrong and your workbook was not sent. Your answers are still saved on
                this device; please try again in a moment, or download a copy to keep them safe.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button type="button" className={btnGhost} onClick={() => go(REVIEW - 1)}>
            <Glyph name="arrowLeft" size={18} />
            Back
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-navy-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="/" aria-label="Emerge Strategic Advisors, back to home" className="shrink-0">
            <img src="/logo.webp" alt="Emerge Strategic Advisors" width={3253} height={774} className="h-8 w-auto sm:h-9" />
          </a>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-silver-400 md:block">
            Client Discovery Workbook
          </p>
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-silver-300 transition-colors hover:text-white"
          >
            {status === "sent" ? "Home" : hasProgress ? "Save & exit" : "Exit"}
            <Glyph name="close" size={16} />
          </a>
        </div>
        <div
          role="progressbar"
          aria-label="Workbook progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-0.5 bg-white/10"
        >
          <div className="h-full bg-cyan-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="on-light min-h-[calc(100svh-3.5rem)] bg-paper outline-none">
        <div
          className={`mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16 ${
            withContents ? "grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16" : ""
          }`}
        >
          {withContents && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto pb-6 pr-2">
                <Contents current={step} answers={answers} onGo={go} />
              </div>
            </aside>
          )}

          <div className="min-w-0">
            {withContents && (
              <details ref={contentsRef} className="group mb-8 rounded-2xl border border-navy-950/10 bg-white lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-sm font-semibold text-navy-950 [&::-webkit-details-marker]:hidden">
                  <span>
                    {step === REVIEW ? "Review & submit" : `Step ${step} of ${SECTIONS.length}`}
                    <span className="font-normal text-navy-800/70"> · All sections</span>
                  </span>
                  <Glyph name="chevronDown" size={18} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-navy-950/10 p-5">
                  <Contents current={step} answers={answers} onGo={go} />
                </div>
              </details>
            )}
            <div className={withContents ? "max-w-3xl" : ""}>{view}</div>
          </div>
        </div>
      </main>
    </>
  );
}
