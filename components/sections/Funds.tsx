"use client";

import { useEffect, useRef } from "react";
import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const bars = [
  { label: "Course Development", amount: "$38K", cls: "fb1", fillClass: "bg-gradient-to-r from-coral to-orange" },
  { label: "Platform & Technology", amount: "$24K", cls: "fb2", fillClass: "bg-gradient-to-r from-amber to-[rgba(232,112,42,.7)]" },
  { label: "Field Research & Travel", amount: "$18K", cls: "fb3", fillClass: "bg-gradient-to-r from-blue to-[rgba(0,92,232,.7)]" },
  { label: "Operations & Coaching", amount: "$16K", cls: "fb4", fillClass: "bg-gradient-to-r from-[rgba(0,92,232,.7)] to-blue-lt" },
  { label: "Outreach & Cohort Launch", amount: "$14K", cls: "fb5", fillClass: "bg-gradient-to-r from-[rgba(0,196,249,.7)] to-[rgba(0,196,249,.4)]" },
];

export default function Funds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        el.querySelectorAll(".fund-fill").forEach((fill) => fill.classList.add("loaded"));
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="s-tint py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="Use of Funds" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          $110K. 9 months. One launch.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          Pre-launch capital builds the foundation that makes ongoing sponsorships viable. Here&apos;s exactly where it goes.
        </p>
      </RevealWrapper>

      <div ref={containerRef} className="flex flex-col gap-[1.8vh] mt-[4.5vh]">
        {bars.map((bar) => (
          <div key={bar.label} className="grid items-center gap-[2vw]" style={{ gridTemplateColumns: "2.2fr 4fr auto" }}>
            <span className="font-body text-[clamp(13px,1.04vw,16px)] font-medium text-[var(--text-main)]">{bar.label}</span>
            <div className="h-2.5 rounded-[5px] bg-[rgba(28,31,46,.07)] overflow-hidden">
              <div className={`fund-fill h-full rounded-[5px] ${bar.cls} ${bar.fillClass}`} />
            </div>
            <span className="font-mono text-[13px] tracking-[.08em] text-[var(--text-mid)] text-right whitespace-nowrap">{bar.amount}</span>
          </div>
        ))}
      </div>

      <RevealWrapper className="mt-[3.5vh]">
        <div className="p-8 rounded-[var(--r)] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_12px_rgba(28,31,46,.06)] flex justify-between items-center flex-wrap gap-[1.5vh]">
          <div>
            <div className="font-display text-[clamp(22px,2.4vw,34px)] font-bold tracking-[-0.03em] text-ink">$110K total</div>
            <div className="font-mono text-[11px] tracking-[.2em] uppercase text-[var(--text-muted)] mt-1">Pre-launch budget · 9-month runway</div>
          </div>
          <p className="font-body text-[clamp(13px,1vw,15px)] leading-[1.55] text-[var(--text-mid)] max-w-[40vw]">
            Year 1 target: $65/mo per missionary × first cohort of 30 = a self-sustaining model. Pre-launch gets us there.
          </p>
        </div>
      </RevealWrapper>
    </section>
  );
}
