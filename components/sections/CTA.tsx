"use client";

import { Globe, Mail } from "lucide-react";
import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function CTA() {
  return (
    <section
      id="contact"
      className="text-center py-[96px] px-[7vw]"
      style={{ background: "radial-gradient(ellipse 80% 65% at 50% 50%,rgba(255,107,53,.1) 0%,rgba(0,92,232,.05) 55%,transparent 75%),var(--sand)" }}
    >
      <RevealWrapper>
        <ChapterBar text="Let's Talk" variant="white" />
        <h2 className="font-display font-light text-[clamp(28px,3.8vw,56px)] tracking-[-0.022em] mb-[2vh] text-ink">
          Schedule a 30-minute call.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] text-[var(--text-mid)] max-w-[44vw] mx-auto mb-[4vh]">
          I&apos;ll walk through the budget, the missionaries, and where you&apos;d fit best. Then you decide. No pressure. No pitch close.
        </p>
      </RevealWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2.4vw] max-w-[68vw] mx-auto mt-[4vh]">
        <RevealWrapper delay={0}>
          <div className="p-8 rounded-[var(--r)] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_14px_rgba(28,31,46,.06)] flex flex-col gap-[.9rem] items-start hover:-translate-y-[3px] hover:shadow-[0_10px_38px_rgba(28,31,46,.1)] transition-all duration-200">
            <Globe size={24} stroke="#005BE8" strokeWidth={1.5} />
            <div className="font-body font-medium text-ink">Website</div>
            <a href="https://missionarymedia.org" className="text-coral font-mono text-[14px] tracking-[.06em] no-underline hover:opacity-70 transition-opacity">
              missionarymedia.org
            </a>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={0.1}>
          <div className="p-8 rounded-[var(--r)] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_14px_rgba(28,31,46,.06)] flex flex-col gap-[.9rem] items-start hover:-translate-y-[3px] hover:shadow-[0_10px_38px_rgba(28,31,46,.1)] transition-all duration-200">
            <Mail size={24} stroke="#005BE8" strokeWidth={1.5} />
            <div className="font-body font-medium text-ink">Email</div>
            <a href="mailto:missionarymediahub@gmail.com" className="text-coral font-mono text-[14px] tracking-[.06em] no-underline hover:opacity-70 transition-opacity">
              missionarymediahub@gmail.com
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
