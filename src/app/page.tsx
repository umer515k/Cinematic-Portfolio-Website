"use client";

import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Reviews from "@/components/reviews/reviews";
import Skills from "@/components/skills/Skills";
import Philosophy from "@/components/philosophy/Philosophy";
import Contact from "@/components/contact/Contact";
import { usePath } from "@/context/PathContext";

export default function Home() {
  const { path } = usePath();

  return (
    <>
      <Hero />
      {path && (
        <>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Reviews />
          <Philosophy />
          <Contact />
        </>
      )}
    </>
  );
}
