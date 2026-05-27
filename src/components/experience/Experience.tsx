"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { experience } from "@/data/experience";
import { usePath } from "@/context/PathContext";

export default function Experience() {
  const { path } = usePath();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // REORDERING LOGIC: HLProTools first for Automator
  const orderedExperience = useMemo(() => {
    if (path === "operator") {
      const hlpt = experience.filter(exp => exp.company === "HL Pro Tools");
      const others = experience.filter(exp => exp.company !== "HL Pro Tools");
      return [...hlpt, ...others];
    }
    return experience;
  }, [path]);

  // Adjust transform range to ensure it stays visible longer
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="relative md:h-[400vh] bg-background"
    >
      <div className="md:sticky top-0 md:h-screen w-full flex flex-col md:flex-row items-center justify-start overflow-hidden py-20 md:py-0">
        
        {/* Background Label */}
        <div className="absolute left-6 md:left-12 top-10 md:top-1/2 md:-translate-y-1/2 z-0">
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif uppercase tracking-tighter text-foreground/5 md:origin-left md:-rotate-90 select-none">
                Experience
            </h2>
        </div>

        <motion.div 
            style={{ x: typeof window !== 'undefined' && window.innerWidth > 768 ? x : 0 }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 px-6 md:px-[20vw] w-full md:w-auto relative z-10"
        >
            {orderedExperience.map((item, index) => (
                <div key={`${item.company}-${index}`} className="flex-shrink-0 w-full md:w-[60vw] lg:w-[40vw] flex flex-col items-center">
                    <div className="hidden md:flex w-full justify-between px-4 mb-4 opacity-20">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-foreground/10 border border-foreground/5 shadow-inner" />
                        ))}
                    </div>

                    <div className="w-full min-h-[400px] md:aspect-video bg-foreground/[0.02] border border-foreground/10 rounded-sm p-8 md:p-12 flex flex-col justify-center space-y-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[var(--accent-primary)] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                        
                        <div className="space-y-3">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                                {item.dates}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-serif text-foreground">
                                {item.company}
                            </h3>
                            <p className="text-xl md:text-2xl font-serif italic text-foreground/60">
                                {item.role}
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-foreground/80 font-serif leading-relaxed max-w-lg">
                            {item.description}
                        </p>
                    </div>

                    <div className="hidden md:flex w-full justify-between px-4 mt-4 opacity-20">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-foreground/10 border border-foreground/5 shadow-inner" />
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
