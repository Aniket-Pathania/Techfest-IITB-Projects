import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { label: "Our story", href: "#story" },
  { label: "The moment", href: "#moment" },
  { label: "The places", href: "#places" },
];

const places = [
  {
    number: "01",
    name: "The coast",
    label: "WHERE THE LAND MEETS THE SEA",
    description:
      "Follow the edge of the world, one salt-air breath at a time.",
    image: "/images/coast.jpg",
    alt: "A grassy path above a misty, forested coastline",
  },
  {
    number: "02",
    name: "The mountains",
    label: "A LITTLE CLOSER TO THE SKY",
    description:
      "Find a little perspective in the places that make you feel small.",
    image: "/images/mountain-lake.jpg",
    alt: "A mountain and evergreen forest reflected in a quiet alpine lake",
  },
  {
    number: "03",
    name: "The forest",
    label: "INTO THE GREEN AND QUIET",
    description:
      "Take the winding path and let the rest of the world fall away.",
    image: "/images/forest-path.jpg",
    alt: "A winding trail through a mossy, sunlit evergreen forest",
  },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      className="brand"
      href="#top"
      aria-label="The Long Way, back to the beginning"
      onClick={onNavigate}
    >
      <svg
        className="brand-mark"
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="22" cy="22" r="20.5" stroke="currentColor" />
        <path
          d="M7 28.5 17.3 17l7.6 8.1 4.2-4.6 7.9 8M7 31.5h30"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29.8" cy="13.7" r="2.1" stroke="currentColor" />
      </svg>
      <span className="brand-name">
        THE LONG
        <br />
        WAY<span className="brand-dot">.</span>
      </span>
    </a>
  );
}

