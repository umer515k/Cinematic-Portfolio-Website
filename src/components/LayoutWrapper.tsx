"use client";

import { usePath } from "@/context/PathContext";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isBlurring } = usePath();

  return (
    <motion.div
      animate={{
        filter: isBlurring ? "blur(20px)" : "blur(0px)",
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
