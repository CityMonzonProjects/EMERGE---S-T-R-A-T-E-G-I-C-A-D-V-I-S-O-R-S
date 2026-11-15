// Ruta: src/components/SimplePage.tsx
// Minimal shell for secondary pages (/privacy, 404): logo header, content, footer.
import type { ReactNode } from "react";
import Footer from "./Footer";

export default function SimplePage({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-white/10 bg-navy-950 px-5 py-4 sm:px-8">
        <a
          href="/"
          aria-label="Emerge Strategic Advisors, back to home"
          className="inline-block"
        >
          <img
            src="/logo.webp"
            alt="Emerge Strategic Advisors"
            width={3253}
            height={774}
            className="h-9 w-auto sm:h-10"
          />
        </a>
      </header>
      <main id="main-content" tabIndex={-1} className="bg-navy-950">
        {children}
      </main>
      <Footer />
    </>
  );
}
