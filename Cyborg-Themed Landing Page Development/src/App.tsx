import Backdrop from "./components/Backdrop";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { Footer, Register, Sponsors } from "./components/Register";
import {
  Competitions,
  Impact,
  Lectures,
  Manifesto,
  Stats,
  Technoholix,
  Ticker,
  Workshops,
} from "./components/Sections";
import { useRevealRoot } from "./lib/useReveal";

export default function App() {
  useRevealRoot();
  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-ink">
      <Backdrop />
      <Nav />
      <main className="relative">
        <Hero />
        <Ticker />
        <div className="pt-20" />
        <Stats />
        <Manifesto />
        <Competitions />
        <Lectures />
        <Technoholix />
        <Workshops />
        <Sponsors />
        <Impact />
        <Register />
      </main>
      <Footer />
    </div>
  );
}
