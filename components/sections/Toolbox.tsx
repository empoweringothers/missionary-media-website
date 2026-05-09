"use client";

import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const cards = [
  {
    step: "01 · Start",
    headline: "Know where to start.",
    desc: "Stop guessing. Get the path that works for missionaries — your budget, your device, your field.",
    items: ["Curated tool library", "Starter path — your first 3 moves", "Gear lists by budget", "Phone & tablet kits"],
    future: false,
    badge: null,
    anim: (
      <svg viewBox="0 0 130 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px]">
        <line className="tb-seg1" x1="46" y1="18" x2="46" y2="44" stroke="#005BE8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="52" strokeDashoffset="52"/>
        <line className="tb-seg2" x1="46" y1="44" x2="46" y2="70" stroke="#005BE8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="52" strokeDashoffset="52"/>
        <circle className="tb-d1" cx="46" cy="18" r="5" fill="rgba(0,92,232,.2)"/>
        <circle className="tb-d2" cx="46" cy="44" r="5" fill="rgba(0,92,232,.2)"/>
        <circle className="tb-d3" cx="46" cy="70" r="5" fill="rgba(0,92,232,.2)"/>
        <text x="58" y="22" fontFamily="ui-monospace,monospace" fontSize="8" fill="rgba(28,31,46,.4)" letterSpacing=".8">TOOLS</text>
        <text x="58" y="48" fontFamily="ui-monospace,monospace" fontSize="8" fill="rgba(28,31,46,.4)" letterSpacing=".8">FIRST 3</text>
        <text x="58" y="74" fontFamily="ui-monospace,monospace" fontSize="8" fill="rgba(28,31,46,.4)" letterSpacing=".8">GEAR</text>
      </svg>
    ),
  },
  {
    step: "02 · Ship",
    headline: "Make it. Send it. Move on.",
    desc: "One piece of work reaches every supporter — without eating your week.",
    items: ["Content templates", "Supporter automation", "Batch-recording playbook", "Integrations — Mailchimp, Buffer, Canva, Substack"],
    future: false,
    badge: null,
    anim: (
      <svg viewBox="0 0 142 102" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px]">
        <g className="tb-fan-tl">
          <rect x="16" y="20" width="34" height="24" rx="4" fill="rgba(0,92,232,.07)" stroke="rgba(0,92,232,.25)" strokeWidth="1"/>
          <text x="20" y="36" fontFamily="Arial,sans-serif" fontSize="12" fill="rgba(0,92,232,.55)">✉</text>
        </g>
        <g className="tb-fan-tr">
          <rect x="92" y="20" width="34" height="24" rx="4" fill="rgba(232,112,42,.08)" stroke="rgba(232,112,42,.28)" strokeWidth="1"/>
          <text x="97" y="36" fontFamily="Arial,sans-serif" fontSize="12" fill="rgba(232,112,42,.65)">▶</text>
        </g>
        <g className="tb-fan-b">
          <rect x="54" y="68" width="34" height="24" rx="4" fill="rgba(0,92,232,.06)" stroke="rgba(0,92,232,.2)" strokeWidth="1"/>
          <text x="60" y="84" fontFamily="Arial,sans-serif" fontSize="12" fill="rgba(0,92,232,.5)">💬</text>
        </g>
        <g className="tb-stamp-ctr">
          <rect x="54" y="34" width="34" height="26" rx="5" fill="rgba(255,107,53,.1)" stroke="rgba(255,107,53,.38)" strokeWidth="1.5"/>
          <rect x="60" y="40" width="22" height="2.5" rx="1.2" fill="rgba(255,107,53,.45)"/>
          <rect x="60" y="46" width="16" height="2.5" rx="1.2" fill="rgba(255,107,53,.28)"/>
        </g>
      </svg>
    ),
  },
  {
    step: "03 · Backup",
    headline: "Don't do it alone.",
    desc: "Real coaching, real peers in your region, real tech help that knows your context.",
    items: ["1:1 coaching sessions", "Regional peer cohort", "Monthly office hours", "90-day setup support"],
    future: false,
    badge: null,
    anim: (
      <svg viewBox="0 0 130 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px]">
        <circle className="tb-ctr-dot" cx="65" cy="44" r="8" fill="#005BE8" opacity="0.72"/>
        <line className="tb-c1" x1="65" y1="44" x2="30" y2="18" stroke="#005BE8" strokeWidth="1.2" strokeDasharray="60" strokeDashoffset="60"/>
        <line className="tb-c2" x1="65" y1="44" x2="100" y2="18" stroke="#005BE8" strokeWidth="1.2" strokeDasharray="60" strokeDashoffset="60"/>
        <line className="tb-c3" x1="65" y1="44" x2="65" y2="76" stroke="#005BE8" strokeWidth="1.2" strokeDasharray="60" strokeDashoffset="60"/>
        <circle className="tb-p1" cx="30" cy="18" r="6" fill="rgba(0,92,232,.3)" opacity="0"/>
        <circle className="tb-p2" cx="100" cy="18" r="6" fill="rgba(0,92,232,.3)" opacity="0"/>
        <circle className="tb-p3" cx="65" cy="76" r="6" fill="rgba(0,92,232,.3)" opacity="0"/>
      </svg>
    ),
  },
  {
    step: "04 · Multiply",
    headline: "Train your team in their language.",
    desc: "Hand the work off. Multiply through a layman, a national pastor, or a teenager.",
    items: ["Multilingual layman course", "Volunteer onboarding kit", "Translated playbooks", "Handoff checklists"],
    future: true,
    badge: "Coming 2028",
    anim: (
      <svg viewBox="0 0 130 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px]">
        <g className="tb-book-es">
          <rect x="18" y="26" width="32" height="40" rx="4" fill="rgba(255,107,53,.08)" stroke="rgba(255,107,53,.28)" strokeWidth="1"/>
          <text x="24" y="50" fontFamily="ui-monospace,monospace" fontSize="9" fill="rgba(255,107,53,.5)">ES</text>
        </g>
        <g className="tb-book-ro">
          <rect x="18" y="22" width="32" height="40" rx="4" fill="rgba(232,112,42,.08)" stroke="rgba(232,112,42,.28)" strokeWidth="1"/>
          <text x="24" y="46" fontFamily="ui-monospace,monospace" fontSize="9" fill="rgba(232,112,42,.5)">RO</text>
        </g>
        <rect x="58" y="24" width="32" height="40" rx="4" fill="rgba(0,92,232,.08)" stroke="rgba(0,92,232,.25)" strokeWidth="1.5"/>
        <text x="64" y="48" fontFamily="ui-monospace,monospace" fontSize="9" fill="rgba(0,92,232,.55)">EN</text>
      </svg>
    ),
  },
];

