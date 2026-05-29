"use client";

import { usePath } from "@/context/PathContext";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isBlurring } = usePath();

  return (
    <div className="relative min-h-screen">
      <motion.div
        animate={{
          opacity: isBlurring ? 0.3 : 1,
          scale: isBlurring ? 0.98 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="min-h-screen"
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>

      {/* Optimized Blur Overlay */}
      <AnimatePresence>
        {isBlurring && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10000] pointer-events-none backdrop-blur-xl bg-background/10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
