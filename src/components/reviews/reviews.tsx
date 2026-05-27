"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwitchPathCTA from "@/components/nav/SwitchPathCTA";

// ─── Placeholder Data ───────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    pullQuote: "If they had employees with this level of customer service, I might have stayed.",
    fullReview:
      "Umer walked me through everything with patience and kindness. He was amazing — I just came from another company like this one and if they had employees with this level of customer service, I might have stayed.",
    reviewer: "Former Client",
    role: "Agency Engagement",
    source: "trustpilot" as const,
    sourceUrl: "https://www.trustpilot.com/users/69e7e4e762191461e6476b5c",
  },
  {
    id: 2,
    pullQuote: "Umer's expertise ensured perfect account activation and configuration.",
    fullReview:
      "Umer K provided excellent service setting up and activating my GoHighLevel account. His communication was clear, responsive, and simplified complex technical steps. Umer's expertise and deep knowledge of the platform were immediately apparent. I highly recommend Umer to anyone needing a GHL professional.",
    reviewer: "Verified Owner",
    role: "GHL Professional Setup",
    source: "trustpilot" as const,
    sourceUrl: "https://www.trustpilot.com/reviews/69c1c5c681b3a6c272122423",
  },
  {
    id: 3,
    pullQuote: "Very personable, patient, and extremely helpful. I am very impressed.",
    fullReview:
      "You should work with Umer, he is very personable, patient, and extremely helpful. I am very impressed with the whole experience.",
    reviewer: "Strategic Partner",
    role: "Agency Collaboration",
    source: "trustpilot" as const,
    sourceUrl: "https://www.trustpilot.com/reviews/69c40c5947c1cff4387bef77",
  },
  {
    id: 4,
    pullQuote: "Amazing platform and support! Great work overall, 10/10.",
    fullReview:
      "Amazing platform and support! Thank you Umer! Great work overall, easy to understand, helpful when needed. 10/10 will recommend.",
    reviewer: "Verified User",
    role: "Platform Support",
    source: "trustpilot" as const,
    sourceUrl: "https://www.trustpilot.com/reviews/69efdc7925489c08c53e09bd",
  },
  {
    id: 5,
    pullQuote: "He has turned my tech fear completely around. Umer has been a real star.",
    fullReview:
      "Before I joined the MBA, I had struggled for one whole year with tech. I had got nowhere, yet I inputted hours of work. Umer K has made my whole MBA experience the best I could have ever imagined! His teaching style and patience made me feel at ease. I have learning difficulties, and his patience and delivery has helped me achieve everything I needed. I am now selling courses, have lots of sign-ups to my emails, funnels, and community. He was fundamental to my progress.",
    reviewer: "Signature Testimonial",
    role: "Strategic Growth Partner",
    source: "direct" as const,
  },
];

const AUTO_CYCLE_INTERVAL = 8000; // 8 seconds per review

// ─── Source Badge ────────────────────────────────────────────────────────────
function SourceBadge({ source }: { source: "trustpilot" | "linkedin" | "direct" }) {
  const label = source === "trustpilot" ? "Trustpilot" : source === "linkedin" ? "LinkedIn" : "Signature Shoutout";
  return (
    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/30">
      {source === "direct" ? label : `via ${label}`}
    </span>
  );
}