export default function Toolbox() {
  return (
    <section id="toolbox" className="s-mid py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="What's in the Toolbox" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          Built for the missionary&apos;s<br /><em className="gt">actual reality.</em>
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          Not a course catalog. Not a software pitch. The specific tools, templates, and people that turn digital from &ldquo;one more thing&rdquo; into multiplied ministry.
        </p>
      </RevealWrapper>

      <div className="grid gap-[2vw] mt-[5vh] grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div
              className={`rounded-[20px] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_16px_rgba(28,31,46,.06)] flex flex-col overflow-hidden transition-all duration-[250ms] hover:-translate-y-[5px] hover:shadow-[0_16px_48px_rgba(28,31,46,.12)] relative ${card.future ? "opacity-[.84]" : ""}`}
            >
              {card.badge && (
                <span className="absolute top-4 right-4 z-[2] py-1 px-2.5 rounded-full bg-[rgba(28,31,46,.07)] border border-[rgba(28,31,46,.18)] font-mono text-[9px] tracking-[.22em] uppercase text-[var(--text-muted)] whitespace-nowrap">
                  {card.badge}
                </span>
              )}
              <div className="p-[1.8rem] flex-none">
                <div className="font-mono text-[10px] tracking-[.28em] uppercase text-blue mb-[.9rem]">{card.step}</div>
                <h3 className="font-display text-[clamp(16px,1.4vw,21px)] font-semibold tracking-[-0.02em] leading-[1.18] mb-2 text-ink">{card.headline}</h3>
                <p className="font-body text-[clamp(12px,.88vw,14px)] leading-[1.6] text-[var(--text-mid)] mb-[1.1rem]">{card.desc}</p>
                <ul className="list-none flex flex-col gap-[.45rem]">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-[.55rem] font-body text-[clamp(11.5px,.85vw,13.5px)] leading-[1.4] text-[var(--text-main)] font-medium">
                      <span className="shrink-0 w-3.5 h-3.5 rounded-[4px] bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.22)] inline-flex items-center justify-center mt-[1px]">
                        <svg viewBox="0 0 8 6" width="7" height="7" stroke="#005BE8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1,3.2 3,5.2 7,1"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 min-h-[120px] border-t border-[rgba(28,31,46,.07)] bg-[rgba(28,31,46,.016)] flex items-center justify-center overflow-hidden p-4">
                {card.anim}
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
