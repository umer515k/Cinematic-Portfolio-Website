"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, Theme, DEFAULT_THEME } from "@/data/themes";

type Path = "architect" | "operator" | null;

interface PathContextType {
  path: Path;
  setPath: (path: Path) => void;
  isBlurring: boolean;
  theme: Theme;
  cycleTheme: () => void;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export function PathProvider({ children }: { children: React.ReactNode }) {
  const [path, setPathState] = useState<Path>(null);
  const [isBlurring, setIsBlurring] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const theme = themes[themeIndex];

  useEffect(() => {
    setPathState(null);
    document.documentElement.classList.remove("path-architect", "path-operator");
  }, []);

  // Apply theme class to <html> whenever theme changes
  useEffect(() => {
    const html = document.documentElement;
    // Remove all theme classes
    themes.forEach((t) => html.classList.remove(`theme-${t.id}`));
    html.classList.add(`theme-${theme.id}`);
  }, [theme]);

  const setPath = (newPath: Path) => {
    setIsBlurring(true);
    setTimeout(() => {
      setPathState(newPath);
      document.documentElement.classList.remove("path-architect", "path-operator");
      if (newPath) document.documentElement.classList.add(`path-${newPath}`);

      // Set default theme per path
      if (newPath === "architect") setThemeIndex(themes.findIndex(t => t.id === "candlelight"));
      if (newPath === "operator")  setThemeIndex(themes.findIndex(t => t.id === "skellige"));

      setTimeout(() => setIsBlurring(false), 400);
    }, 400);
  };

  const cycleTheme = () => {
    setThemeIndex((i) => (i + 1) % themes.length);
  };

  return (
    <PathContext.Provider value={{ path, setPath, isBlurring, theme, cycleTheme }}>
      {children}
    </PathContext.Provider>
  );
}

export function usePath() {
  const context = useContext(PathContext);
  if (context === undefined) throw new Error("usePath must be used within a PathProvider");
  return context;
}
