// The page intentionally stays in plain JSX-style React without TypeScript-specific syntax.
// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "HOME", target: "home" },
  { label: "TECHNOLOGY", target: "technology" },
  { label: "SYSTEM", target: "system" },
  { label: "FEATURES", target: "features" },
  { label: "CONTACT", target: "contact" },
];

const metrics = [
  { label: "CORE PROCESSING", value: "98.7", unit: "%", icon: "core" },
  { label: "NEURAL LINK", value: "99.2", unit: "%", icon: "neural" },
  { label: "SYSTEM POWER", value: "87", unit: "%", icon: "power" },
  { label: "SYNC RATE", value: "100", unit: "%", icon: "sync" },
];

const features = [
  {
    number: "01",
    title: "NEURAL INTERFACE",
    description: "Direct interaction between the human nervous system and machines.",
    icon: "neural",
  },
  {
    number: "02",
    title: "ENHANCED VISION",
    description: "Advanced visual systems designed to extend human perception.",
    icon: "vision",
  },
  {
    number: "03",
    title: "ROBOTIC LIMBS",
    description: "Precision-controlled robotic systems inspired by human movement.",
    icon: "limbs",
  },
  {
    number: "04",
    title: "BIO-SYNCHRONIZATION",
    description: "Technology designed to synchronize biological and mechanical systems.",
    icon: "bio",
  },
  {
    number: "05",
    title: "AI ASSISTANCE",
    description: "Intelligent systems capable of analyzing information and assisting human decisions.",
    icon: "ai",
  },
  {
    number: "06",
    title: "HUMAN AUGMENTATION",
    description: "Advanced technology designed to enhance physical and cognitive capabilities.",
    icon: "augment",
  },
];

const terminalLines = [
  "INITIALIZING CYBERNETIC CORE...",
  "SCANNING NEURAL NETWORK...",
  "CONNECTING HARDWARE...",
  "SYNCHRONIZING SYSTEM...",
  "SYSTEM ONLINE.",
];

function scrollToSection(target) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">-&gt;</span>;
}

function FeatureIcon({ name }) {
  return (
    <span className={`feature-icon icon-${name}`} aria-hidden="true">
      <i />
    </span>
  );
}

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (target) => {
    scrollToSection(target);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <button className="brand-lockup" onClick={() => handleNav("home")} aria-label="Go to home">
          <span className="brand-mark"><span /></span>
          <span className="brand-copy">
            <strong>CYBORG</strong>
            <small>SYSTEM 01</small>
          </span>
        </button>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.target}
              className={activeSection === item.target ? "is-active" : ""}
              onClick={() => handleNav(item.target)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="nav-action" onClick={() => handleNav("system")}>
          INITIALIZE
          <span className="button-corner" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function CyborgVisual() {
  return (
    <div className="cyborg-stage" aria-label="Holographic cyborg head interface" role="img">
      <div className="stage-crosshair crosshair-top" />
      <div className="stage-crosshair crosshair-bottom" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="orbit-node node-a" />
      <div className="orbit-node node-b" />
      <div className="orbit-node node-c" />
      <div className="tech-coordinate coordinate-a">LAT 19.1334 // LON 72.9133</div>
      <div className="tech-coordinate coordinate-b">X: 04.80 &nbsp; Y: 09.21 &nbsp; Z: 01.07</div>
      <div className="tech-coordinate coordinate-c">NEURAL / 07</div>
      <div className="cyborg-glow" />
      <div className="head-shadow">
        <div className="head-shell">
          <div className="head-plate plate-top" />
          <div className="head-plate plate-side" />
          <div className="head-plate plate-jaw" />
          <div className="ear-unit"><span /><span /><span /></div>
          <div className="face-plane">
            <div className="brow-line" />
            <div className="eye-unit"><span className="eye-glow" /></div>
            <div className="nose-line" />
            <div className="jaw-line" />
            <div className="mouth-unit"><span /><span /><span /></div>
            <div className="cheek-circuit circuit-left"><i /><i /><i /></div>
            <div className="cheek-circuit circuit-right"><i /><i /><i /></div>
          </div>
          <div className="neck-unit"><span /><span /><span /><span /></div>
        </div>
      </div>
      <div className="head-scan" />
      <div className="scan-marker marker-left"><span />SCAN 074</div>
      <div className="scan-marker marker-right">BIO-LINK <span /></div>
      <div className="stage-grid" />
      <div className="visual-baseline"><span /><span /><span /></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-anchor" id="home">
      <div className="hero-backlight backlight-one" />
      <div className="hero-backlight backlight-two" />
      <div className="hero-layout page-width">
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow"><span className="eyebrow-dot" /> CYBORG SYSTEM 01 <b>//</b> FUTURE INTERFACE</p>
          <h1>EVOLVE <span>BEYOND</span> HUMAN</h1>
          <p className="hero-subtitle">ENTER THE CYBORG ERA</p>
          <p className="hero-description">Where human intelligence meets machine precision. Explore the next generation of cybernetic technology.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollToSection("system")}>
              INITIALIZE SYSTEM <ArrowIcon />
            </button>
            <button className="button button-ghost" onClick={() => scrollToSection("technology")}>
              EXPLORE TECHNOLOGY <ArrowIcon />
            </button>
          </div>
          <div className="hero-status">
            <span className="status-pulse" />
            <div><strong>SYSTEM ONLINE</strong><small>CORE STATUS: 100%</small></div>
          </div>
        </div>
        <div className="hero-visual reveal is-visible">
          <CyborgVisual />
        </div>
      </div>
      <div className="hero-footer-line page-width"><span>SCROLL TO DISCOVER</span><i /></div>
    </section>
  );
}