// ─── Sprocket Navigation ─────────────────────────────────────────────────────
function SprocketNav({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Review ${i + 1}`}
          className="relative group flex items-center justify-center"
        >
          <motion.div
            animate={{
              backgroundColor:
                i === active ? "var(--accent-primary)" : "transparent",
              borderColor:
                i === active
                  ? "var(--accent-primary)"
                  : "rgba(232,224,208,0.25)",
              scale: i === active ? 1 : 1,
            }}
            whileHover={{ borderColor: "var(--accent-primary)", scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-2.5 rounded-[2px] border"
            style={{ borderWidth: "1px" }}
          />
          {/* Sprocket hole detail — two tiny circles on each rectangle */}
          <div className="absolute inset-0 flex items-center justify-around px-[3px] pointer-events-none">
            <div
              className="w-[3px] h-[3px] rounded-full"
              style={{
                backgroundColor:
                  i === active ? "rgba(13,11,8,0.6)" : "rgba(232,224,208,0.1)",
              }}
            />
            <div
              className="w-[3px] h-[3px] rounded-full"
              style={{
                backgroundColor:
                  i === active ? "rgba(13,11,8,0.6)" : "rgba(232,224,208,0.1)",
              }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ isRunning, duration }: { isRunning: boolean; duration: number }) {
  return (
    <div className="w-24 h-px bg-foreground/10 relative overflow-hidden">
      <motion.div
        key={isRunning ? "running" : "paused"}
        className="absolute left-0 top-0 h-full bg-[var(--accent-primary)] opacity-50"
        initial={{ width: "0%" }}
        animate={isRunning ? { width: "100%" } : { width: "0%" }}
        transition={
          isRunning
            ? { duration: duration / 1000, ease: "linear" }
            : { duration: 0 }
        }
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const review = REVIEWS[current];

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setShowFullReview(false);
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    const next = (current + 1) % REVIEWS.length;
    setDirection(1);
    setShowFullReview(false);
    setCurrent(next);
  }, [current]);

  const goPrev = useCallback(() => {
    const prev = (current - 1 + REVIEWS.length) % REVIEWS.length;
    setDirection(-1);
    setShowFullReview(false);
    setCurrent(prev);
  }, [current]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Auto-cycle — pauses on hover or when full review is open
  useEffect(() => {
    if (isHovered || showFullReview) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, AUTO_CYCLE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext, isHovered, showFullReview]);

  // Variants for pull quote transition
  const pullQuoteVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
    }),
  };

  const attributionVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <section
      id="reviews"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 md:py-40 px-6 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(13,11,8,0.85) 100%)",
        }}
      />

      {/* ── Ghost background text ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.p
            key={current + "-ghost"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.018 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="text-foreground select-none text-center leading-none font-serif px-8"
            style={{
              fontSize: "clamp(40px, 10vw, 160px)",
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              wordBreak: "break-word",
              maxWidth: "100%",
            }}
          >
            {review.pullQuote}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Section label ── */}
      <div className="relative z-10 flex flex-col items-center mb-12 md:mb-20 w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/25">
                The Consensus
            </span>
            <div className="px-2 py-0.5 rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
                <span className="font-mono text-[10px] text-[var(--accent-primary)] tracking-widest">+900 REVIEWS</span>
            </div>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-px bg-foreground/10 w-full origin-left"
        />
        <p className="mt-6 font-serif italic text-foreground/40 text-center text-sm md:text-lg max-w-2xl">
          A track record of technical clarity and business transformation.
        </p>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center px-4 md:px-12">
        {/* Navigation Buttons */}
        <div className="absolute top-[40%] -translate-y-1/2 left-0 right-0 hidden sm:flex justify-between pointer-events-none">
          <button
            onClick={goPrev}
            className="pointer-events-auto p-4 group transition-all duration-300"
            aria-label="Previous review"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.2, opacity: 1 }}
                className="text-foreground/20 group-hover:text-[var(--accent-primary)] opacity-60 transition-all duration-300"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
              </motion.div>
              <div className="absolute -left-2 w-px h-0 bg-[var(--accent-primary)] group-hover:h-8 transition-all duration-500 opacity-40" />
            </div>
          </button>
          <button
            onClick={goNext}
            className="pointer-events-auto p-4 group transition-all duration-300"
            aria-label="Next review"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.2, opacity: 1 }}
                className="text-foreground/20 group-hover:text-[var(--accent-primary)] opacity-60 transition-all duration-300"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
              </motion.div>
              <div className="absolute -right-2 w-px h-0 bg-[var(--accent-primary)] group-hover:h-8 transition-all duration-500 opacity-40" />
            </div>
          </button>
        </div>

        {/* Opening quote mark */}
        <div
          className="font-serif text-[var(--accent-primary)] opacity-20 leading-none mb-2 md:mb-4 select-none"
          style={{
            fontSize: "clamp(60px, 10vw, 120px)",
            fontFamily: "Cormorant Garamond, serif",
            lineHeight: 0.8,
          }}
        >
          &ldquo;
        </div>

        {/* ── Pull Quote ── */}
        <div className="relative min-h-[140px] md:min-h-[180px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current + "-quote"}
              custom={direction}
              variants={pullQuoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) goPrev();
                else if (info.offset.x < -100) goNext();
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-foreground/90 font-serif italic text-center w-full cursor-grab active:cursor-grabbing select-none"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(22px, 4.5vw, 64px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {review.pullQuote}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* ── Attribution ── */}
        <div className="mt-8 min-h-[60px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current + "-attr"}
              variants={attributionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              {/* Long dash + name */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[var(--accent-primary)] opacity-40" />
                <span
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-primary)] opacity-80"
                >
                  {review.reviewer}
                </span>
                <div className="w-8 h-px bg-[var(--accent-primary)] opacity-40" />
              </div>

              {/* Role + source */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">
                  {review.role}
                </span>
                <span className="text-foreground/15 font-mono text-[9px]">·</span>
                <SourceBadge source={review.source} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Full Review (expandable) ── */}
        <AnimatePresence>
          {showFullReview && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden w-full max-w-2xl"
            >
              <div
                className="border-t border-foreground/8 pt-8"
                style={{ borderColor: "rgba(232,224,208,0.08)" }}
              >
                <p
                  className="text-foreground/40 font-serif text-center leading-relaxed"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(16px, 2vw, 20px)",
                  }}
                >
                  {review.fullReview}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Expand / Source link row ── */}
        <div className="mt-10 flex items-center gap-5">
          {/* Read full review button */}
          <button
            onClick={() => setShowFullReview((v) => !v)}
            className="group relative font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground/90 transition-colors duration-300 flex items-center gap-2"
          >
            <span
              className="w-1.5 h-1.5 rounded-full border border-foreground/40 group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] transition-all duration-300 flex-shrink-0"
            />
            {showFullReview ? "Collapse" : "Read Full Review"}
            {/* Underline draw */}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground/40 group-hover:w-full transition-all duration-500 ease-out" />
          </button>

          {review.sourceUrl && (
            <>
              <span className="text-foreground/20 font-mono text-[10px]">/</span>
              <a
                href={review.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)] opacity-60 hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
              >
                View Source
                <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-1 inline-block">
                  →
                </span>
                {/* Underline draw */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-primary)] group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* ── Bottom row: sprocket nav + progress ── */}
      <div className="relative z-10 mt-20 flex flex-col items-center gap-5">
        <SprocketNav
          total={REVIEWS.length}
          active={current}
          onSelect={goTo}
        />

        {/* Progress bar + pause indicator */}
        <div className="flex items-center gap-4">
          <ProgressBar
            isRunning={!isHovered && !showFullReview}
            duration={AUTO_CYCLE_INTERVAL}
          />
          <AnimatePresence>
            {(isHovered || showFullReview) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[8px] uppercase tracking-widest text-foreground/20"
              >
                paused
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Review count */}
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-foreground/15">
          {String(current + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Bottom rule ── */}
      <div className="relative z-10 mt-20 w-full max-w-4xl px-6">
        <div className="h-px bg-foreground/8" style={{ backgroundColor: "rgba(232,224,208,0.08)" }} />
      </div>
    </section>
  );
}
