import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { EVENTS } from "../data";
import { useStore } from "../store";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-amber";

export function RegisterModal() {
  const open = useStore((s) => s.registerOpen);
  const setOpen = useStore((s) => s.setRegisterOpen);
  const selected = useStore((s) => s.selectedEvent);
  const [done, setDone] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setCode(`TF26-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setDone(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setDone(false), 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-void/70 backdrop-blur-md" onClick={close} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 12, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateX: -8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ transformPerspective: 1200 }}
            className="glass scanlines relative w-full max-w-lg overflow-hidden rounded-3xl p-7 sm:p-9"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent" />
            <button
              onClick={close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/50 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, x: -30 }} className="relative space-y-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber">Access request</div>
                  <h3 className="font-display text-3xl font-black leading-tight">Claim your pass</h3>
                  <p className="text-sm text-white/55">Free for students. Takes 20 seconds.</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input required className={inputCls} placeholder="Full name" />
                    <input required type="email" className={inputCls} placeholder="Email" />
                  </div>
                  <input required className={inputCls} placeholder="College / Organisation" />
                  <select className={inputCls} defaultValue={selected ?? ""}>
                    <option value="" className="bg-ink">
                      Primary interest (optional)
                    </option>
                    {EVENTS.map((e) => (
                      <option key={e.id} value={e.id} className="bg-ink">
                        {e.code} — {e.title}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="group relative mt-2 w-full overflow-hidden rounded-xl bg-amber py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-void"
                  >
                    <span className="relative z-10">Initialise registration</span>
                    <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-lime text-3xl text-lime shadow-[0_0_40px_-6px_#b6ff3c]"
                  >
                    ✓
                  </motion.div>
                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-lime">Access granted</div>
                  <h3 className="font-display mt-2 text-3xl font-black">You're in.</h3>
                  <p className="mt-3 text-sm text-white/55">Your pass ID — screenshot it, a confirmation is on its way to your inbox.</p>
                  <div className="mx-auto mt-6 inline-block rounded-xl border border-dashed border-lime/50 bg-lime/5 px-6 py-3 font-mono text-lg tracking-[0.2em] text-lime">
                    {code}
                  </div>
                  <button
                    onClick={close}
                    className="mt-8 block w-full rounded-xl border border-white/15 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
                  >
                    Return to the fest
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
