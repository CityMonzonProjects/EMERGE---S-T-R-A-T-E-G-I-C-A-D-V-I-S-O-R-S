// Ruta: src/hooks/usePageMeta.ts
import { useEffect } from "react";

// Sets the document title (and optionally noindex) for a sub-page and
// restores the previous values when the page unmounts.
export function usePageMeta(title: string, noindex = false) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta: HTMLMetaElement | null = null;
    if (noindex) {
      meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex";
      document.head.appendChild(meta);
    }
    return () => {
      document.title = previousTitle;
      meta?.remove();
    };
  }, [title, noindex]);
}
