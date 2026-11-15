// Ruta: src/components/NotFound.tsx
import { ArrowLeft } from "lucide-react";
import SimplePage from "./SimplePage";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found | Emerge Strategic Advisors", true);

  return (
    <SimplePage>
      <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-6xl font-medium text-silver-500 sm:text-7xl">
          404
        </p>
        <h1 className="mt-6 text-balance font-display text-4xl font-semibold text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-silver-300">
          The page you are looking for does not exist or has moved.
        </p>
        <a
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-navy-950 transition-colors hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft size={18} />
          Back to home
        </a>
      </section>
    </SimplePage>
  );
}
