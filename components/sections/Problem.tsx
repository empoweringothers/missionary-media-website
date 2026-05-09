"use client";

import { Monitor, Shield, Globe, Users } from "lucide-react";
import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function Problem() {
  return (
    <section id="problem" className="s-mid py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="The Story" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          Two faithful missionaries. <em className="gt">Different</em> outcomes.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          Same calling. Same faithfulness. One had a system. One didn&apos;t.
        </p>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.8vw] mt-[5vh]">
        {/* Pastor Wilder */}
        <RevealWrapper delay={0}>
          <div className="bg-white border border-[rgba(28,31,46,.1)] rounded-[24px] overflow-hidden shadow-[0_2px_16px_rgba(28,31,46,.06)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(28,31,46,.12)] transition-all duration-[220ms]">
            <div className="h-[clamp(180px,22vh,240px)] relative overflow-hidden flex items-end" style={{background:"linear-gradient(145deg,rgba(15,30,60,.92) 0%,rgba(0,80,180,.35) 55%,rgba(0,140,220,.18) 100%)"}}>
              <svg className="absolute inset-0 w-full h-full opacity-[.15]" viewBox="0 0 400 240" fill="none">
                <ellipse cx="200" cy="120" rx="180" ry="100" stroke="rgba(0,196,249,1)" strokeWidth="0.5"/>
                <ellipse cx="200" cy="120" rx="130" ry="70" stroke="rgba(0,196,249,1)" strokeWidth="0.5"/>
                <ellipse cx="200" cy="120" rx="80" ry="40" stroke="rgba(0,196,249,1)" strokeWidth="0.5"/>
              </svg>
              <div className="px-4 pb-3.5 font-mono text-[10px] tracking-[.2em] uppercase opacity-[.42] w-full" style={{background:"linear-gradient(0deg,rgba(15,30,60,.8) 0%,transparent 100%)",color:"#fff"}}>
                Pastor Wilder · Guatemala
              </div>
            </div>
            <div className="p-[1.8rem]">
              <div className="inline-flex items-center gap-1.5 bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.18)] rounded-full py-1 px-3 mb-[1.2rem] font-mono text-[11px] tracking-[.2em] uppercase text-blue">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Pastor Wilder · Guatemala
              </div>
              <h3 className="font-display text-[clamp(16px,1.5vw,22px)] font-normal leading-[1.25] text-ink mb-3">
                Started building a website. Had the instinct. Had the calling.
              </h3>
              <p className="font-body text-[clamp(13px,1vw,15px)] leading-[1.6] text-[var(--text-mid)] mb-3">
                Spent weeks on it. Then stopped — health concerns, ministry to people in front of him, family. He hasn&apos;t touched digital outreach since.
              </p>
              <p className="font-mono text-[11px] tracking-[.1em] text-[var(--text-muted)] italic">
                Not failure. Stewardship of finite time — with no system to hold it.
              </p>
            </div>
          </div>
        </RevealWrapper>

        {/* Russell Gibson */}
        <RevealWrapper delay={0.1}>
          <div className="bg-[#FFF8F4] border border-[rgba(255,107,53,.18)] rounded-[24px] overflow-hidden shadow-[0_2px_16px_rgba(255,107,53,.06)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(28,31,46,.12)] transition-all duration-[220ms]">
            <div className="h-[clamp(180px,22vh,240px)] relative overflow-hidden flex items-end" style={{background:"linear-gradient(145deg,rgba(60,20,5,.92) 0%,rgba(200,80,10,.28) 55%,rgba(255,107,53,.16) 100%)"}}>
              <svg className="absolute inset-0 w-full h-full opacity-[.15]" viewBox="0 0 400 240" fill="none">
                <ellipse cx="200" cy="120" rx="180" ry="100" stroke="rgba(255,107,53,1)" strokeWidth="0.5"/>
                <ellipse cx="200" cy="120" rx="130" ry="70" stroke="rgba(255,107,53,1)" strokeWidth="0.5"/>
                <ellipse cx="200" cy="120" rx="80" ry="40" stroke="rgba(255,107,53,1)" strokeWidth="0.5"/>
              </svg>
              <div className="px-4 pb-3.5 font-mono text-[10px] tracking-[.2em] uppercase opacity-[.42] w-full" style={{background:"linear-gradient(0deg,rgba(60,20,5,.8) 0%,transparent 100%)",color:"#fff"}}>
                Russell Gibson · Australia
              </div>
            </div>
            <div className="p-[1.8rem]">
              <div className="inline-flex items-center gap-1.5 bg-[rgba(255,107,53,.1)] border border-[rgba(255,107,53,.22)] rounded-full py-1 px-3 mb-[1.2rem] font-mono text-[11px] tracking-[.2em] uppercase text-coral">
                Russell Gibson · Australia
              </div>
              <h3 className="font-display text-[clamp(16px,1.5vw,22px)] font-normal leading-[1.25] text-ink mb-3">
                Still posting. Still sending updates. Still faithful with the time.
              </h3>
              <blockquote className="font-display text-[clamp(14px,1.2vw,18px)] font-light italic leading-[1.55] text-ink border-l-4 border-coral pl-4 bg-[rgba(255,107,53,.06)] py-3 pr-3 rounded-r-[var(--r)]">
                &ldquo;I&apos;m the missionary putting out the content my supporting pastors are going to see.&rdquo;
              </blockquote>
              <p className="font-mono text-[11px] tracking-[.18em] uppercase text-[var(--text-muted)] mt-3">
                Russell Gibson · Field Missionary, Church Planting, Australia · MM Interview
              </p>
            </div>
          </div>
        </RevealWrapper>
      </div>

      {/* Why Help Doesn't Stick */}
      <div className="mt-[6vh]">
        <RevealWrapper>
          <ChapterBar text="Why Help Doesn't Stick" />
          <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
            The advice they get is built for someone else entirely.
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[2vw] mt-[4.5vh]">
          {[
            { icon: <Monitor size={20} stroke="#005BE8" />, title: "Corporate marketers", desc: "US-suburb playbooks, broadband assumed. Doesn't translate to a phone in East Africa or limited Wi-Fi in Central Asia." },
            { icon: <Shield size={20} stroke="#005BE8" />, title: "Security ignored", desc: "Visa scans, restricted-access regions, digital footprint risk — treated as a footnote, not a first-class concern." },
            { icon: <Globe size={20} stroke="#005BE8" />, title: "\"Big box American\"", desc: "Tactics designed for a US context don't cross cultures — and missionaries know it. They try once, it fails, they put it down." },
            { icon: <Users size={20} stroke="#005BE8" />, title: "No missionary peers", desc: "Generic coaching is unscalable and disconnected from field reality. Missionaries need community, not just content." },
          ].map((cap, i) => (
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

        <RevealWrapper className="mt-[4vh]">
          <div className="py-[2.4rem] px-[3rem] rounded-r-[var(--r)] bg-[#FFF8F4] border border-[rgba(255,107,53,.16)] border-l-4 border-l-coral">
            <blockquote className="font-display text-[clamp(16px,1.7vw,24px)] font-medium leading-[1.52] italic mb-[1.2rem] text-ink">
              &ldquo;Big box American outreach methods don&apos;t translate.&rdquo;
            </blockquote>
            <cite className="font-mono text-[11px] tracking-[.22em] uppercase text-[var(--text-muted)] not-italic">
              Austin Reed · <strong className="text-[var(--text-mid)] font-medium">Field Missionary, Southeast Asia</strong> · MM Interview
            </cite>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
