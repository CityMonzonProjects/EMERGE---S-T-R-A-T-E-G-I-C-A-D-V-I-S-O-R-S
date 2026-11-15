// Ruta: src/hooks/useTypewriter.ts
import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Returns how many characters of `text` are currently visible.
// With "reduce motion" enabled the full text is shown immediately.
export function useTypewriter(text: string, { speed = 55, delay = 400 } = {}) {
  const [count, setCount] = useState(() =>
    prefersReducedMotion() ? text.length : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c + 1 >= text.length) window.clearInterval(interval);
          return Math.min(c + 1, text.length);
        });
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, speed, delay]);

  return { count, done: count >= text.length };
}