function SectionIntro({ index, eyebrow, title, children, align = "left" }) {
  return (
    <div className={`section-intro ${align === "center" ? "intro-centered" : ""} reveal`}>
      <p className="section-index">{index} <span>//</span> {eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </div>
  );
}

function SystemStatus() {
  const [selected, setSelected] = useState("CORE PROCESSING");
  const [isVisible, setIsVisible] = useState(false);
  const statusRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    if (statusRef.current) observer.observe(statusRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="status-section section-anchor" id="system" ref={statusRef}>
      <div className="page-width">
        <SectionIntro index="01" eyebrow="SYSTEM DIAGNOSTICS" title="CORE STATUS" />
        <div className={`status-grid ${isVisible ? "is-visible" : ""}`}>
          {metrics.map((metric) => (
            <button
              className={`status-card ${selected === metric.label ? "is-selected" : ""}`}
              key={metric.label}
              onClick={() => setSelected(metric.label)}
              aria-pressed={selected === metric.label}
            >
              <div className={`status-icon status-${metric.icon}`}><i /><i /><i /></div>
              <span className="status-label">{metric.label}</span>
              <strong className="status-value">{metric.value}<em>{metric.unit}</em></strong>
              <span className="progress-track"><span style={{ width: `${metric.value}%` }} /></span>
              <span className="status-foot"><span>STABLE</span><span>LIVE</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-anchor" id="technology">
      <div className="about-rule" />
      <div className="about-grid page-width">
        <SectionIntro index="02" eyebrow="WHAT IS CYBORG TECHNOLOGY?" title={<>THE NEXT<br /><span>EVOLUTION</span></>} />
        <div className="about-copy reveal">
          <div className="about-quote-mark">//</div>
          <p>Cyborg technology combines biological systems with advanced machines to enhance human capabilities. From neural interfaces to robotic prosthetics, cybernetic systems are redefining the boundaries between humans and machines.</p>
          <button className="text-link" onClick={() => scrollToSection("features")}>READ MORE <ArrowIcon /></button>
          <div className="about-specs">
            <span><b>01</b> BIOLOGY</span>
            <span><b>02</b> INTELLIGENCE</span>
            <span><b>03</b> PRECISION</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features-section section-anchor" id="features">
      <div className="page-width">
        <SectionIntro index="03" eyebrow="SYSTEM MODULES" title="CYBERNETIC CAPABILITIES" align="center">
          Six active protocols redefining what the human system can become.
        </SectionIntro>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <article className={`feature-card reveal reveal-delay-${(index % 3) + 1}`} key={feature.number}>
              <div className="feature-card-top"><span>{feature.number}</span><FeatureIcon name={feature.icon} /></div>
              <div className="feature-card-copy">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <span className="feature-arrow"><ArrowIcon /></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const terminalRef = useRef(null);
  const hasStarted = useRef(false);
  const terminalTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted.current) return;
      hasStarted.current = true;
      let line = 0;
      terminalTimer.current = window.setInterval(() => {
        line += 1;
        setVisibleLines(line);
        if (line === terminalLines.length) window.clearInterval(terminalTimer.current);
      }, 460);
    }, { threshold: 0.35 });
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => {
      observer.disconnect();
      if (terminalTimer.current) window.clearInterval(terminalTimer.current);
    };
  }, []);

  return (
    <section className="terminal-section" ref={terminalRef}>
      <div className="page-width">
        <div className="terminal-panel reveal">
          <div className="terminal-header">
            <div className="terminal-title"><span className="terminal-dot" /> SYSTEM TERMINAL</div>
            <div className="terminal-controls"><span /><span /><span /></div>
          </div>
          <div className="terminal-body">
            <div className="terminal-side-label">CYBORG<br />OS / 01</div>
            <div className="terminal-copy">
              {terminalLines.slice(0, visibleLines).map((line, index) => (
                <p key={line} className={index === terminalLines.length - 1 ? "terminal-success" : ""}>&gt; {line}</p>
              ))}
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
            <div className="terminal-status"><span className="status-pulse" /> LINK ESTABLISHED <b>07:42:18</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="cta-section section-anchor" id="contact">
      <div className="cta-orbit orbit-cta-one" />
      <div className="cta-orbit orbit-cta-two" />
      <div className="page-width cta-content reveal">
        <p className="section-index">04 <span>//</span> FINAL PROTOCOL</p>
        <h2>ARE YOU READY<br /><span>TO EVOLVE?</span></h2>
        <p>The future belongs to those who are ready to adapt.</p>
        <button className="button button-primary button-large" onClick={() => scrollToSection("home")}>
          ACTIVATE SYSTEM <ArrowIcon />
        </button>
      </div>
      <div className="cta-scanline" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-grid">
        <div className="footer-brand"><strong>CYBORG <span>//</span> SYSTEM 01</strong><small>BUILT FOR THE FUTURE.</small></div>
        <div className="footer-links">
          <button onClick={() => scrollToSection("technology")}>TECHNOLOGY</button>
          <button onClick={() => scrollToSection("system")}>SYSTEM</button>
          <button onClick={() => scrollToSection("contact")}>CONTACT</button>
        </div>
        <div className="footer-copy">&copy; 2026 CYBORG SYSTEMS</div>
      </div>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const particles = useMemo(() => Array.from({ length: 34 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    top: `${(index * 61) % 100}%`,
    delay: `${(index % 9) * 0.55}s`,
    duration: `${4 + (index % 5)}s`,
  })), []);

  useEffect(() => {
    const sections = navItems.map(({ target }) => document.getElementById(target)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-32% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const cursor = document.querySelector(".cursor-glow");
    if (!cursor) return undefined;
    const moveCursor = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  useEffect(() => {
    const backlights = document.querySelectorAll(".hero-backlight");
    const moveBacklights = (event) => {
      const x = (event.clientX - window.innerWidth / 2) * 0.018;
      const y = (event.clientY - window.innerHeight / 2) * 0.018;
      if (backlights[0]) backlights[0].style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (backlights[1]) backlights[1].style.transform = `translate3d(${-x * 0.65}px, ${-y * 0.65}px, 0)`;
    };
    window.addEventListener("pointermove", moveBacklights, { passive: true });
    return () => window.removeEventListener("pointermove", moveBacklights);
  }, []);

  return (
    <div className="app-shell">
      <div className="cursor-glow" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">
        {particles.map((particle) => <span key={particle.id} style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration }} />)}
      </div>
      <div className="side-rail rail-left" aria-hidden="true"><span>TECHFEST / IIT BOMBAY</span></div>
      <div className="side-rail rail-right" aria-hidden="true"><span>EST. 2026</span></div>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <SystemStatus />
        <About />
        <Features />
        <Terminal />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
