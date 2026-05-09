"use client";

import { useEffect, useRef } from "react";
import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const stats = [
  { n: 45, suffix: "%", label: "AI Adoption · Pushpay 2025", desc: "Of church leaders already use AI tools — up 80% YoY. The digital shift is happening now, not in five years." },
  { n: 86, suffix: "%", label: "Tech & Ministry · Pushpay 2025", desc: "Of church leaders say technology enhances ministry connection. Missionaries are the last to benefit from this shift." },
  { n: 15, suffix: " min/day", label: "Daily Cost · Missio Nexus", desc: "People can waste 15 minutes a day trying to figure out how to do something on their computer. That's 62 hours a year — borrowed from ministry." },
];

function StatBox({ n, suffix, label, desc, delay }: { n: number; suffix: string; label: string; desc: string; delay: number }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const duration = 1500;
        const animate = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(eased * n));
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [n]);

  return (
    <RevealWrapper delay={delay} className="p-[2.4rem] rounded-[var(--r)] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_16px_rgba(28,31,46,.06)]">
      <div className="font-display text-[clamp(44px,5vw,70px)] font-bold tracking-[-0.03em] leading-[1] mb-4 text-ink">
        <span ref={numRef}>{n}</span>{suffix}
      </div>
      <div className="font-mono text-[11px] tracking-[.22em] uppercase text-[var(--text-muted)] mb-[.7rem]">{label}</div>
      <p className="font-body text-[clamp(13px,1vw,15px)] leading-[1.55] text-[var(--text-mid)]">{desc}</p>
    </RevealWrapper>
  );
}

export default function Market() {
  return (
    <section className="s-tint py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="Market Opportunity" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          430K missionaries. No one built for them.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          The gap between digital opportunity and field reality is structural — and no organization has closed it. That&apos;s the market.
        </p>
      </RevealWrapper>

      {/* Funnel */}
      <div className="flex flex-col gap-[5px] mt-[5.5vh]">
        {[
          { cls: "outer", label: "TAM", n: "430K", tag: "Missionaries globally", desc: "Across every denomination, field, and sending agency. Zero platforms built with their digital reality in mind.", pill: "bg-[rgba(0,92,232,.08)] text-blue border border-[rgba(0,92,232,.18)]" },
          { cls: "mid", label: "SAM", n: "~65K", tag: "US-affiliated sending missions", desc: "Deputation-model missionaries, and agencies with active digital communication expectations for their field workers.", pill: "bg-[rgba(255,107,53,.1)] text-coral border border-[rgba(255,107,53,.22)]" },
          { cls: "inner", label: "Beachhead", n: "30", tag: "First cohort · Launch 2026", desc: "Prove the model. Expand from there.", pill: "bg-coral text-white border-none shadow-[0_2px_10px_rgba(255,107,53,.28)]" },
        ].map((row, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div
              className={`py-[2.8vh] rounded-[18px] grid items-center gap-[2.4vw] ${
                i === 0
                  ? "px-[2.8vw] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_12px_rgba(28,31,46,.05)]"
                  : i === 1
                  ? "px-[2.8vw] mx-[2vw] bg-[#F5F1EC] border border-[rgba(28,31,46,.12)] shadow-[0_2px_14px_rgba(28,31,46,.06)]"
                  : "px-[2.8vw] mx-[4vw] bg-[var(--sand)] border border-[rgba(255,107,53,.2)] shadow-[0_4px_28px_rgba(255,107,53,.1)]"
              }`}
              style={{ gridTemplateColumns: "auto 1fr auto" }}
            >
              <div className="font-display text-[clamp(24px,2.8vw,44px)] font-bold tracking-[-0.03em] whitespace-nowrap text-ink">{row.n}</div>
              <div className="flex flex-col gap-[.4vh]">
                <div className="font-mono text-[10px] tracking-[.24em] uppercase text-[var(--text-muted)]">{row.label}</div>
                <div className="font-body text-[clamp(13px,1.02vw,15px)] leading-[1.5] text-[var(--text-mid)]">
                  <strong className="font-medium text-ink">{row.tag}</strong> — {row.desc}
                </div>
              </div>
              <span className={`inline-block py-1 px-3 rounded-full font-mono text-[10px] tracking-[.18em] uppercase whitespace-nowrap ${row.pill}`}>
                {row.label}
              </span>
            </div>
          </RevealWrapper>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.4vw] mt-[5vh]">
        {stats.map((s, i) => (
          <StatBox key={i} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
