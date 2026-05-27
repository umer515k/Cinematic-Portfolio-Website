"use client";

import { usePath } from "@/context/PathContext";
import useScramble from "@/hooks/useScramble";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const { path, setPath } = usePath();
  const name = useScramble("UMER KHALIL", 1000, 2000);
  const [hoverSide, setHoverSide] = useState<"architect" | "operator" | null>(null);

  const hoverColors = {
    architect: "#63583e",
    operator: "#052940",
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* 🌌 CINEMATIC LIGHT LAYER */}
      <motion.div
        animate={{ opacity: hoverSide && !path ? 1 : 0 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          mixBlendMode: "overlay",
          background:
            hoverSide === "architect"
              ? `radial-gradient(circle at 30% 40%, rgba(99,88,62,0.30), transparent 65%)`
              : hoverSide === "operator"
              ? `radial-gradient(circle at 70% 40%, rgba(5,41,64,0.30), transparent 65%)`
              : "transparent",
        }}
      />

      {/* 🧠 MAIN CONTENT */}
      <div className="relative z-20 space-y-8">

        {/* NAME */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif tracking-tighter uppercase text-foreground leading-none">
          {name}
        </h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="text-[10px] md:text-base font-mono text-foreground/40 uppercase tracking-[0.3em] md:tracking-[0.4em]"
        >
          I can build the software // I can run the business
        </motion.p>

        <AnimatePresence>
          {!path && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              className="flex flex-col items-center justify-center gap-12 md:gap-16 pt-12 md:pt-16"
            >
              <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] text-foreground/30">
                Select Narrative Path
              </p>

              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 relative">

                {/* ================= ENGINEER ================= */}
                <button
                  onClick={() => setPath("architect")}
                  onMouseEnter={() => setHoverSide("architect")}
                  onMouseLeave={() => setHoverSide(null)}
                  className="group relative flex flex-col items-center"
                >
                  <motion.span
                    animate={{
                      y: hoverSide === "architect" ? -15 : 0,
                      color:
                        hoverSide === "architect"
                          ? hoverColors.architect
                          : "var(--foreground)",
                      textShadow:
                        hoverSide === "architect"
                          ? "0 0 25px rgba(99,88,62,0.35)"
                          : "none",
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl md:text-5xl font-serif uppercase tracking-widest"
                  >
                    Engineer
                  </motion.span>

                  <AnimatePresence>
                    {hoverSide === "architect" && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute top-12 md:top-16 px-4 py-2 rounded-md
                                   bg-[#63583e]/20 backdrop-blur-md
                                   border border-[#63583e]/30
                                   font-mono text-[8px] md:text-[10px]
                                   uppercase tracking-[0.3em]
                                   text-[#e6dcc7] whitespace-nowrap
                                   shadow-[0_0_20px_rgba(99,88,62,0.15)] z-30"
                      >
                        DevOps <span className="px-1">//</span> MLOps <span className="px-1">//</span> Product Engineering
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <div className="h-12 md:h-20 w-[1px] bg-foreground/10 rotate-90 md:rotate-12" />

                {/* ================= AUTOMATOR ================= */}
                <button
                  onClick={() => setPath("operator")}
                  onMouseEnter={() => setHoverSide("operator")}
                  onMouseLeave={() => setHoverSide(null)}
                  className="group relative flex flex-col items-center"
                >
                  <motion.span
                    animate={{
                      y: hoverSide === "operator" ? -15 : 0,
                      color:
                        hoverSide === "operator"
                          ? hoverColors.operator
                          : "var(--foreground)",
                      textShadow:
                        hoverSide === "operator"
                          ? "0 0 25px rgba(5,41,64,0.35)"
                          : "none",
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl md:text-5xl font-serif uppercase tracking-widest"
                  >
                    Automator
                  </motion.span>

                  <AnimatePresence>
                    {hoverSide === "operator" && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute top-12 md:top-16 px-4 py-2 rounded-md
                                   bg-[#052940]/25 backdrop-blur-md
                                   border border-[#052940]/30
                                   font-mono text-[8px] md:text-[10px]
                                   uppercase tracking-[0.3em]
                                   text-[#cfe9ff] whitespace-nowrap
                                   shadow-[0_0_20px_rgba(5,41,64,0.2)] z-30"
                      >
                        GHL Systems Design <span className="px-1">//</span> Customer Success
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AFTER SELECTION */}
        {path && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="pt-12 flex flex-col items-center gap-8"
          >
            <p
              className={`font-mono text-xs uppercase tracking-[0.5em] animate-pulse ${
                path === "architect"
                  ? "text-[#63583e] drop-shadow-[0_0_10px_rgba(99,88,62,0.25)]"
                  : "text-[#052940] drop-shadow-[0_0_10px_rgba(5,41,64,0.25)]"
              }`}
            >
              Identity Verified: {path === "architect" ? "Engineer" : "Automator"}
            </p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/30">
                Scroll
              </span>

              <div className="w-[1px] h-12 bg-foreground/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[var(--accent-primary)]"
                  animate={{ height: ["0%", "100%"], top: ["0%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}