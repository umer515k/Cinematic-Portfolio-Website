"use client";

import { usePath } from "@/context/PathContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function PullString() {
  const { theme, cycleTheme } = usePath();
  const [isPulling, setIsPulling] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const handleClick = () => {
    setIsPulling(true);
    cycleTheme();
    setShowLabel(true);
    setTimeout(() => setIsPulling(false), 300);
    setTimeout(() => setShowLabel(false), 1200);
  };

  return (
    <div className="fixed top-0 right-6 md:right-12 z-[100] flex flex-col items-center pointer-events-none">
      {/* String */}
      <motion.div
        animate={{ height: isPulling ? 130 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-[1px] bg-foreground/20 pointer-events-auto cursor-pointer relative"
        onClick={handleClick}
        style={{ height: 100 }}
      >
        {/* Bulb */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-foreground/20"
          animate={{
            backgroundColor: theme.accent,
            scale: isPulling ? 1.3 : 1,
            boxShadow: `0 0 12px ${theme.accent}80`,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Theme name flash */}
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[110px] font-mono text-[8px] uppercase tracking-widest whitespace-nowrap"
            style={{ color: theme.accent }}
          >
            {theme.name}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Flicker on switch */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[1000] animate-flicker"
            style={{ backgroundColor: `${theme.accent}08` }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
