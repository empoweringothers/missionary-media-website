"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "The Problem", href: "#problem" },
  { label: "Our Progress", href: "#traction" },
  { label: "Sponsor",      href: "#sponsor" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-[4.5vw] h-[60px] transition-all duration-400 ${
          scrolled || open
            ? "bg-[rgba(15,30,60,.96)] backdrop-blur-[28px] border-b border-[rgba(250,248,245,.08)]"
            : "bg-[rgba(250,248,245,.72)] backdrop-blur-[20px] border-b border-[rgba(28,31,46,.06)]"
        }`}
      >
        <a className="flex items-center gap-2.5 no-underline z-[201]" href="#" onClick={close}>
          <Image
            src="/images/logo.png"
            alt="Missionary Media"
            width={34}
            height={34}
            className="h-[34px] w-auto"
          />
          <span className={`font-body text-[15px] font-semibold tracking-[-0.03em] transition-colors duration-300 ${
            scrolled || open ? "text-[rgba(250,248,245,.9)]" : "text-[var(--text-main)]"
          }`}>
            Missionary Media
          </span>
        </a>

        <div className="flex gap-[2vw] items-center">
          {/* Desktop links */}
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden md:block font-body text-[14px] text-[var(--text-muted)] no-underline tracking-[.005em] hover:text-[var(--ink)] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}

          {/* CTA — hidden on mobile when menu open */}
          <a
            href="#contact"
            className={`inline-flex items-center gap-[7px] bg-coral text-white font-body font-medium text-[13px] tracking-[.01em] border-none rounded-full px-[18px] py-2 cursor-pointer no-underline transition-all duration-[220ms] shadow-[0_2px_12px_rgba(255,107,53,.28)] hover:bg-orange hover:shadow-[0_4px_20px_rgba(255,107,53,.38)] hover:-translate-y-px ${
              open ? "hidden" : ""
            }`}
          >
            <Calendar size={14} strokeWidth={2} />
            <span className="hidden sm:inline">Schedule a Call</span>
            <span className="sm:hidden">Book</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden z-[201] flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-full transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="block h-[1.5px] bg-current rounded-full origin-center"
              style={{ width: 22, color: open ? "rgba(250,248,245,.9)" : scrolled ? "var(--ink)" : "rgba(250,248,245,.9)" }}
              animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="block h-[1.5px] bg-current rounded-full"
              style={{ width: 22, color: open ? "rgba(250,248,245,.9)" : scrolled ? "var(--ink)" : "rgba(250,248,245,.9)" }}
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block h-[1.5px] bg-current rounded-full origin-center"
              style={{ width: 22, color: open ? "rgba(250,248,245,.9)" : scrolled ? "var(--ink)" : "rgba(250,248,245,.9)" }}
              animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[199] flex flex-col items-center justify-center md:hidden"
            style={{ background: "rgba(10,18,40,0.97)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute w-[60%] h-[50%] top-[10%] left-[20%] rounded-full opacity-20"
                style={{ background: "radial-gradient(ellipse, rgba(255,107,53,.6) 0%, transparent 70%)", filter: "blur(60px)" }} />
              <div className="absolute w-[50%] h-[40%] bottom-[10%] right-[10%] rounded-full opacity-15"
                style={{ background: "radial-gradient(ellipse, rgba(0,92,232,.7) 0%, transparent 70%)", filter: "blur(60px)" }} />
            </div>

            {/* Links */}
            <nav className="flex flex-col items-center gap-[6vh] z-10">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="font-display font-bold text-[clamp(36px,10vw,56px)] leading-none tracking-[-0.03em] text-[rgba(250,248,245,.88)] no-underline hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: [0.2, 0.8, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}

              {/* CTA inside menu */}
              <motion.a
                href="#contact"
                onClick={close}
                className="mt-[2vh] inline-flex items-center gap-[8px] bg-coral text-white font-body font-semibold text-[15px] rounded-full px-[28px] py-[14px] no-underline shadow-[0_6px_30px_rgba(255,107,53,.4)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, delay: 0.24, ease: [0.2, 0.8, 0.3, 1] }}
              >
                <Calendar size={16} strokeWidth={2} />
                Schedule a Call
              </motion.a>
            </nav>

            {/* Bottom mono tag */}
            <motion.p
              className="absolute bottom-[5vh] font-mono text-[10px] tracking-[.22em] uppercase text-[rgba(250,248,245,.2)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
            >
              Missionary Media · 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
