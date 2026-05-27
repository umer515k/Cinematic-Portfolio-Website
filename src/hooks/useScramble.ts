"use client";

import { useState, useEffect, useCallback } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function useScramble(text: string, delay: number = 0, duration: number = 1000) {
  const [displayText, setDisplayText] = useState("");

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Slow down the reveal
    }, duration / (text.length * 3));

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    const timeout = setTimeout(scramble, delay);
    return () => clearTimeout(timeout);
  }, [scramble, delay]);

  return displayText;
}
