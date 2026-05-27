"use client";

import { usePath } from "@/context/PathContext";
import useScramble from "@/hooks/useScramble";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SwitchPathCTA from "@/components/nav/SwitchPathCTA";

export default function About() {
  const { path } = usePath();

  const softwareIdentities = [
    "Software Engineer",
    "MLOps Architect",
    "Full-Stack Developer",
    "DevOps Specialist",
    "Product Engineer",
  ];

  const systemsIdentities = [
    "GHL Automator",
    "CRM Architect",
    "Customer Success Expert",
    "Systems Strategist",
    "Revenue Operations",
  ];

  const identities = path === "architect" ? softwareIdentities : systemsIdentities;

  return (
    <section id="about" className="w-full flex flex-col items-center py-24 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center px-6 md:px-24 gap-12 lg:gap-24 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 aspect-[4/5] max-w-sm lg:max-w-md group"
        >
          <div className="absolute inset-0 bg-[var(--accent-primary)] opacity-10 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
          <div className="w-full h-full bg-foreground/5 rounded-sm overflow-hidden border border-foreground/10 relative">
            <img
              src="public/images/Profile.webp"
              alt="Umer Khalil"
              className="w-full h-full object-cover object-top grayscale contrast-[1.1] brightness-[0.9] sepia-[0.1]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-8"
        >
          <div className="space-y-4">
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                  Greetings. I am
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight min-h-[1.2em]">
                  <IdentityTypewriter key={path} identities={identities} />
              </h2>
          </div>

          <div className="space-y-6 max-w-xl">
              <p className="text-base md:text-lg lg:text-xl text-foreground/80 font-serif leading-relaxed">
                  {path === "architect" 
                      ? "I don't just write code; I build narratives. My focus is on crafting resilient software architectures and MLOps pipelines that bridge the gap between technical logic and human experience."
                      : "I don't just build workflows; I design growth. My focus is on engineering seamless GHL automation systems that transform fragmented operations into high-conversion machines."}
              </p>
              <p className="text-base md:text-lg lg:text-xl text-foreground/80 font-serif leading-relaxed">
                  {path === "architect"
                      ? "I've shipped production MLOps pipelines, deepfake detection systems, and full-stack applications — always with the same standard: if it can't survive real conditions, it isn't done."
                      : "I've built white-label SaaS infrastructure, AI-driven lead systems, and onboarded 100+ agency clients — always with the same standard: if it requires manual intervention, it isn't finished."}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <div className="flex gap-12">
                      <div className="flex flex-col">
                          <span className="font-mono text-[9px] md:text-[10px] uppercase text-foreground/40 tracking-widest">Location</span>
                          <span className="font-serif text-base lg:text-lg italic">Islamabad // Remote</span>
                      </div>
                      <div className="flex flex-col">
                          <span className="font-mono text-[9px] md:text-[10px] uppercase text-foreground/40 tracking-widest">Availability</span>
                          <span className="font-serif text-base lg:text-lg italic">Limited // Select Projects</span>
                      </div>
                  </div>
                  <a
                      href="public/resume.pdf"
                      download
                      className="group flex items-center gap-3 px-6 py-3 border border-foreground/10 rounded-full hover:border-[var(--accent-primary)] transition-all duration-500"
                  >
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-foreground/40 group-hover:text-[var(--accent-primary)] transition-colors">
                          Download CV
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-foreground/40 group-hover:text-[var(--accent-primary)] transition-colors group-hover:translate-y-0.5 transition-transform">
                          <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                  </a>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { Typewriter } from "react-simple-typewriter";

function IdentityTypewriter({ identities }: { identities: string[] }) {
    return (
        <Typewriter
            words={identities}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
        />
    );
}
