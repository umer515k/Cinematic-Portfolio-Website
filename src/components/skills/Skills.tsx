"use client";

import { usePath } from "@/context/PathContext";
import { skills } from "@/data/skills";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import SwitchPathCTA from "@/components/nav/SwitchPathCTA";

export default function Skills() {
  const { path } = usePath();

  return (
    <section id="skills" className="min-h-screen w-full py-20 md:py-32 bg-background overflow-hidden flex flex-col justify-center">
      <div className="space-y-16 md:space-y-24">
        {/* Marquee Ticker */}
        <div className="border-y border-foreground/5 py-6 md:py-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <Marquee speed={30} gradient={false} pauseOnHover>
                {skills.map((skill, i) => (
                    <span key={i} className="mx-6 md:mx-12 font-serif text-4xl md:text-8xl uppercase tracking-tighter text-foreground/20 hover:text-[var(--accent-primary)] transition-colors cursor-default">
                        {skill.name}
                    </span>
                ))}
            </Marquee>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-24 space-y-12 md:space-y-16">
            <div className="space-y-4 text-center">
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                    Technical Stack
                </p>
                <h2 className="text-4xl md:text-7xl font-serif text-foreground">
                    The Arsenal
                </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {skills.map((skill, index) => {
                    const isRelevant = skill.path === path || skill.path === "both";
                    
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="relative group"
                        >
                            {/* SVG Logo Logic */}
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0 }}
                                whileHover={{ opacity: 1, y: -50, scale: 1 }}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 bg-[var(--accent-primary)] rounded-full hidden md:flex items-center justify-center pointer-events-none z-20 shadow-xl overflow-hidden"
                            >
                                <img 
                                    src={`/images/logos/${skill.name.toLowerCase().replace('.js', '').replace(' ', '')}.svg`}
                                    className="w-6 h-6 object-contain brightness-0 invert"
                                    onError={(e) => {
                                        // Fallback to initials if SVG is missing
                                        e.currentTarget.style.display = 'none';
                                        const initials = e.currentTarget.parentElement?.querySelector('.initials') as HTMLElement;
                                        if (initials) initials.style.display = 'flex';
                                    }}
                                />
                                <div className="initials hidden w-full h-full items-center justify-center text-[10px] font-mono text-background font-bold uppercase">
                                    {skill.name.substring(0, 2)}
                                </div>
                            </motion.div>

                            <div className={`
                                px-4 md:px-6 py-2 md:py-3 rounded-full border transition-all duration-500 cursor-default
                                ${isRelevant 
                                    ? "border-[var(--accent-primary)] border-opacity-40 bg-[var(--accent-primary)] bg-opacity-5 text-foreground" 
                                    : "border-foreground/10 text-foreground/30 grayscale opacity-50"}
                                group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-background group-hover:scale-105
                            `}>
                                <span className="font-mono text-[10px] md:text-sm uppercase tracking-widest">
                                    {skill.name}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="max-w-2xl mx-auto text-center">
                <p className="font-serif italic text-base md:text-lg text-foreground/40 leading-relaxed">
                    A curated collection of tools and technologies I've mastered to build, optimize, and scale modern digital experiences.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
