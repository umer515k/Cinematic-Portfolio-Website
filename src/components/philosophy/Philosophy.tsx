"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
import { philosophy } from "@/data/philosophy";

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-background">
      {philosophy.map((belief, index) => (
        <PhilosophyCard key={index} {...belief} index={index} />
      ))}
    </section>
  );
}

function PhilosophyCard({
  statement,
  proof,
  number,
  index,
}: {
  statement: string;
  proof: string;
  number: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [proofOpen, setProofOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Line width: 0 → 100% as card scrolls to center
  const lineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  // Radial glow opacity: peaks at center
  const { scrollYProgress: fullProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(fullProgress, [0, 0.4, 0.6, 1], [0, 0.06, 0.06, 0]);

  // How many characters to reveal (0 → full length)
  const charCount = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [0, statement.length]
  );

  return (
    <div
      ref={ref}
      className="relative h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 overflow-hidden"
    >
      {/* Radial background pulse */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-primary)_0%,transparent_70%)]" />
      </motion.div>

      {/* Watermark number */}
      <div
        className="absolute select-none font-serif text-[20vw] font-bold text-foreground/[0.03] leading-none pointer-events-none"
        aria-hidden
      >
        {number}
      </div>

      <div className="relative max-w-4xl w-full space-y-8 flex flex-col items-center text-center z-10">
        {/* Top line */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] bg-[var(--accent-primary)] opacity-30"
        />

        {/* Scroll-driven character reveal */}
        <ScrollRevealText text={statement} charCount={charCount} />

        {/* Bottom line */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] bg-[var(--accent-primary)] opacity-30"
        />

        {/* Proof toggle */}
        <motion.button
          onClick={() => setProofOpen((p) => !p)}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/20 hover:text-[var(--accent-primary)] transition-colors duration-300 flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            animate={{ rotate: proofOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[var(--accent-primary)] text-base leading-none"
          >
            +
          </motion.span>
          {proofOpen ? "Hide Proof" : "Show Proof"}
        </motion.button>

        <AnimatePresence>
          {proofOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden w-full max-w-2xl"
            >
              <div className="border border-[var(--accent-primary)] border-opacity-20 rounded-sm p-6 bg-[var(--accent-primary)] bg-opacity-[0.03]">
                <p className="font-mono text-xs md:text-sm text-foreground/50 leading-relaxed">
                  {proof}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Renders text character by character based on a MotionValue
function ScrollRevealText({
  text,
  charCount,
}: {
  text: string;
  charCount: MotionValue<number>;
}) {
  const [revealed, setRevealed] = useState(0);
  useMotionValueEvent(charCount, "change", (v) => setRevealed(Math.round(v)));

  return (
    <h3 className="text-3xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.2]">
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{ opacity: i < revealed ? 1 : 0.08 }}
        >
          {char}
        </span>
      ))}
    </h3>
  );
}
