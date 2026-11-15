// Ruta: src/App.tsx
import { MotionConfig } from "framer-motion";
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

// No router: the site has a single page plus /privacy; anything else is a 404
function currentPath() {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

export default function App() {
  const path = currentPath();
  const isHome = path === "/" || path === "/index.html";

  return (
    // Respects the visitor's "reduce motion" system setting
    <MotionConfig reducedMotion="user">
      <SkipLink />
      {path === "/privacy" ? (
        <PrivacyPolicy />
      ) : isHome ? (
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
          <Footer />
        </>
      ) : (
        <NotFound />
      )}
    </MotionConfig>
  );
}
