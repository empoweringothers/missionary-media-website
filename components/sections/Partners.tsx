"use client";

import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const partners = [
  { name: "Valley Forge", role: "Organizational Partner", desc: "Structured partnership providing organizational credibility, missionary network access, and cohort recruitment pipeline.", status: "Active", live: true },
  { name: "Adobe", role: "Tool Partner · In Negotiation", desc: "Creative tools for missionaries producing digital ministry content — discounted access as part of the sponsored toolkit.", status: "Negotiating", live: false },
  { name: "ProPresenter", role: "Tool Partner · In Negotiation", desc: "Presentation software widely used in church contexts — field-accessible version for missionaries in the cohort.", status: "Negotiating", live: false },
  { name: "Planning Center", role: "Tool Partner · In Negotiation", desc: "Church management software with missionary applicability for team coordination and supporter communication.", status: "Negotiating", live: false },
];

export default function Partners() {
  return (
    <section className="s-mid py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="Partners & Endorsements" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          The relationships already in motion.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          These aren&apos;t aspirational logos. They&apos;re active partnerships, structured agreements, and negotiations in progress — credibility you can call and verify.
        </p>
      </RevealWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[2vw] mt-[5vh]">
        {partners.map((p, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="rounded-[var(--r)] p-8 pb-[2rem] bg-white border border-[rgba(28,31,46,.1)] shadow-[0_2px_12px_rgba(28,31,46,.05)] flex flex-col gap-[.9rem] hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(28,31,46,.1)] transition-all duration-[220ms]">
              <div className="font-display text-[clamp(14px,1.2vw,18px)] font-bold text-ink">{p.name}</div>
              <div className="font-mono text-[10px] tracking-[.22em] uppercase text-[var(--text-muted)]">{p.role}</div>
              <p className="font-body text-[clamp(12px,.9vw,14px)] leading-[1.5] text-[var(--text-mid)] flex-1">{p.desc}</p>
              <span className={`inline-block mt-auto py-[3px] px-2.5 rounded-full font-mono text-[10px] tracking-[.18em] uppercase ${
                p.live
                  ? "bg-[rgba(0,92,232,.08)] text-blue border border-[rgba(0,92,232,.2)]"
                  : "bg-[rgba(255,107,53,.1)] text-coral border border-[rgba(255,107,53,.22)]"
              }`}>
                {p.status}
              </span>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
