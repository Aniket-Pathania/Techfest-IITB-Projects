import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Cursor } from "./components/Cursor";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { RegisterModal } from "./components/RegisterModal";
import { useMotionTracking } from "./hooks/useMotionTracking";
import { About } from "./sections/About";
import { Events } from "./sections/Events";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Register } from "./sections/Register";
import { Schedule } from "./sections/Schedule";
import { Speakers } from "./sections/Speakers";
import { ACCENTS, useStore } from "./store";
import { Scene } from "./three/Scene";

export default function App() {
  useMotionTracking();
  const loaded = useStore((s) => s.loaded);
  const active = useStore((s) => s.activeSection);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", ACCENTS[active]);
  }, [active]);

  useEffect(() => {
    // keep the page at the top while the loader is visible
    if (!loaded) window.scrollTo(0, 0);
  }, [loaded]);

  return (
    <div className="relative min-h-screen bg-void text-white" style={{ transition: "--accent 0.6s" }}>
      <Scene />
      <Cursor />

      <AnimatePresence>{!loaded && <Loader key="loader" />}</AnimatePresence>

      <motion.div
        className="relative z-10"
        initial={false}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {loaded && <Nav />}
        <main>
          <Hero />
          <About />
          <Events />
          <Schedule />
          <Speakers />
          <Register />
        </main>
        <Footer />
      </motion.div>

      <RegisterModal />
    </div>
  );
}
