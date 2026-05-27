"use client";

export default function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] overflow-hidden">
      <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100" />
    </div>
  );
}
