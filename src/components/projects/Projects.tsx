"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { usePath } from "@/context/PathContext";
import { projects, Project } from "@/data/projects";
import { Github } from "lucide-react";
import SwitchPathCTA from "@/components/nav/SwitchPathCTA";
import { useLenis } from "@studio-freight/react-lenis";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Projects() {
  const { path } = usePath();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Control Lenis scroll based on selection
  useEffect(() => {
    if (selectedProject || lightboxImage) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => lenis?.start();
  }, [selectedProject, lightboxImage, lenis]);

  const filteredProjects = projects.filter(
    (p) => p.path === path || p.path === "both"
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="min-h-screen w-full py-20 md:py-32 px-6 md:px-24 bg-background overflow-hidden relative">
        <LayoutGroup>
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="space-y-4">
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                Featured Works
              </p>
              <h2 className="text-4xl md:text-7xl font-serif text-foreground">
                Selected Projects
              </h2>
            </div>

            <div className="flex flex-col gap-0 border-t border-foreground/10">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>

            <div className="pt-20">
              <SwitchPathCTA />
            </div>
          </div>
        </LayoutGroup>
      </section>

      {/* PORTALS RENDERING AT BODY LEVEL */}
      {mounted && createPortal(
        <>
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={handleClose}
                        setLightboxImage={setLightboxImage}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {lightboxImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setLightboxImage(null)}
                    className="fixed inset-0 z-[1000000] bg-black/95 flex items-center justify-center p-6 md:p-12 cursor-pointer"
                >
                    <motion.img
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        src={lightboxImage}
                        className="max-w-full max-h-full object-contain shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const isGHL = project.path === "operator";
  const isMLOps = project.title === "Complete MLOps Pipeline";

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group flex flex-col md:flex-row items-stretch border-b border-foreground/10 py-12 cursor-pointer relative overflow-hidden"
    >
      <div className="w-full md:w-1/3 aspect-video md:aspect-auto relative overflow-hidden bg-foreground/5 rounded-sm">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: "linear" }}
          src={project.thumbnail}
          className="w-full h-full object-cover grayscale brightness-50"
          onError={(e) =>
            (e.currentTarget.src =
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")
          }
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        {isMLOps && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
            className="absolute bottom-4 left-4 w-2 h-4 bg-[var(--accent-primary)] z-10"
          />
        )}
        {isGHL && (
          <div className="absolute bottom-4 left-4 flex gap-2 z-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-2/3 pl-0 md:pl-12 flex flex-col justify-center space-y-4 pt-8 md:pt-0">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-foreground/20">0{index + 1}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-primary)] opacity-60">
            {project.path === "both" ? "Flagship Narrative" : project.path}
          </span>
        </div>
        <motion.h3
          whileHover={{ y: -4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-serif text-foreground transition-colors group-hover:text-[var(--accent-primary)]"
        >
          {project.title}
        </motion.h3>
        <p 
          className="font-serif italic text-foreground/40 max-w-xl"
          style={{ fontSize: "clamp(14px, 3.5vw, 18px)" }}
        >
          {project.oneLiner}
        </p>
        <div className="pt-4 flex items-center gap-6">
          <div className="overflow-hidden group/trigger">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] relative inline-block text-[var(--accent-primary)] md:text-foreground md:group-hover/trigger:text-[var(--accent-primary)] transition-colors">
              Explore Narrative
              <span className="absolute bottom-0 left-0 w-full md:w-0 h-[1px] bg-[var(--accent-primary)] transition-all duration-500 md:group-hover/trigger:w-full" />
            </span>
          </div>

          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full border border-foreground/10 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 text-foreground/40 hover:text-[var(--accent-primary)] transition-all duration-300"
              title="View Source on GitHub"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Contact Sheet ────────────────────────────────────────────────────────────
function ContactSheet({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (src: string) => void;
}) {
  if (!images.length) return null;
  return (
    <div className="space-y-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent-primary)]">
        Contact Sheet
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            onClick={() => onOpen(src)}
            className="aspect-video overflow-hidden rounded-sm cursor-pointer border border-foreground/10 hover:border-[var(--accent-primary)] transition-colors"
          >
            <img
              src={src}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── GHL SVG Infographic ──────────────────────────────────────────────────────
function GHLInfographic({ projectId }: { projectId: number }) {
  const isLead = projectId === 6;
  const nodes = isLead
    ? [
        { x: 80,  y: 60,  label: "Lead Form" },
        { x: 240, y: 60,  label: "AI Voice" },
        { x: 400, y: 60,  label: "Qualify" },
        { x: 400, y: 180, label: "Book Appt" },
        { x: 240, y: 180, label: "Assign" },
        { x: 80,  y: 180, label: "Track" },
      ]
    : [
        { x: 80,  y: 60,  label: "Stripe" },
        { x: 240, y: 60,  label: "Account" },
        { x: 400, y: 60,  label: "Snapshot" },
        { x: 400, y: 180, label: "Billing" },
        { x: 240, y: 180, label: "Sequence" },
        { x: 80,  y: 180, label: "Activate" },
      ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];
  return (
    <svg viewBox="0 0 480 240" className="w-full h-full" style={{ maxHeight: "100%" }}>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        return (
          <line
            key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="var(--accent-primary)" strokeWidth="1.5" strokeOpacity="0.6"
            strokeDasharray={len} strokeDashoffset={len}
            style={{ animation: `drawLine 0.8s ${i * 0.15}s ease forwards` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="18" fill="var(--background)" stroke="var(--accent-primary)" strokeWidth="1" strokeOpacity="0.5" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="var(--foreground)" fontSize="7" fontFamily="monospace" opacity="0.8">{n.label}</text>
        </g>
      ))}
      <style>{`@keyframes drawLine { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}

// ─── Modal Shell ─────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  setLightboxImage,
}: {
  project: Project;
  onClose: () => void;
  setLightboxImage: (src: string) => void;
}) {
  const isGHL = project.path === "operator";
  const images = project.caseStudy?.images ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999998] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
      style={{ isolation: 'isolate' }}
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
        className="relative z-10 w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)]"
      >
        {/* Left: Visual Panel (Fixed) */}
        <div className="w-full md:w-2/5 h-[200px] md:h-full bg-black relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 shrink-0">
            {isGHL ? (
                <div className="p-8 w-full h-full">
                    <GHLInfographic projectId={project.id} />
                </div>
            ) : (
                <>
                    <img
                        src={project.thumbnail}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                        onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")}
                    />
                    <div className="relative z-10 p-8 text-center">
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-none">
                            {project.title.split(" ")[0]}
                            <br />
                            <span className="opacity-10 italic">{project.title.split(" ").slice(1).join(" ")}</span>
                        </h2>
                    </div>
                </>
            )}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
        </div>

        {/* Right: Content Area (Independent Scroll) */}
        <div 
          ref={scrollRef}
          className="w-full md:w-3/5 overflow-y-auto p-8 md:p-12 space-y-12 scroll-smooth overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
            <div className="flex justify-between items-start sticky top-0 bg-[#0a0a0a] z-30 pb-6 -mt-4 border-b border-white/5">
                <div className="space-y-1 pr-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--accent-primary)]">Project Narrative</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground">{project.title}</h3>
                </div>
                <button 
                    onClick={onClose}
                    className="group flex flex-col items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-foreground/40 hover:text-[var(--accent-primary)] transition-colors pt-2"
                >
                    <span className="group-hover:rotate-90 transition-transform duration-300 text-lg">[ × ]</span>
                    <span>Close</span>
                </button>
            </div>

            <div className="space-y-4 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">Executive Summary</span>
                <p 
                    className="font-serif italic text-foreground/80 leading-relaxed italic"
                    style={{ fontSize: "clamp(16px, 4vw, 24px)" }}
                >
                    "{project.description}"
                </p>
            </div>

            {project.caseStudy && (
                <>
                    <div className="space-y-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">The Challenge</span>
                        <p className="text-base md:text-lg font-serif text-foreground/60 leading-relaxed">{project.caseStudy.problem}</p>
                    </div>
                    <div className="space-y-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">The Architecture</span>
                        <p className="text-base md:text-lg font-serif text-foreground/60 leading-relaxed">{project.caseStudy.solution}</p>
                    </div>
                    <div className="bg-[var(--accent-primary)]/5 p-8 border-l-2 border-[var(--accent-primary)]/40 space-y-3">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent-primary)]">The Outcome</span>
                        <p className="text-2xl md:text-3xl font-serif text-foreground italic leading-tight">{project.caseStudy.outcome}</p>
                    </div>
                </>
            )}

            <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">Technical Stack</span>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                        <span key={t} className="px-4 py-2 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-foreground/50">{t}</span>
                    ))}
                </div>
            </div>

            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group pt-4">
                    <div className="p-4 rounded-full border border-white/10 group-hover:bg-[var(--accent-primary)] group-hover:text-background transition-all duration-500 shadow-xl">
                      <Github size={20} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/40 group-hover:text-foreground">Source Repository</span>
                </a>
            )}

            {images.length > 0 && (
                <div className="pt-12 pb-8 border-t border-white/5">
                    <ContactSheet images={images} onOpen={setLightboxImage} />
                </div>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
}
