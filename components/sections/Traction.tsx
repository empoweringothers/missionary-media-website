"use client";

import { Check, Loader } from "lucide-react";
import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const proofTiles = [
  { done: true, n: "10", label: "Missionary Interviews", detail: "Across Guatemala, Australia, Southeast Asia, East Africa, and domestic deputation. First-term, veteran, and restricted-access missionaries all represented." },
  { done: true, n: "3", label: "VOC Research Studies", detail: "Voice of Customer studies confirming the gap. Missio Nexus data, independent surveys, and field coach interviews triangulate the same finding." },
  { done: false, n: "2", label: "Active Pilots", detail: "Davide (field missionary) and Brian Nibbe (deputation) are testing the framework in real conditions — tool recommendations, coaching, and field security protocols." },
  { done: true, n: "✓", label: "Pricing Validated", detail: "$65/month confirmed viable through missionary income research, sending agency affordability surveys, and sponsor willingness-to-pay conversations." },
  { done: true, n: "✓", label: "Brand Identity Live", detail: "Full brand system built: logo, palette, typography, voice. Website, pitch materials, and sponsor deck complete. Ready to present today." },
  { done: false, n: "✓", label: "Valley Forge Partnership", detail: "Structured partnership establishing organizational credibility and access to a missionary network for cohort recruitment." },
];

export default function Traction() {
  return (
    <section id="traction" className="s-deep py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="Proof" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          The foundation is built. The launch is what&apos;s next.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          This isn&apos;t an idea. It&apos;s 18 months of research, interviews, pilots, and validated assumptions — before a single dollar of launch capital was raised.
        </p>
      </RevealWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[2vw] mt-[5vh]">
        {proofTiles.map((tile, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className={`rounded-[var(--r)] p-[2.2rem] border flex flex-col gap-[1.2rem] transition-all duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(28,31,46,.1)] shadow-[0_2px_14px_rgba(28,31,46,.06)] ${
              !tile.done ? "border-[rgba(255,107,53,.22)] bg-[#FFF8F4]" : "border-[rgba(28,31,46,.1)] bg-white"
            }`}>
              <div className={`w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 ${
                tile.done
                  ? "bg-[rgba(0,92,232,.08)] border border-[rgba(0,92,232,.18)]"
                  : "bg-[rgba(255,107,53,.1)] border border-[rgba(255,107,53,.24)]"
              }`}>
                {tile.done
                  ? <Check size={16} stroke="#005BE8" strokeWidth={2} />
                  : <Loader size={16} stroke="#FF6B35" strokeWidth={2} className="animate-spin" />
                }
              </div>
              <div className="font-display text-[clamp(32px,3.5vw,50px)] font-bold tracking-[-0.03em] leading-[1] text-ink">{tile.n}</div>
              <div className="font-display text-[clamp(14px,1.1vw,17px)] font-semibold text-ink">{tile.label}</div>
              <p className="font-body text-[clamp(12px,.9vw,14px)] leading-[1.55] text-[var(--text-mid)]">{tile.detail}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>

      <RevealWrapper className="mt-[4vh]">
        <div className="py-[2.4rem] px-[3rem] rounded-r-[var(--r)] bg-[#FFF8F4] border border-[rgba(255,107,53,.16)] border-l-4 border-l-coral">
          <blockquote className="font-display text-[clamp(16px,1.7vw,24px)] font-medium leading-[1.52] italic mb-[1.2rem] text-ink">
            &ldquo;Investing now is investing in the launch — not in scale. That changes who this is for. We&apos;re inviting you into the launch itself.&rdquo;
          </blockquote>
          <cite className="font-mono text-[11px] tracking-[.22em] uppercase text-[var(--text-muted)] not-italic">
            Tabor Normoyle · <strong className="text-[var(--text-mid)] font-medium">Founder, Missionary Media</strong>
          </cite>
        </div>
      </RevealWrapper>
    </section>
  );
}
