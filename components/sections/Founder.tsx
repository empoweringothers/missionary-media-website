"use client";

import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function Founder() {
  return (
    <section className="s-deep py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="The Founder" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          Operators fund operators. Here&apos;s who you&apos;re backing.
        </h2>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-[5vw] mt-[5vh] items-start">
        <RevealWrapper>
          <div>
            <h3 className="font-display text-[clamp(26px,2.8vw,42px)] font-normal tracking-[-0.02em] leading-[1.1] mb-[.4vh] text-ink">Tabor Normoyle</h3>
            <p className="font-mono text-[12px] tracking-[.26em] uppercase text-[var(--text-muted)] mb-[2vh]">Founder · Missionary Media</p>
            <p className="font-body text-[clamp(14px,1.1vw,17px)] leading-[1.72] text-[var(--text-mid)] mb-[1.6vh]">
              Tabor has spent years building digital systems for businesses and brands — the kind that actually hold under pressure. When he sat down with missionaries and asked what digital help looked like for them, the answer was consistent: the advice exists, but none of it fits.
            </p>
            <p className="font-body text-[clamp(14px,1.1vw,17px)] leading-[1.72] text-[var(--text-mid)] mb-[1.6vh]">
              After 10 missionary interviews across five countries, three independent research studies, and two active pilots, the pattern became undeniable. Missionaries aren&apos;t failing digitally because they lack motivation. They lack a system built for their reality: low bandwidth, security constraints, cross-cultural context, and the stewardship of finite time.
            </p>
            <p className="font-body text-[clamp(14px,1.1vw,17px)] leading-[1.72] text-[var(--text-mid)] mb-[1.6vh]">
              Missionary Media is the result — not a course, not software, but a translator organization. Context-aware education, tested-and-true tools, 1:1 coaching, and a community of missionaries helping each other. Tabor leads it. He&apos;s also its first and longest-standing researcher.
            </p>
            <p className="font-mono text-[12px] tracking-[.14em] text-[var(--text-muted)]">
              missionarymediahub@gmail.com &nbsp;|&nbsp; missionarymedia.org
            </p>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="rounded-[24px] overflow-hidden relative bg-[linear-gradient(145deg,rgba(15,30,60,.92)_0%,rgba(0,80,180,.32)_50%,rgba(232,112,42,.18)_100%)] flex items-end justify-start p-[1.4rem] min-h-[280px] mb-[1.4vh]">
            <svg className="absolute inset-0 w-full h-full opacity-[.15]" viewBox="0 0 280 280" fill="none">
              <ellipse cx="140" cy="140" rx="130" ry="110" stroke="rgba(0,196,249,1)" strokeWidth="0.5"/>
              <ellipse cx="140" cy="140" rx="90" ry="75" stroke="rgba(0,196,249,1)" strokeWidth="0.5"/>
              <ellipse cx="140" cy="140" rx="50" ry="40" stroke="rgba(0,196,249,1)" strokeWidth="0.5"/>
            </svg>
            <span className="font-mono text-[10px] tracking-[.2em] uppercase opacity-[.42] text-white">Photo · Tabor Normoyle · Founder</span>
          </div>
          <div className="flex flex-col gap-[1.4vh]">
            {[
              { n: "10", l: "Missionary interviews" },
              { n: "18 mo", l: "Research before capital" },
              { n: "5", l: "Countries represented" },
            ].map((s, i) => (
              <div key={i} className="p-[1.6vh_1.8vw] rounded-[14px] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_10px_rgba(28,31,46,.05)] flex flex-col gap-[.4vh]">
                <div className="font-display text-[clamp(22px,2.3vw,34px)] font-bold tracking-[-0.03em] text-ink">{s.n}</div>
                <div className="font-mono text-[11px] tracking-[.2em] uppercase text-[var(--text-muted)]">{s.l}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
