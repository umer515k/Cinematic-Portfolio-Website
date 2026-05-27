"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const cursors: Record<string, JSX.Element> = {
  default: <circle cx="12" cy="12" r="2" fill="currentColor" />,
  about: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" fill="none" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" fill="none" />
      <circle cx="18" cy="7" r="1" fill="currentColor" />
    </>
  ),
  experience: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" />
    </>
  ),
  projects: (
    <>
      <path d="M2 4h20v12H2z" stroke="currentColor" fill="none" />
      <path d="M2 8h20M7 4l-3 4M12 4l-3 4M17 4l-3 4" stroke="currentColor" />
    </>
  ),
  skills: (
    <>
      <circle cx="11" cy="11" r="8" stroke="currentColor" fill="none" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" />
    </>
  ),
  contact: (
    <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" fill="none" />
  ),
};

export default function CursorManager() {
  const [activeSection, setActiveSection] = useState("default");
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only disable custom cursor on small touch-only devices (phones/tablets)
    // Hybrid laptops with touch + mouse should still see the custom cursor.
    const isMobileTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 1024;
    
    if (isMobileTouch) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" || 
        target.tagName === "BUTTON" || 
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");
        
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveSection(entry.target.id || "default");
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[1000001] flex items-center justify-center"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <motion.div
            animate={{
              scale: isPointer ? 1.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--accent-primary)]"
            >
              <AnimatePresence mode="wait">
                <motion.g
                  key={activeSection}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {cursors[activeSection] || cursors.default}
                </motion.g>
              </AnimatePresence>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