function Header({ reduceMotion }: { reduceMotion: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <motion.header
      className="site-header"
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <Brand onNavigate={() => setMenuOpen(false)} />

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#story">
        LET'S WANDER <ArrowUpRight size={15} strokeWidth={1.5} />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label} <ArrowUpRight size={17} strokeWidth={1.4} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });
  const imageY = useTransform(progress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(progress, [0, 1], [0, 135]);
  const copyOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.75, 0]);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <motion.div
        className="hero-image"
        style={{ y: reduceMotion ? 0 : imageY }}
        aria-hidden="true"
      >
        <img src="/images/hero-alpine.jpg" alt="" fetchPriority="high" />
      </motion.div>
      <div className="hero-shade" aria-hidden="true" />
      <Header reduceMotion={reduceMotion} />

      <div className="hero-layout">
        <motion.div
          className="hero-copy"
          style={{
            y: reduceMotion ? 0 : copyY,
            opacity: reduceMotion ? 1 : copyOpacity,
          }}
        >
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
          >
            <motion.p className="hero-eyebrow" variants={rise}>
              <span /> AN INVITATION TO WANDER
            </motion.p>
            <motion.h1 variants={rise}>
              <span>The long</span>
              <em>way.</em>
            </motion.h1>
            <motion.p className="hero-description" variants={rise}>
              For the curious, the restless, and those who believe the best way
              there is never the fastest.
            </motion.p>
            <motion.div variants={rise}>
              <a className="hero-link" href="#story">
                <span className="hero-link-icon">
                  <ArrowDownRight size={20} strokeWidth={1.4} />
                </span>
                <span>SCROLL TO WANDER</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

function Story({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const imageY = useTransform(progress, [0, 1], ["-7%", "7%"]);
  const textY = useTransform(progress, [0, 1], [55, -55]);
  const stampY = useTransform(progress, [0, 1], [45, -45]);

  return (
    <section className="story section-paper" id="story" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-running-line">
          <span>THE LONG WAY / AN OUTDOOR JOURNAL</span>
          <span>FOR THE WILDLY CURIOUS</span>
        </div>

        <div className="story-grid">
          <motion.div
            className="story-copy"
            style={{ y: reduceMotion ? 0 : textY }}
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-eyebrow">
              <span>01 /</span> A DIFFERENT KIND OF JOURNEY
            </p>
            <h2>
              A little further
              <br />
              <em>from ordinary.</em>
            </h2>
            <p className="story-description">
              Somewhere between here and there, there&apos;s a little more room
              to breathe. Here&apos;s to winding roads, quiet trails, and the
              simple joy of taking your time.
            </p>
            <a className="text-link" href="#moment">
              TAKE THE SCENIC ROUTE <ArrowUpRight size={17} strokeWidth={1.4} />
            </a>
          </motion.div>

          <figure className="story-figure">
            <div className="story-image-window">
              <motion.img
                src="/images/forest-path.jpg"
                alt="A winding trail through a misty evergreen forest"
                loading="lazy"
                style={{ y: reduceMotion ? 0 : imageY }}
              />
            </div>
            <motion.div
              className="story-stamp"
              style={{ y: reduceMotion ? 0 : stampY }}
              aria-hidden="true"
            >
              <span>GO SLOW</span>
              <svg viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 1v26M1 14h26M4.8 4.8l18.4 18.4M23.2 4.8 4.8 23.2"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <circle cx="14" cy="14" r="4.3" fill="currentColor" />
              </svg>
              <span>GO FAR</span>
            </motion.div>
            <figcaption>
              <span>THE QUIET IS CLOSER THAN YOU THINK</span>
              <span>FIG. 01</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Moment({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const imageY = useTransform(progress, [0, 1], ["-10%", "10%"]);
  const copyY = useTransform(progress, [0, 1], [90, -90]);

  return (
    <section className="moment" id="moment" ref={sectionRef}>
      <motion.div
        className="moment-image"
        style={{ y: reduceMotion ? 0 : imageY }}
        aria-hidden="true"
      >
        <img src="/images/mountain-lake.jpg" alt="" loading="lazy" />
      </motion.div>
      <div className="moment-shade" aria-hidden="true" />
      <div className="moment-topline" aria-hidden="true">
        <span>02 / IN THE MOMENT</span>
        <span>A LITTLE SPACE TO JUST BE</span>
      </div>
      <motion.div
        className="moment-copy"
        style={{ y: reduceMotion ? 0 : copyY }}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1 }}
      >
        <p className="light-eyebrow">THE BEAUTY OF BEING HERE</p>
        <h2>
          Stay a little
          <br />
          <em>longer.</em>
        </h2>
        <p className="moment-description">
          The world can wait. This moment is yours.
        </p>
        <a className="moment-link" href="#places">
          FIND YOUR SOMEWHERE <ArrowDownRight size={18} strokeWidth={1.4} />
        </a>
      </motion.div>
      <div className="moment-bottom" aria-hidden="true">
        <span>PAUSE / BREATHE / REPEAT</span>
        <span>THE LONG WAY</span>
      </div>
    </section>
  );
}

function Places({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlace = places[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const figureY = useTransform(progress, [0, 1], [55, -55]);
  const imageY = useTransform(progress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="places section-paper" id="places" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-running-line">
          <span>THE LONG WAY / A LITTLE INSPIRATION</span>
          <span>NO ITINERARY REQUIRED</span>
        </div>

        <div className="places-heading">
          <div>
            <p className="section-eyebrow">
              <span>03 /</span> FIND YOUR SOMEWHERE
            </p>
            <h2>
              Follow what
              <br />
              <em>moves you.</em>
            </h2>
          </div>
          <p className="places-intro">
            There is no right way to get lost. Start with the place that calls
            to you.
          </p>
        </div>

        <div className="places-grid">
          <div className="place-selector">
            <p className="selector-label">PICK A LITTLE ESCAPE</p>
            <div className="place-options" role="group" aria-label="Choose a landscape">
              {places.map((place, index) => (
                <button
                  className={`place-option ${index === activeIndex ? "is-active" : ""}`}
                  type="button"
                  key={place.name}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="place-number">{place.number}</span>
                  <span className="place-name">{place.name}</span>
                  <ArrowUpRight size={21} strokeWidth={1.3} />
                </button>
              ))}
            </div>
            <div className="place-description" aria-live="polite">
              <span className="description-dash" />
              <p key={activePlace.name}>{activePlace.description}</p>
            </div>
          </div>

          <motion.figure
            className="place-figure"
            style={{ y: reduceMotion ? 0 : figureY }}
          >
            <div className="place-image-window">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activePlace.image}
                  src={activePlace.image}
                  alt={activePlace.alt}
                  loading="lazy"
                  style={{ y: reduceMotion ? 0 : imageY }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45 }}
                />
              </AnimatePresence>
            </div>
            <figcaption>
              <span>{activePlace.label}</span>
              <span>{activePlace.number} / 03</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

function Outro({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="outro">
      <motion.div
        className="outro-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="outro-sun" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="9" stroke="currentColor" />
            <path
              d="M24 2v10M24 36v10M2 24h10M36 24h10M8.5 8.5l7 7m17 17 7 7m0-31-7 7m-17 17-7 7"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="light-eyebrow">UNTIL THE NEXT ADVENTURE</p>
        <h2>
          There&apos;s more
          <br />
          <em>out there.</em>
        </h2>
        <p className="outro-description">
          Here&apos;s to taking the scenic route and seeing where it leads.
        </p>
        <a className="outro-link" href="#top">
          BACK TO THE BEGINNING <ArrowUp size={16} strokeWidth={1.4} />
        </a>
      </motion.div>

      <footer className="footer">
        <Brand />
        <p>AN ODE TO THE GREAT OUTDOORS</p>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <span>&copy; {new Date().getFullYear()} THE LONG WAY</span>
      </footer>
    </section>
  );
}

export default function App() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <>
      <a className="skip-link" href="#story">
        Skip to content
      </a>
      <main>
        <Hero reduceMotion={reduceMotion} />
        <Story reduceMotion={reduceMotion} />
        <Moment reduceMotion={reduceMotion} />
        <Places reduceMotion={reduceMotion} />
        <Outro reduceMotion={reduceMotion} />
      </main>
    </>
  );
}