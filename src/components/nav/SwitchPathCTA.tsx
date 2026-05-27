"use client";

import { usePath } from "@/context/PathContext";
import { motion } from "framer-motion";

export default function SwitchPathCTA() {
  const { path, setPath } = usePath();

  if (!path) return null;

  const targetPath = path === "architect" ? "operator" : "architect";
  const label = targetPath === "architect" ? "Engineer" : "Automator";
  const tagline = targetPath === "architect" 
    ? "Explore the technical architecture & MLOps narrative" 
    : "Discover the GHL systems & automation narrative";

  return (
    <div className="w-full py-20 px-6 flex flex-col items-center justify-center border-t border-foreground/5 bg-foreground/[0.01]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-8"
      >
        <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/20">
                Curious about the other half?
            </span>
            <p className="font-serif italic text-foreground/40 text-sm">
                {tagline}
            </p>
        </div>

        <button
          onClick={() => {
            setPath(targetPath);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group relative px-8 py-4 border border-foreground/10 hover:border-[var(--accent-primary)] transition-all duration-500 rounded-full overflow-hidden"
        >
          <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground group-hover:text-background transition-colors duration-500">
            Switch to {label} Path
          </span>
          <div className="absolute inset-0 bg-[var(--accent-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </motion.div>
    </div>
  );
}
