// Ruta: src/components/discovery/answers.ts
// State helpers for the Discovery Workbook: local persistence, progress,
// validation and the plain-text format sent to the Emerge team.
import {
  MONTHS,
  PARTS,
  QUESTION_COUNT,
  SECTIONS,
  sectionField,
  type Question,
  type Section,
} from "../../data/workbook";

export type Answers = Record<string, string>;

type Saved = { answers: Answers; step: number; savedAt: number };

// Answers live only in this browser until the visitor submits them.
const STORAGE_KEY = "emerge.discovery.v1";

export function loadSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const { answers, step, savedAt } = data as Partial<Saved>;
    const clean: Answers = {};
    if (answers && typeof answers === "object") {
      for (const [key, value] of Object.entries(answers)) {
        if (typeof value === "string") clean[key] = value;
      }
    }
    return { answers: clean, step: Number(step) || 0, savedAt: Number(savedAt) || 0 };
  } catch {
    return null;
  }
}

export function saveProgress(answers: Answers, step: number): boolean {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, step, savedAt: Date.now() } satisfies Saved),
    );
    return true;
  } catch {
    return false;
  }
}

export function clearSaved() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable: nothing to clear.
  }
}

export const monthKey = (questionId: string, month: string) => `${questionId}.${month}`;
export const monthNoteKey = (questionId: string, month: string) => `${questionId}.${month}.note`;

export const NOT_APPLICABLE = "N/A";

export function isAnswered(question: Question, answers: Answers) {
  if (question.type === "months") {
    return MONTHS.some((m) => (answers[monthKey(question.id, m)] ?? "") !== "");
  }
  return (answers[question.id] ?? "").trim() !== "";
}

export function sectionProgress(section: Section, answers: Answers) {
  const answered = section.questions.filter((q) => isAnswered(q, answers)).length;
  return { answered, total: section.questions.length };
}

export type SectionStatus = "empty" | "partial" | "complete";

export function sectionStatus(section: Section, answers: Answers): SectionStatus {
  const { answered, total } = sectionProgress(section, answers);
  if (answered === 0) return "empty";
  return answered === total ? "complete" : "partial";
}

export function answeredCount(answers: Answers) {
  return SECTIONS.reduce((n, s) => n + sectionProgress(s, answers).answered, 0);
}

/** Rough reading-and-writing estimate shown to the visitor. */
export function minutesFor(section: Section) {
  if (section.questions.some((q) => q.type === "months")) return 3;
  return Math.max(2, Math.round(section.questions.length * 0.8));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSection(section: Section, answers: Answers) {
  const errors: Record<string, string> = {};
  for (const q of section.questions) {
    const value = (answers[q.id] ?? "").trim();
    if (q.required && !value) {
      errors[q.id] = `Please enter your ${q.label.toLowerCase()}.`;
    } else if (q.type === "email" && value && !EMAIL_RE.test(value)) {
      errors[q.id] = "Please enter a valid email address, like name@company.com.";
    }
  }
  return errors;
}

/** First section with a missing or invalid required field, if any. */
export function firstInvalidSection(answers: Answers) {
  return SECTIONS.findIndex((s) => Object.keys(validateSection(s, answers)).length > 0);
}

export function formatSection(section: Section, answers: Answers) {
  const lines = [`${section.ref.toUpperCase()} · ${section.title}`, ""];
  for (const q of section.questions) {
    if (q.type === "months") {
      for (const m of MONTHS) {
        const level = answers[monthKey(q.id, m)] || "—";
        const note = (answers[monthNoteKey(q.id, m)] ?? "").trim();
        lines.push(`${m}: ${level}${note ? ` (${note})` : ""}`);
      }
      lines.push("");
      continue;
    }
    lines.push(q.label, (answers[q.id] ?? "").trim() || "—", "");
  }
  return lines.join("\n").trimEnd();
}

export function formatAll(answers: Answers) {
  const header = [
    "EMERGE STRATEGIC ADVISORS · CLIENT DISCOVERY WORKBOOK",
    `Answered ${answeredCount(answers)} of ${QUESTION_COUNT} questions`,
    "",
  ];
  const body = PARTS.flatMap((part, i) => [
    `===== PART ${i + 1}: ${part.title.toUpperCase()} =====`,
    "",
    ...part.sections.map((s) => `${formatSection(s, answers)}\n`),
  ]);
  return [...header, ...body].join("\n");
}

/** Fields posted to the Netlify "discovery" form. */
export function buildPayload(answers: Answers): Record<string, string> {
  const payload: Record<string, string> = {
    "form-name": "discovery",
    name: answers.contactName?.trim() ?? "",
    email: answers.contactEmail?.trim() ?? "",
    company: answers.companyName?.trim() ?? "",
    role: answers.contactTitle?.trim() ?? "",
    phone: answers.contactPhone?.trim() ?? "",
    revenue: answers.revenueRange ?? "",
    answered: `${answeredCount(answers)} of ${QUESTION_COUNT}`,
  };
  for (const s of SECTIONS) payload[sectionField(s.id)] = formatSection(s, answers);
  return payload;
}
