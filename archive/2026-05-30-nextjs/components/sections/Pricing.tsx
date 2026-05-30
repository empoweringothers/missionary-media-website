"use client";

import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function Pricing() {
  return (
    <section id="sponsor" className="s-deep py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="Three Ways to Join" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          Pick the level that fits where you are.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          One missionary is the floor. Five anchors a region. Thirty makes you the founding partner of the entire first cohort.
        </p>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.4vw] mt-[5vh]">
        {/* Tier 1 */}
        <RevealWrapper delay={0}>
          <div className="rounded-[24px] p-[2.4rem] bg-white border border-[rgba(28,31,46,.1)] flex flex-col gap-[1.4rem] shadow-[0_2px_16px_rgba(28,31,46,.06)] hover:-translate-y-[5px] hover:shadow-[0_16px_52px_rgba(28,31,46,.12)] transition-all duration-[250ms]">
            <span className="font-mono text-[11px] tracking-[.26em] uppercase text-[var(--text-muted)]">Sponsor one missionary</span>
            <div className="font-display font-normal text-[clamp(34px,3.6vw,50px)] tracking-[-0.025em] leading-[1] text-ink">
              $65<span className="text-[.4em] font-normal text-[var(--text-muted)]">/mo</span>
            </div>
            <hr className="h-px bg-[linear-gradient(90deg,transparent,rgba(28,31,46,.12),transparent)] border-none" />
            <p className="font-body text-[clamp(13px,1vw,15px)] leading-[1.62] text-[var(--text-mid)]">
              Fund one missionary&apos;s first year completely. 12 months · full course access · 1:1 coaching · quarterly story updates · direct connection where security allows.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2.5 text-[var(--text-mid)] font-body font-medium border border-[rgba(28,31,46,.18)] rounded-full py-3.5 px-7 cursor-pointer no-underline transition-all duration-[220ms] bg-transparent hover:text-ink hover:border-[rgba(255,107,53,.45)] hover:bg-[rgba(255,107,53,.07)]" style={{ fontSize: "clamp(14px,1vw,15px)" }}>
              Schedule a call
            </a>
          </div>
        </RevealWrapper>

        {/* Tier 2 — featured */}
        <RevealWrapper delay={0.1}>
          <div className="tier-card-feat rounded-[24px] p-[2.4rem] bg-[linear-gradient(145deg,rgba(0,92,232,.05),rgba(0,92,232,.02))] border border-[rgba(0,92,232,.24)] flex flex-col gap-[1.4rem] shadow-[0_8px_40px_rgba(0,92,232,.12)] hover:-translate-y-[5px] hover:shadow-[0_16px_52px_rgba(0,92,232,.2)] transition-all duration-[250ms]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[.26em] uppercase text-[var(--text-muted)]">Anchor a region</span>
              <span className="inline-block py-1 px-3 rounded-full font-mono text-[10px] tracking-[.2em] uppercase bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.2)] text-blue">Most impactful</span>
            </div>
            <div className="font-display font-normal text-[clamp(34px,3.6vw,50px)] tracking-[-0.025em] leading-[1] text-ink">
              $325<span className="text-[.4em] font-normal text-[var(--text-muted)]">/mo</span>
            </div>
            <hr className="h-px bg-[linear-gradient(90deg,transparent,rgba(28,31,46,.12),transparent)] border-none" />
            <p className="font-body text-[clamp(13px,1vw,15px)] leading-[1.62] text-[var(--text-mid)]">
              Sponsor a regional cohort of 5 missionaries. Named regional anchor status · group impact reports · annual video · five lives directly equipped.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2.5 bg-coral text-white font-body font-semibold tracking-[.01em] border-none rounded-full py-3.5 px-7 cursor-pointer no-underline transition-all duration-[220ms] shadow-[0_6px_30px_rgba(255,107,53,.4)] hover:-translate-y-0.5 hover:bg-orange hover:shadow-[0_12px_44px_rgba(255,107,53,.52)]" style={{ fontSize: "clamp(14px,1vw,15px)" }}>
              Schedule a call
            </a>
          </div>
        </RevealWrapper>

        {/* Tier 3 */}
        <RevealWrapper delay={0.2}>
          <div className="rounded-[24px] p-[2.4rem] bg-[#FFF8F4] border border-[rgba(255,107,53,.22)] flex flex-col gap-[1.4rem] shadow-[0_2px_16px_rgba(28,31,46,.06)] hover:-translate-y-[5px] hover:shadow-[0_16px_52px_rgba(255,107,53,.12)] transition-all duration-[250ms]">
            <span className="font-mono text-[11px] tracking-[.26em] uppercase text-[var(--text-muted)]">Found the cohort</span>
            <div className="font-display font-normal text-[clamp(34px,3.6vw,50px)] tracking-[-0.025em] leading-[1] text-ink">
              $23.4K<span className="text-[.4em] font-normal text-[var(--text-muted)]"> one-time</span>
            </div>
            <hr className="h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,53,.18),transparent)] border-none" />
            <p className="font-body text-[clamp(13px,1vw,15px)] leading-[1.62] text-[var(--text-mid)]">
              Underwrite the full 30-missionary launch. Founding partner status · advisory seat option · on-site reporting invite · 501(c)(3) charitable deduction.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2.5 text-coral font-body font-medium border border-[rgba(255,107,53,.32)] rounded-full py-3.5 px-7 cursor-pointer no-underline transition-all duration-[220ms] bg-transparent hover:bg-[rgba(255,107,53,.07)] hover:border-coral" style={{ fontSize: "clamp(14px,1vw,15px)" }}>
              Schedule a call
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
