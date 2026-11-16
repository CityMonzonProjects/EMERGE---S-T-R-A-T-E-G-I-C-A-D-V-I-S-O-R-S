// Ruta: vite.config.ts
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { SECTIONS, SUMMARY_FIELDS, sectionField } from "./src/data/workbook.ts";

// Netlify detects forms by parsing static HTML at deploy time. The real forms
// are rendered by React, so this emits dist/__forms.html with the field names
// taken from the same data the site uses, so they can never drift apart.
function netlifyForms(): Plugin {
  const form = (name: string, fields: readonly string[]) =>
    [
      `<form name="${name}" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>`,
      `<input type="text" name="bot-field" />`,
      ...fields.map((f) => `<textarea name="${f}"></textarea>`),
      `</form>`,
    ].join("\n");

  const html = [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="UTF-8" /><meta name="robots" content="noindex, nofollow" />',
    "<title>Form definitions</title></head><body>",
    form("contact", ["name", "email", "message"]),
    form("discovery", [...SUMMARY_FIELDS, ...SECTIONS.map((s) => sectionField(s.id))]),
    "</body></html>",
  ].join("\n");

  return {
    name: "emerge:netlify-forms",
    apply: "build",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "__forms.html", source: html });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyForms()],
});
