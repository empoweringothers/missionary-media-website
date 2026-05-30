import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--warm-navy)] border-t border-[rgba(250,248,245,.06)] py-[3vh] px-[7vw] flex justify-between items-center flex-wrap gap-[2vh]">
      <div className="flex items-center gap-2.5">
        <Image src="/images/logo.png" alt="" width={28} height={28} className="h-7 w-auto opacity-50" />
        <p className="font-mono text-[11px] tracking-[.16em] uppercase text-[rgba(250,248,245,.3)]">Missionary Media · 2026</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-mono text-[11px] tracking-[.16em] uppercase text-[rgba(250,248,245,.3)]">
          Pre-launch · 501(c)(3) nonprofit · missionarymedia.org
        </p>
        <a
          href="https://www.youtube.com/@MissionaryMediaHub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[rgba(250,248,245,.3)] hover:text-[rgba(250,248,245,.7)] transition-colors"
          aria-label="YouTube"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
