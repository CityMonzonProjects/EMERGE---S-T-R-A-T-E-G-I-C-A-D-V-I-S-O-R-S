// Ruta: src/components/PrivacyPolicy.tsx
// DRAFT: describes only what the site does today. Needs legal review before launch.
import SimplePage from "./SimplePage";
import { usePageMeta } from "../hooks/usePageMeta";

const sections = [
  {
    title: "Information we collect",
    body: [
      "When you use the contact form, we receive the name, email address and message you choose to submit.",
      "Our hosting and form-processing provider may also process technical data, such as your IP address and browser type, as part of delivering the site and protecting it from spam.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use the information you send to respond to your inquiry and to discuss how we may work together. We do not use it for any unrelated purpose.",
    ],
  },
  {
    title: "Sharing",
    body: [
      "We do not sell your information. It is shared only with the service providers that host this site and process form submissions on our behalf.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We keep your message only as long as needed to respond to you and manage any resulting relationship.",
    ],
  },
  {
    title: "Cookies, analytics and third-party fonts",
    body: [
      "This site does not currently use advertising or analytics cookies.",
      "Fonts are loaded from Google Fonts, which may receive your IP address when the page loads.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You may ask us to access, correct or delete the information you have sent us. Use the contact form on our home page to make a request.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The latest version is always published on this page.",
    ],
  },
];

export default function PrivacyPolicy() {
  usePageMeta("Privacy Policy | Emerge Strategic Advisors");

  return (
    <SimplePage>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Legal
        </span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-silver-300">
          This policy explains how Emerge Strategic Advisors handles the
          information collected through this website.
        </p>
        <p
          role="note"
          className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-silver-300"
        >
          Draft notice: this policy is pending legal review.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map(({ title, body }) => (
            <section key={title}>
              <h2 className="font-display text-2xl font-semibold text-white">
                {title}
              </h2>
              {body.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-silver-300">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </SimplePage>
  );
}
