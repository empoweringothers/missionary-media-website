"use client";

import Image from "next/image";
import { Eye, CheckCircle, Smartphone, Shield } from "lucide-react";
import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const caps = [
  { icon: <Eye size={20} stroke="#005BE8" />, title: "Awareness", desc: "Of the digital landscape — what's changed, what's proven, what mission boards don't have bandwidth to maintain." },
  { icon: <CheckCircle size={20} stroke="#005BE8" />, title: "Tested-and-true", desc: "Only tools proven in the US AND in cross-country missionary contexts — field-verified, not assumed." },
  { icon: <Smartphone size={20} stroke="#005BE8" />, title: "Phone-first, free-first", desc: "Defaults that respect device, bandwidth, and budget reality — wherever the field is located." },
  { icon: <Shield size={20} stroke="#005BE8" />, title: "Security first-class", desc: "Visa scans, restricted regions, digital footprint risk — built in from day one, not added as a footnote." },
];

export default function Solution() {
  return (
    <section id="solution" className="s-blue py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="The Solution" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          The translator between proven digital systems and missionary reality.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          You&apos;ve tried the advice. It didn&apos;t fit. We exist because the tools weren&apos;t built with you in mind — until now.
        </p>
      </RevealWrapper>

      {/* Flow */}
      <RevealWrapper className="flex items-stretch gap-[2.4vw] mt-[5vh] flex-col md:flex-row">
        {/* Node 1 */}
        <div className="flex-1 rounded-[var(--r)] bg-white border border-[rgba(28,31,46,.1)] p-[2.4rem] flex flex-col items-center text-center gap-[1.2rem] shadow-[0_2px_14px_rgba(28,31,46,.06)] hover:-translate-y-[3px] hover:shadow-[0_10px_36px_rgba(28,31,46,.1)] transition-all duration-[220ms]">
          <div className="w-[50px] h-[50px] rounded-[13px] bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.16)] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#00C4F9" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
          </div>
          <h3 className="font-display text-[clamp(14px,1.28vw,18px)] font-semibold text-ink">Digital Landscape</h3>
          <p className="font-body text-[clamp(12px,.92vw,14px)] leading-[1.5] text-[var(--text-mid)]">
            What works in the modern digital world — tools, platforms, workflows, AI
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center opacity-30 text-ink shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>

        {/* MM center */}
        <div className="flex-1 rounded-[var(--r)] bg-[linear-gradient(145deg,rgba(0,92,232,.06),rgba(0,92,232,.02))] border border-[rgba(0,92,232,.22)] p-[2.4rem] flex flex-col items-center text-center gap-[1.2rem] shadow-[0_8px_40px_rgba(0,92,232,.1)] hover:-translate-y-[3px] hover:shadow-[0_16px_52px_rgba(0,92,232,.15)] transition-all duration-[220ms]">
          <Image src="/images/logo.png" alt="Missionary Media" width={48} height={48} className="h-12 w-auto" />
          <h3 className="font-display text-[clamp(14px,1.28vw,18px)] font-semibold text-ink">Missionary Media</h3>
          <p className="font-body text-[clamp(12px,.92vw,14px)] leading-[1.5] text-[var(--text-mid)]">
            Context-aware. Field-tested. Phone-first. Security-native.
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center opacity-30 text-ink shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>

        {/* Node 3 */}
        <div className="flex-1 rounded-[var(--r)] bg-[#FFF8F4] border border-[rgba(255,107,53,.2)] p-[2.4rem] flex flex-col items-center text-center gap-[1.2rem] shadow-[0_2px_14px_rgba(28,31,46,.06)] hover:-translate-y-[3px] hover:shadow-[0_10px_36px_rgba(255,107,53,.1)] transition-all duration-[220ms]">
          <div className="w-[50px] h-[50px] rounded-[13px] bg-[rgba(255,107,53,.08)] border border-[rgba(255,107,53,.2)] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#F63600" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3 className="font-display text-[clamp(14px,1.28vw,18px)] font-semibold text-ink">Missionary Reality</h3>
          <p className="font-body text-[clamp(12px,.92vw,14px)] leading-[1.5] text-[var(--text-mid)]">
            What actually works on the field — bandwidth, culture, security, stewardship
          </p>
        </div>
      </RevealWrapper>

      {/* Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[2vw] mt-[4.5vh]">
        {caps.map((cap, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="rounded-[var(--r)] p-8 bg-white border border-[rgba(28,31,46,.1)] flex flex-col gap-4 hover:-translate-y-[3px] hover:shadow-[0_10px_34px_rgba(28,31,46,.1)] transition-all duration-[220ms] shadow-[0_2px_12px_rgba(28,31,46,.05)]">
              <div className="w-11 h-11 rounded-[12px] bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.16)] flex items-center justify-center">
                {cap.icon}
              </div>
              <h4 className="font-display text-[clamp(13px,1.05vw,16px)] font-semibold text-ink">{cap.title}</h4>
              <p className="font-body text-[clamp(12px,.9vw,14px)] leading-[1.5] text-[var(--text-mid)]">{cap.desc}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
