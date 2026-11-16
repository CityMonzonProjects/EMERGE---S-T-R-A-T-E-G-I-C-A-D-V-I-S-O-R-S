// Ruta: src/components/discovery/QuestionField.tsx
import type { ChangeEvent } from "react";
import { ACTIVITY_LEVELS, MONTHS, type Question } from "../../data/workbook";
import Glyph from "../icons/Glyph";
import { NOT_APPLICABLE, monthKey, monthNoteKey, type Answers } from "./answers";

type Props = {
  question: Question;
  number: number;
  answers: Answers;
  error?: string;
  onChange: (key: string, value: string) => void;
};

const control =
  "w-full rounded-lg border bg-white px-4 py-3 text-base text-navy-950 shadow-[0_1px_2px_rgba(6,13,31,0.04)] transition-colors placeholder:text-navy-800/70 hover:border-navy-950/35";

const pill =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-navy-950/15 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-navy-950/40 peer-checked:border-navy-950 peer-checked:bg-navy-950 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-700";

const LEVEL_HEIGHT: Record<string, string> = { High: "h-full", Average: "h-3/5", Low: "h-1/4" };

function Label({ q, number, htmlFor }: { q: Question; number: number; htmlFor?: string }) {
  const Tag = htmlFor ? "label" : "span";
  return (
    <Tag htmlFor={htmlFor} className="flex gap-3 text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
      <span aria-hidden="true" className="w-6 shrink-0 pt-px font-display text-sm font-normal italic text-cyan-700">
        {String(number).padStart(2, "0")}
      </span>
      <span>
        {q.label}
        {q.required && (
          // Screen readers announce the input's `required` attribute instead
          <span aria-hidden="true" className="ml-1.5 text-xs font-medium uppercase tracking-wider text-cyan-700">
            Required
          </span>
        )}
      </span>
    </Tag>
  );
}

function MonthMap({ q, answers, onChange }: { q: Question } & Pick<Props, "answers" | "onChange">) {
  return (
    <div className="mt-1">
      {/* Live year-at-a-glance chart; the radio groups below carry the same data */}
      <div aria-hidden="true" className="rounded-xl border border-navy-950/10 bg-white p-4 sm:p-5">
        <div className="flex h-24 items-end gap-1.5 sm:gap-2">
          {MONTHS.map((m) => {
            const level = answers[monthKey(q.id, m)] ?? "";
            return (
              <div key={m} className="flex h-full flex-1 flex-col justify-end">
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    level
                      ? `${LEVEL_HEIGHT[level]} ${level === "High" ? "bg-navy-950" : level === "Average" ? "bg-cyan-700" : "bg-silver-400"}`
                      : "h-1 bg-navy-950/10"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-navy-800/70 sm:gap-2">
          {MONTHS.map((m) => (
            <span key={m} className="flex-1">
              {m.slice(0, 1)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {MONTHS.map((m) => {
          const key = monthKey(q.id, m);
          const value = answers[key] ?? "";
          return (
            <fieldset key={m} className="rounded-xl border border-navy-950/10 bg-white p-4">
              <legend className="sr-only">{m} activity</legend>
              <p aria-hidden="true" className="text-sm font-semibold text-navy-950">
                {m}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {ACTIVITY_LEVELS.map((level) => (
                  <label key={level} className="relative">
                    <input
                      type="radio"
                      name={key}
                      value={level}
                      checked={value === level}
                      onChange={() => onChange(key, level)}
                      onClick={() => value === level && onChange(key, "")}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-10 cursor-pointer items-center justify-center rounded-md border border-navy-950/15 text-xs font-semibold text-navy-900 transition-colors hover:border-navy-950/40 peer-checked:border-navy-950 peer-checked:bg-navy-950 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-700">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                aria-label={`${m} notes or drivers`}
                placeholder="Notes or drivers"
                value={answers[monthNoteKey(q.id, m)] ?? ""}
                onChange={(e) => onChange(monthNoteKey(q.id, m), e.target.value)}
                className="mt-3 w-full border-0 border-b border-navy-950/15 bg-transparent px-0 py-2 text-sm text-navy-950 placeholder:text-navy-800/70 focus:border-cyan-700"
              />
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}

export default function QuestionField({ question: q, number, answers, error, onChange }: Props) {
  const id = `q-${q.id}`;
  const value = answers[q.id] ?? "";
  const errorId = error ? `${id}-error` : undefined;
  const set = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange(q.id, e.target.value);
  const border = error ? "border-red-700" : "border-navy-950/15";

  const errorText = error && (
    <p id={errorId} className="mt-2 pl-9 text-sm font-medium text-red-700">
      {error}
    </p>
  );

  if (q.type === "months") {
    return (
      <div className="md:col-span-2">
        <MonthMap q={q} answers={answers} onChange={onChange} />
      </div>
    );
  }

  if (q.type === "choice") {
    return (
      <fieldset className="md:col-span-2" aria-describedby={errorId}>
        <legend className="w-full">
          <Label q={q} number={number} />
        </legend>
        <div className="mt-3 flex flex-wrap gap-2 pl-9">
          {q.options?.map((option) => (
            <label key={option} className="relative">
              <input
                type="radio"
                name={id}
                value={option}
                checked={value === option}
                onChange={() => onChange(q.id, option)}
                // Clicking the selected option again clears it
                onClick={() => value === option && onChange(q.id, "")}
                className="peer sr-only"
              />
              <span className={pill}>
                {value === option && <Glyph name="check" size={16} />}
                {option}
              </span>
            </label>
          ))}
        </div>
        {errorText}
      </fieldset>
    );
  }

  if (q.type === "select") {
    return (
      <div className={q.half ? "" : "md:col-span-2"}>
        <Label q={q} number={number} htmlFor={id} />
        <div className="relative mt-3 ml-9 max-w-md">
          <select
            id={id}
            value={value}
            onChange={set}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={`${control} ${border} cursor-pointer appearance-none pr-12`}
          >
            <option value="">Select a range</option>
            {q.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <Glyph
            name="chevronDown"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy-950"
          />
        </div>
        {errorText}
      </div>
    );
  }

  if (q.type && q.type !== "textarea") {
    return (
      <div className={q.half ? "" : "md:col-span-2"}>
        <Label q={q} number={number} htmlFor={id} />
        <div className="mt-3 pl-9">
          <input
            id={id}
            type={q.type}
            value={value}
            onChange={set}
            required={q.required}
            autoComplete={q.autoComplete ?? "off"}
            inputMode={q.inputMode}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={`${control} ${border}`}
          />
        </div>
        {errorText}
      </div>
    );
  }

  const isNA = value === NOT_APPLICABLE;
  return (
    <div className="md:col-span-2">
      <Label q={q} number={number} htmlFor={id} />
      <div className="mt-3 pl-9">
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={set}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`${control} ${border} field-sizing-content min-h-28 max-h-[28rem] resize-y leading-relaxed ${
            isNA ? "text-navy-800/70" : ""
          }`}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            aria-pressed={isNA}
            onClick={() => onChange(q.id, isNA ? "" : NOT_APPLICABLE)}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isNA ? "bg-navy-950 text-white" : "text-navy-800/70 hover:bg-navy-950/5 hover:text-navy-950"
            }`}
          >
            {isNA && <Glyph name="check" size={14} />}
            Not applicable
          </button>
        </div>
      </div>
      {errorText}
    </div>
  );
}
