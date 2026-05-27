"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useScramble from "@/hooks/useScramble";
import { Send, Mail, Linkedin, Github } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const EMAILJS_SERVICE  = "service_wnxtvwe";
const EMAILJS_TEMPLATE = "template_bvubp3i";
const EMAILJS_KEY      = "Y8CblLvXqALLDfovz";

type FormData = { name: string; email: string; message: string };

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const closingLine = useScramble("Let's make something that matters.", 500, 2000);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { name: data.name, email: data.email, message: data.message },
        EMAILJS_KEY
      );
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full py-32 px-6 md:px-24 bg-background flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-24">
        <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
                {closingLine}
            </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2 relative group">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 group-focus-within:text-[var(--accent-primary)] transition-colors">
                        Your Name
                    </label>
                    <input 
                        {...register("name", { required: true })}
                        className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all font-serif text-xl"
                        placeholder="Umer Khalil"
                    />
                    {errors.name && <span className="absolute -bottom-6 left-0 font-mono text-[8px] uppercase text-red-500/60">Required</span>}
                </div>
                <div className="space-y-2 relative group">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 group-focus-within:text-[var(--accent-primary)] transition-colors">
                        Your Email
                    </label>
                    <input 
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all font-serif text-xl"
                        placeholder="umerkhalil515k@gmail.com"
                    />
                    {errors.email && <span className="absolute -bottom-6 left-0 font-mono text-[8px] uppercase text-red-500/60">Invalid Email</span>}
                </div>
            </div>

            <div className="space-y-2 relative group">
                <label className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 group-focus-within:text-[var(--accent-primary)] transition-colors">
                    The Narrative
                </label>
                <textarea 
                    {...register("message", { required: true })}
                    rows={4}
                    className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all font-serif text-xl resize-none"
                    placeholder="Tell me about your project..."
                />
                {errors.message && <span className="absolute -bottom-6 left-0 font-mono text-[8px] uppercase text-red-500/60">Required</span>}
            </div>

            <div className="flex flex-col items-center gap-4 pt-8">
                <button 
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    className="group flex items-center gap-4 px-12 py-6 rounded-full border border-foreground/10 hover:border-[var(--accent-primary)] transition-all duration-700 overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] relative z-10">
                        {status === "sending" ? "Transmitting..." : status === "sent" ? "Signal Sent" : "Transmit Signal"}
                    </span>
                    <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <div className="absolute inset-0 bg-[var(--accent-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                {status === "error" && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-red-400/60">
                        Transmission failed. Try emailing directly.
                    </p>
                )}
            </div>
        </form>

        {/* ── Direct Channels ── */}
        <div className="pt-24 border-t border-foreground/5 space-y-16">
            <div className="flex flex-col items-center space-y-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/20">
                    Direct Channels
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
                    <a 
                        href="mailto:umerkhalil515k@gmail.com" 
                        className="group flex flex-col items-center p-8 border border-foreground/5 hover:border-[var(--accent-primary)]/30 transition-all duration-500 rounded-sm space-y-4"
                    >
                        <Mail size={20} className="text-foreground/20 group-hover:text-[var(--accent-primary)] transition-colors" />
                        <div className="flex flex-col items-center">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">Email Me</span>
                            <span className="font-serif text-lg text-foreground group-hover:text-[var(--accent-primary)] transition-colors">umerkhalil515k@gmail.com</span>
                        </div>
                    </a>

                    <a 
                        href="https://www.linkedin.com/in/umer-khalil-7aa280289/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex flex-col items-center p-8 border border-foreground/5 hover:border-[var(--accent-primary)]/30 transition-all duration-500 rounded-sm space-y-4"
                    >
                        <Linkedin size={20} className="text-foreground/20 group-hover:text-[var(--accent-primary)] transition-colors" />
                        <div className="flex flex-col items-center">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">LinkedIn</span>
                            <span className="font-serif text-lg text-foreground group-hover:text-[var(--accent-primary)] transition-colors">Umer Khalil</span>
                        </div>
                    </a>

                    <a 
                        href="https://github.com/umer515k" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex flex-col items-center p-8 border border-foreground/5 hover:border-[var(--accent-primary)]/30 transition-all duration-500 rounded-sm space-y-4"
                    >
                        <Github size={20} className="text-foreground/20 group-hover:text-[var(--accent-primary)] transition-colors" />
                        <div className="flex flex-col items-center">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">GitHub</span>
                            <span className="font-serif text-lg text-foreground group-hover:text-[var(--accent-primary)] transition-colors">@umer515k</span>
                        </div>
                    </a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                <div className="text-center md:text-left">
                    <p className="font-serif italic text-sm">
                        Handcrafted by Umer Khalil &copy; 2026
                    </p>
                    <p className="font-mono text-[8px] uppercase tracking-widest mt-1">
                        Built with Next.js & Framer Motion
                    </p>
                </div>
                <div className="flex gap-8">
                    <span className="font-mono text-[8px] uppercase tracking-widest">Islamabad, PK</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest">Available for hire</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
