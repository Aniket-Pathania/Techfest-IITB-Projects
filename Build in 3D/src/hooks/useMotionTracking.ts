import { useEffect } from "react";
import { motionState } from "../store";

/** Writes scroll + pointer values into the mutable motionState (read by R3F each frame). */
export function useMotionTracking() {
  useEffect(() => {
    const onScroll = () => {
      motionState.scrollY = window.scrollY;
    };
    const onResize = () => {
      motionState.vh = window.innerHeight;
    };
    const onMove = (e: PointerEvent) => {
      motionState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      motionState.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}
