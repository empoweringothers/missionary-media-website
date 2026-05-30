"use client";

interface ChapterBarProps {
  text: string;
  variant?: "blue" | "warm" | "white";
}

export default function ChapterBar({ text, variant = "blue" }: ChapterBarProps) {
  const colorMap = {
    blue: { bar: "bg-blue", text: "text-blue" },
    warm: { bar: "bg-coral", text: "text-coral" },
    white: { bar: "bg-[rgba(28,31,46,.28)]", text: "text-[rgba(28,31,46,.45)]" },
  };
  const c = colorMap[variant];

  return (
    <div className="flex items-center gap-3.5 mb-[3.2vh]">
      <span className={`block w-[38px] h-[2px] ${c.bar} rounded-[1px] shrink-0`} />
      <span className={`font-mono text-[13px] tracking-[.3em] uppercase ${c.text}`}>{text}</span>
    </div>
  );
}
