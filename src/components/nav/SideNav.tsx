"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePath } from "@/context/PathContext";

const NAV_SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
  { id: "skills",     label: "Skills" },
  { id: "reviews",    label: "Reviews" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact",    label: "Contact" },
];

export default function SideNav() {
  const { path, setPath } = usePath();
  const [active, setActive] = useState("hero");
  const [showPathSwitch, setShowPathSwitch] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [path]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const visibleSections = path
    ? NAV_SECTIONS
    : NAV_SECTIONS.slice(0, 1);

  return (
    <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[500] flex">
      {/* Rail */}
      <div className="relative flex flex-col items-center">
        {/* Vertical spine line */}
        <div className="absolute top-0 bottom-0 right-[5px] md:right-[5px] w-px bg-foreground/10 -z-10" />

        <div className="flex flex-col items-end gap-0">
          {visibleSections.map(({ id, label }, index) => (
            <div key={id} className="flex flex-col items-end">
              <button
                onClick={() => scrollTo(id)}
                className="group relative flex items-center justify-end gap-3 py-1.5 md:py-2"
                aria-label={`Navigate to ${label}`}
              >
                {/* Label - hidden on small mobile, visible on tablets/desktop */}
                <span
                  className={`
                    font-mono text-[9px] uppercase tracking-widest
                    transition-all duration-500 whitespace-nowrap
                    translate-x-0 group-hover:translate-x-0
                    ${
                      active === id
                        ? "opacity-60 text-[var(--accent-primary)]"
                        : "opacity-0 md:group-hover:opacity-100 text-foreground/50 group-hover:text-[var(--accent-primary)] hidden md:block"
                    }
                  `}
                >
                  {label}
                </span>

                {/* Dot */}
                <motion.div
                  animate={{
                    scale: active === id ? 1.3 : 1,
                    backgroundColor:
                      active === id
                        ? "var(--accent-primary)"
                        : "rgba(232,224,208,0.4)",
                    boxShadow:
                      active === id
                        ? "0 0 8px var(--accent-primary)"
                        : "0 0 0px transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0"
                />
              </button>

              {/* Connector line between dots — not after last item */}
              {index < visibleSections.length - 1 && (
                <div className="w-px h-1.5 md:h-2 bg-foreground/10 self-end mr-[2px] md:mr-[3px]" />
              )}
            </div>
          ))}
        </div>

        {/* Path switch */}
        <AnimatePresence>
          {path && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="mt-4 relative flex flex-col items-end"
            >
              {/* Divider above path switch */}
              <div className="w-4 h-px bg-foreground/15 mb-3 self-end" />

              <button
                onClick={() => setShowPathSwitch((p) => !p)}
                title="Switch path"
                className="w-4 h-4 rounded-full border border-[var(--accent-primary)] border-opacity-50 hover:border-opacity-100 transition-all duration-300 flex items-center justify-center group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <AnimatePresence>
                {showPathSwitch && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-7 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-sm p-3 flex flex-col gap-1.5 shadow-xl"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/30 pb-1">
                      Switch Path
                    </span>
                    {(["architect", "operator"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPath(p);
                          setShowPathSwitch(false);
                          setTimeout(() => scrollTo("about"), 500);
                        }}
                        className={`font-mono text-[9px] uppercase tracking-widest text-left px-2 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
                          path === p
                            ? "text-[var(--accent-primary)]"
                            : "text-foreground/30 hover:text-[var(--accent-primary)]"
                        }`}
                      >
                        {path === p ? "→ " : "  "}
                        {p === "architect" ? "Engineer" : "Automator"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}