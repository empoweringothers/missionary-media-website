"use client";

import ChapterBar from "@/components/ui/ChapterBar";
import RevealWrapper from "@/components/ui/RevealWrapper";

const rows: { name: string; field: boolean | "partial"; security: boolean | "partial"; phone: boolean | "partial"; coaching: boolean | "partial"; highlight?: boolean }[] = [
  { name: "Mission agencies",                 field: "partial", security: false, phone: false, coaching: false },
  { name: "Generic online courses",           field: false,     security: false, phone: false, coaching: false },
  { name: "Christian software (Pushpay, PC)", field: false,     security: false, phone: false, coaching: false },
  { name: "Individual coaches",               field: "partial", security: false, phone: false, coaching: true },
  { name: "Missionary Media",                 field: true,      security: true,  phone: true,  coaching: true, highlight: true },
];

function Dot({ val }: { val: boolean | "partial" }) {
  if (val === "partial") return (
    <div className="w-5 h-5 rounded-full bg-[rgba(255,107,53,.1)] border-2 border-[rgba(255,107,53,.3)] flex items-center justify-center mx-auto">
      <div className="w-2 h-1 rounded-[2px] bg-coral" />
    </div>
  );
  if (val) return (
    <div className="w-5 h-5 rounded-full bg-[rgba(0,92,232,.1)] border-2 border-blue flex items-center justify-center mx-auto">
      <div className="w-2 h-2 rounded-full bg-blue" />
    </div>
  );
  return <div className="w-5 h-5 rounded-full bg-[rgba(28,31,46,.04)] border-2 border-[rgba(28,31,46,.18)] mx-auto" />;
}

export default function Competitive() {
  return (
    <section className="s-mid py-[96px] px-[7vw]">
      <RevealWrapper>
        <ChapterBar text="Why It Hasn't Been Solved" />
        <h2 className="font-display font-light text-[clamp(30px,3.8vw,58px)] leading-[1.08] tracking-[-0.022em] mb-[1.8vh] text-ink">
          Every existing solution was built for someone else.
        </h2>
        <p className="font-body text-[clamp(15px,1.28vw,19px)] leading-[1.68] max-w-[54vw] text-[var(--text-mid)]">
          The gap exists not because no one cares — but because no one has combined the right expertise, context, and access to close it.
        </p>
      </RevealWrapper>

      <RevealWrapper className="mt-[5vh] border border-[rgba(28,31,46,.1)] rounded-[var(--r)] overflow-hidden shadow-[0_2px_16px_rgba(28,31,46,.06)]">
        {/* Header */}
        <div className="grid bg-[var(--sand)] px-[2.2vw] py-[1.8vh] border-b border-[rgba(28,31,46,.1)]" style={{ gridTemplateColumns: "2fr repeat(4,1fr)" }}>
          {["Solution", "Field Context", "Security-First", "Phone-First", "1:1 Coaching"].map((h, i) => (
            <span key={i} className={`font-mono text-[10px] tracking-[.24em] uppercase text-[var(--text-muted)] ${i > 0 ? "text-center" : ""}`}>{h}</span>
          ))}
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid px-[2.2vw] py-[1.5vh] border-b border-[rgba(28,31,46,.07)] last:border-b-0 items-center gap-[1.5vw] transition-colors ${
              row.highlight ? "bg-[#FFF4EE] hover:bg-[#FFE9DB]" : "bg-white hover:bg-[rgba(28,31,46,.02)]"
            }`}
            style={{ gridTemplateColumns: "2fr repeat(4,1fr)" }}
          >
            <span className={`font-body text-[clamp(13px,1.02vw,15px)] font-medium ${
              row.highlight ? "font-display font-bold text-coral" : "text-[var(--text-mid)]"
            }`}>{row.name}</span>
            <Dot val={row.field} />
            <Dot val={row.security} />
            <Dot val={row.phone} />
            <Dot val={row.coaching} />
          </div>
        ))}
      </RevealWrapper>

      <RevealWrapper className="mt-[3vh]">
        <p className="font-mono text-[11px] tracking-[.18em] text-[var(--text-muted)] text-center">
          ● Full &nbsp;·&nbsp; ◐ Partial &nbsp;·&nbsp; ○ Not present
        </p>
      </RevealWrapper>
    </section>
  );
}
