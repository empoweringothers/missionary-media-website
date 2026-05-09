"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[4.5vw] h-[60px] transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(250,248,245,.96)] backdrop-blur-[28px] border-b border-[rgba(28,31,46,.1)] shadow-[0_1px_20px_rgba(28,31,46,.06)]"
          : "bg-[rgba(250,248,245,.72)] backdrop-blur-[20px] border-b border-[rgba(28,31,46,.06)]"
      }`}
    >
      <a className="flex items-center gap-2.5 no-underline" href="#">
        <Image
          src="/images/logo.png"
          alt="Missionary Media"
          width={34}
          height={34}
          className="h-[34px] w-auto"
        />
        <span className="font-body text-[15px] font-semibold tracking-[-0.03em] text-[var(--text-main)]">
          Missionary Media
        </span>
      </a>

      <div className="flex gap-[2vw] items-center">
        <a
          href="#problem"
          className="hidden md:block font-body text-[14px] text-[var(--text-muted)] no-underline tracking-[.005em] hover:text-[var(--ink)] transition-colors duration-200"
        >
          The Problem
        </a>
        <a
          href="#traction"
          className="hidden md:block font-body text-[14px] text-[var(--text-muted)] no-underline tracking-[.005em] hover:text-[var(--ink)] transition-colors duration-200"
        >
          Our Progress
        </a>
        <a
          href="#sponsor"
          className="hidden md:block font-body text-[14px] text-[var(--text-muted)] no-underline tracking-[.005em] hover:text-[var(--ink)] transition-colors duration-200"
        >
          Sponsor
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-[7px] bg-coral text-white font-body font-medium text-[13px] tracking-[.01em] border-none rounded-full px-[18px] py-2 cursor-pointer no-underline transition-all duration-[220ms] shadow-[0_2px_12px_rgba(255,107,53,.28)] hover:bg-orange hover:shadow-[0_4px_20px_rgba(255,107,53,.38)] hover:-translate-y-px"
        >
          <Calendar size={14} strokeWidth={2} />
          Schedule a Call
        </a>
      </div>
    </nav>
  );
}
