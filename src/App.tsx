// Ruta: src/App.tsx
import { lazy, Suspense } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import SkipLink from "./components/SkipLink";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import ClientGuide from "./components/ClientGuide";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import NotFound from "./components/NotFound";

// The workbook is a large, self-contained page: load it only when visited
const DiscoveryPage = lazy(() => import("./components/discovery/DiscoveryPage"));

// No router: the site has a single page plus /discovery and /privacy;
// anything else is a 404
function currentPath() {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

function Page({ path }: { path: string }) {
  if (path === "/" || path === "/index.html") {
    return (
      <>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Services />
          <Process />
          <ClientGuide />
          <Contact />
        </main>
        <Footer showCta={false} />
      </>
    );
  }
  if (path === "/discovery") {
    return (
      <Suspense fallback={<div className="min-h-svh bg-paper" aria-busy="true" />}>
        <DiscoveryPage />
      </Suspense>
    );
  }
  if (path === "/privacy") return <PrivacyPolicy />;
  return <NotFound />;
}

export default function App() {
  return (
    // Lightweight motion features (m.* components); respects "reduce motion"
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Page path={currentPath()} />
      </MotionConfig>
    </LazyMotion>
  );
}
