"use client";

import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function Treasure() {
  return (
    <section className="s-warm py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="The Framework" variant="warm" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          Treasure Transplanting.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          When you sponsor a missionary&apos;s digital fluency, you&apos;re not writing a check to a cause. You&apos;re moving earthly resources into work that wouldn&apos;t have happened without you.
        </p>
      </RevealWrapper>

      <RevealWrapper className="flex items-stretch gap-[2.4vw] mt-[5vh] flex-col md:flex-row">
        {[
          {
            icon: (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="#00C4F9" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ),
            title: "Earthly resource",
            desc: "Your monthly giving, redirected intentionally",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="#00C4F9" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>
              </svg>
            ),
            title: "Missionary's calling",
            desc: "Equipped, sustained, multiplied",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="#F63600" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
            ),
            title: "Multiplied impact",
            desc: "Work that lasts — through them and beyond them",
          },
        ].map((node, i) => (
          <div key={i} className={`flex-1 rounded-[var(--r)] p-[2.4rem] flex flex-col items-center gap-[1.4rem] text-center ${
            i === 0 ? "bg-white border border-[rgba(28,31,46,.1)]" : i === 1 ? "bg-white border border-[rgba(28,31,46,.1)]" : "bg-[#FFF8F4] border border-[rgba(255,107,53,.18)]"
          }`}>
            <div className={`w-[50px] h-[50px] rounded-[13px] flex items-center justify-center ${
              i < 2 ? "bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.16)]" : "bg-[rgba(255,107,53,.08)] border border-[rgba(255,107,53,.2)]"
            }`}>
              {node.icon}
            </div>
            <h3 className="font-display text-[clamp(14px,1.28vw,18px)] font-semibold text-ink">{node.title}</h3>
            <p className="font-body text-[clamp(12px,.92vw,14px)] leading-[1.5] text-[var(--text-mid)]">{node.desc}</p>
          </div>
        ))}
      </RevealWrapper>

      <RevealWrapper className="mt-[4vh]">
        <div className="py-[2.4rem] px-[3rem] rounded-r-[var(--r)] bg-[#FFF8F4] border border-[rgba(255,107,53,.16)] border-l-4 border-l-coral">
          <blockquote className="font-display text-[clamp(16px,1.7vw,24px)] font-medium leading-[1.52] italic mb-[1.2rem] text-ink">
            &ldquo;When you sponsor a missionary&apos;s calling, you&apos;re not writing a check to a cause. You&apos;re moving earthly resources into eternal work that wouldn&apos;t have happened without you.&rdquo;
          </blockquote>
          <cite className="font-mono text-[11px] tracking-[.22em] uppercase text-[var(--text-muted)] not-italic">
            Steve Shadrach · <strong className="text-[var(--text-mid)] font-medium">Treasure Transplanting</strong>
          </cite>
        </div>
      </RevealWrapper>

      <RevealWrapper className="mt-[4vh]">
        <p className="text-center font-display text-[clamp(15px,1.3vw,19px)] italic text-[var(--text-muted)]">
          &ldquo;Where your treasure is, there your heart will be also.&rdquo; — Luke 12:34
        </p>
      </RevealWrapper>
    </section>
  );
}
