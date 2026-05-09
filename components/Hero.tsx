"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TICKER_ITEMS = [
  { cat: "Mission", title: "Digital Evangelism: Unlocking the Future of Missions",   type: "YouTube", videoId: "dnfMBprp0xg" },
  { cat: "Media",   title: "Overcome Camera Fear & Share the Gospel Online",          type: "YouTube", videoId: "kwE45m5kRMo" },
  { cat: "Mission", title: "How to Spread the Gospel on Social Media",                type: "YouTube", videoId: "L1oiYPD3MzM" },
  { cat: "Mission", title: "The Secret to Successful Online Outreach",                type: "YouTube", videoId: "lN8zVJpDugY" },
  { cat: "Mission", title: "Is Online Evangelism the Future of Spreading God's Word?", type: "YouTube", videoId: "_gc6d6qk3IE" },
  { cat: "Media",   title: "How Missionaries Can Reach Millions Across Cultures",     type: "YouTube", videoId: "cLfGCAg4DRA" },
  { cat: "Mission", title: "The Biblical View of Digital Evangelism",                 type: "YouTube", videoId: "euSjz1xT-YY" },
  { cat: "Media",   title: "Simple Social Media Strategies Every Missionary Needs",   type: "YouTube", videoId: "uM35hRAhWR0" },
  { cat: "Media",   title: "Understanding Social Media's Impact on Ministry",         type: "YouTube", videoId: "LNKgYv0dwyQ" },
];

const catStyle: Record<string, string> = {
  Mission: "bg-[rgba(255,107,53,.15)] text-[#FF9060] border border-[rgba(255,107,53,.28)]",
  Media: "bg-[rgba(232,112,42,.12)] text-[#FFB070] border border-[rgba(232,112,42,.28)]",
  Tech: "bg-[rgba(0,92,232,.2)] text-[rgba(150,200,255,.9)] border border-[rgba(0,92,232,.35)]",
};

type FloatObj = {
  sel: string;
  amp: number;
  freq: number;
  phase: number;
  rot: number;
  depth: number;
};

// Depth values match v2 originals
const FLOAT_OBJECTS: FloatObj[] = [
  { sel: "fo-bible",  amp:  9, freq: 0.88, phase: 0.0, rot:  1.2, depth: -0.7  },
  { sel: "fo-laptop", amp: 11, freq: 0.76, phase: 0.7, rot:  0.5, depth:  0.8  },
  { sel: "fo-mic",    amp:  8, freq: 1.15, phase: 2.1, rot: -1.2, depth: -0.85 },
  { sel: "fo-globe",  amp: 10, freq: 0.70, phase: 3.2, rot:  0.3, depth: -0.35 },
  { sel: "fo-phone",  amp:  7, freq: 0.92, phase: 1.4, rot:  0.8, depth:  0.6  },
  { sel: "fo-camera", amp:  6, freq: 0.65, phase: 1.8, rot:  0.6, depth:  0.4  },
];

// Grid draw — ported directly from v2
function drawGrid(canvas: HTMLCanvasElement) {
  const W = (canvas.width  = canvas.offsetWidth);
  const H = (canvas.height = canvas.offsetHeight);
  if (!W || !H) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  const vpX = W / 2, vpY = 0;
  const spread = W * 6;
  const cols = 52, rows = 28;
  const r = 138, g = 180, b = 255;

  // Depth (radiating) lines — tight convergence at vanishing point
  ctx.globalAlpha = 1;
  for (let i = 0; i <= cols; i++) {
    const xBottom = (vpX - spread / 2) + (i / cols) * spread;
    const xTop    = vpX + (xBottom - vpX) * 0.004;
    const edgeFactor = Math.abs(xBottom - vpX) / (spread / 2);
    const edgeFade   = Math.max(0, 1 - Math.pow(edgeFactor, 0.55));
    const maxAlpha   = edgeFade * 0.80;
    if (maxAlpha < 0.01) continue;
    const grad = ctx.createLinearGradient(xTop, vpY, xBottom, H);
    grad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
    grad.addColorStop(0.10, `rgba(${r},${g},${b},${+(maxAlpha * 0.12).toFixed(3)})`);
    grad.addColorStop(1,    `rgba(${r},${g},${b},${+maxAlpha.toFixed(3)})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xTop, vpY);
    ctx.lineTo(xBottom, H);
    ctx.stroke();
  }

  // Cross lines — per-line gradient fades at left/right edges
  ctx.globalAlpha = 1;
  for (let i = 1; i <= rows; i++) {
    const t = i / rows;
    const y = H * (1 - Math.pow(1 - t, 3.2));
    const alpha = Math.pow(t, 1.1) * 0.88;
    const extent = (spread / 2) * (y / H);
    const lx = vpX - extent, rx = vpX + extent;
    const fadeStop = Math.min(0.12, (W * 0.15) / Math.max(extent, 1));
    const grad = ctx.createLinearGradient(lx, y, rx, y);
    grad.addColorStop(0,           `rgba(${r},${g},${b},0)`);
    grad.addColorStop(fadeStop,    `rgba(${r},${g},${b},${+alpha.toFixed(3)})`);
    grad.addColorStop(1-fadeStop,  `rgba(${r},${g},${b},${+alpha.toFixed(3)})`);
    grad.addColorStop(1,           `rgba(${r},${g},${b},0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(lx, y);
    ctx.lineTo(rx, y);
    ctx.stroke();
  }

  // Viewport-edge fade — single destination-in pass (v2 approach)
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-in";
  const fadeW = Math.round(W * 0.18);
  const edgeMask = ctx.createLinearGradient(0, 0, W, 0);
  edgeMask.addColorStop(0,           "rgba(0,0,0,0)");
  edgeMask.addColorStop(fadeW / W,   "rgba(0,0,0,1)");
  edgeMask.addColorStop(1 - fadeW/W, "rgba(0,0,0,1)");
  edgeMask.addColorStop(1,           "rgba(0,0,0,0)");
  ctx.fillStyle = edgeMask;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sceneRef   = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLElement>(null);
  const rafRef     = useRef<number>(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [laptopOrigin, setLaptopOrigin] = useState({ x: 0, y: 0, scale: 0.18 });
  const [tickerVideo, setTickerVideo] = useState<string | null>(null);

  // Camera + object state — matches v2 shape
  const stateRef = useRef({
    t: 0,
    camX: 0, velCamX: 0,
    camY: 0, velCamY: 0,
    camDragging: false,
    camPrevX: 0, camPrevY: 0,
    camDownX: 0, camDownY: 0,
    objects: FLOAT_OBJECTS.map(() => ({
      grabbed: false,
      didDrag: false,
      dragX: 0, dragY: 0,
      targetX: 0, targetY: 0,
      grabSX: 0, grabSY: 0,
      grabDX: 0, grabDY: 0,
      vx: 0, vy: 0,
      angle: 0, angVel: 0,
      prevCX: 0, prevCY: 0,
    })),
  });

  // Draw grid on mount + resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawGrid(canvas);
    const onResize = () => drawGrid(canvas);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Animation loop + interaction — v2 camera model
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = sceneRef.current;
    const hero  = heroRef.current;
    if (!scene || !hero) return;

    const state = stateRef.current;
    const objEls = FLOAT_OBJECTS.map((o) => hero.querySelector<HTMLElement>(`.${o.sel}`));

    const tick = () => {
      state.t += 0.012;

      // Tripod inertia — pitch and yaw decay smoothly (v2)
      state.camX += state.velCamX; state.velCamX *= 0.90;
      state.camY += state.velCamY; state.velCamY *= 0.90;
      state.camX = Math.max(-38, Math.min(38, state.camX));
      state.camY = Math.max(-55, Math.min(55, state.camY));

      if (!prefersReduced) {
        hero.style.perspectiveOrigin = `${50 + state.camY * 0.55}% ${50 - state.camX * 0.4}%`;
      }

      FLOAT_OBJECTS.forEach((fo, i) => {
        const el  = objEls[i];
        const obj = state.objects[i];
        if (!el) return;

        if (obj.grabbed) {
          obj.dragX += (obj.targetX - obj.dragX) * 0.35;
          obj.dragY += (obj.targetY - obj.dragY) * 0.35;
        } else {
          obj.dragX  += obj.vx; obj.vx  *= 0.94;
          obj.dragY  += obj.vy; obj.vy  *= 0.94;
          obj.angVel *= 0.97;
          obj.angle  += obj.angVel;
        }

        const bobY = obj.grabbed ? 0 : Math.sin(state.t * fo.freq + fo.phase) * fo.amp;
        const bobR = obj.grabbed ? 0 : Math.sin(state.t * fo.freq * 0.6 + fo.phase) * fo.rot;
        const px   = obj.grabbed ? 0 : state.camY * fo.depth * -2.4;
        const py   = obj.grabbed ? 0 : state.camX * fo.depth * -1.8;

        el.style.transform = `translate(${obj.dragX + px}px,${bobY + obj.dragY + py}px) rotateX(${state.camX}deg) rotateY(${state.camY}deg) rotate(${obj.angle + (obj.grabbed ? 0 : bobR)}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Camera drag — v2 velocity model
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element;
      if (t.closest(".float-obj") || t.closest("a") || t.closest("button")) return;
      e.preventDefault();
      state.camDragging = true;
      state.camPrevX = e.clientX;
      state.camPrevY = e.clientY;
      state.camDownX = e.clientX;
      state.camDownY = e.clientY;
      hero.classList.add("dragging");
      hero.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!state.camDragging) return;
      state.velCamX -= (e.clientY - state.camPrevY) * 0.18;
      state.velCamY += (e.clientX - state.camPrevX) * 0.18;
      state.camPrevX = e.clientX;
      state.camPrevY = e.clientY;
    };
    const stopCam = () => {
      if (!state.camDragging) return;
      state.camDragging = false;
      hero.classList.remove("dragging");
    };

    hero.addEventListener("pointerdown",   onDown);
    hero.addEventListener("pointermove",   onMove);
    hero.addEventListener("pointerup",     stopCam as EventListener);
    hero.addEventListener("pointercancel", stopCam as EventListener);

    // Float object drag — all objects including laptop
    FLOAT_OBJECTS.forEach((fo, i) => {
      const el  = objEls[i];
      const obj = state.objects[i];
      if (!el) return;

      const objDown = (e: PointerEvent) => {
        obj.grabbed = true;
        obj.didDrag = false;
        el.setPointerCapture(e.pointerId);
        obj.grabSX = e.clientX; obj.grabSY = e.clientY;
        obj.grabDX = obj.dragX; obj.grabDY = obj.dragY;
        obj.prevCX = e.clientX; obj.prevCY = e.clientY;
        obj.vx = 0; obj.vy = 0; obj.angVel = 0;
        el.style.zIndex = "20";
        e.preventDefault();
        e.stopPropagation();
      };
      const objMove = (e: PointerEvent) => {
        if (!obj.grabbed) return;
        const dx = e.clientX - obj.prevCX;
        const totalDx = e.clientX - obj.grabSX;
        const totalDy = e.clientY - obj.grabSY;
        if (Math.sqrt(totalDx * totalDx + totalDy * totalDy) > 6) obj.didDrag = true;
        obj.targetX = obj.grabDX + totalDx;
        obj.targetY = obj.grabDY + totalDy;
        obj.vx = obj.vx * 0.5 + dx * 0.5;
        obj.vy = obj.vy * 0.5 + (e.clientY - obj.prevCY) * 0.5;
        obj.angVel = obj.vx * 0.6;
        obj.prevCX = e.clientX; obj.prevCY = e.clientY;
      };
      const drop = () => {
        if (!obj.grabbed) return;
        const wasTap = !obj.didDrag;
        obj.grabbed = false;
        obj.dragX = obj.targetX;
        obj.dragY = obj.targetY;
        el.style.zIndex = "";
        if (wasTap && fo.sel === "fo-laptop") {
          const rect = el.getBoundingClientRect();
          const modalSize = Math.min(window.innerHeight * 0.82, 820);
          setLaptopOrigin({
            x: (rect.left + rect.width / 2) - window.innerWidth / 2,
            y: (rect.top + rect.height / 2) - window.innerHeight / 2,
            scale: rect.width / modalSize,
          });
          setVideoOpen(true);
        }
      };

      el.addEventListener("pointerdown",  objDown);
      el.addEventListener("pointermove",  objMove);
      el.addEventListener("pointerup",    drop);
      el.addEventListener("pointercancel", drop);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      hero.removeEventListener("pointerdown",  onDown);
      hero.removeEventListener("pointermove",  onMove);
      hero.removeEventListener("pointerup",     stopCam as EventListener);
      hero.removeEventListener("pointercancel", stopCam as EventListener);
    };
  }, []);

  const allTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden h-screen min-h-[640px] bg-[var(--warm-navy)] cursor-grab [&.dragging]:cursor-grabbing select-none"
      style={{ perspective: "1800px", touchAction: "none", userSelect: "none" }}
      id="hero"
    >
      {/* Background gradients — stay flat, don't tilt */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 70%,rgba(232,112,42,.28) 0%,transparent 65%),radial-gradient(ellipse 50% 42% at 80% 25%,rgba(255,107,53,.18) 0%,transparent 58%),radial-gradient(ellipse 40% 35% at 50% 90%,rgba(0,92,232,.2) 0%,transparent 55%)",
        }}
      />

      {/* 3D scene — objects tilt, canvas counter-rotates to stay frozen */}
      <div
        ref={sceneRef}
        className="absolute inset-0 z-[2] bg-[var(--warm-navy)] will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
        id="hero-scene"
      >
        <canvas
          ref={canvasRef}
          className="absolute bottom-0 left-0 w-full pointer-events-none z-[1] block"
          style={{ height: "55%" }}
        />

        {/* Floating objects */}
        <img
          className="float-obj fo-bible absolute z-[2] will-change-transform cursor-grab select-none"
          draggable={false}
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            maskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            width: "clamp(120px,13vw,175px)",
            left: "11%",
            top: "9%",
            filter: "contrast(2) drop-shadow(0 0 22px rgba(232,112,42,.8))",
          }}
          src="/images/hero-3.png"
          alt=""
        />
        {/* Laptop — transparent PNG, no blend mode needed */}
        <div
          className="float-obj fo-laptop absolute z-[2] cursor-grab will-change-transform select-none"
          style={{
            width: "clamp(150px,17vw,210px)",
            left: "14%",
            bottom: "11%",
            visibility: videoOpen ? "hidden" : undefined,
          }}
        >
          <img
            className="w-full select-none"
            draggable={false}
            style={{
              filter: "drop-shadow(0 0 22px rgba(0,92,232,.8))",
              display: "block",
            }}
            src="/images/hero-4-nobg.png"
            alt=""
          />
          {/* Play button — centered on laptop screen */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "50%", top: "44%", transform: "translate(-50%, -50%)" }}
          >
            <div className="flex flex-col items-center gap-[5px]">
              <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center" style={{ boxShadow: "0 0 16px 4px rgba(255,107,53,0.9)" }}>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><polygon points="0,0 10,6 0,12"/></svg>
              </div>
              <span className="font-mono text-[8px] tracking-[.18em] uppercase text-white whitespace-nowrap" style={{ textShadow: "0 0 8px rgba(255,107,53,1)" }}>Watch</span>
            </div>
          </div>
        </div>
        <img
          className="float-obj fo-mic absolute z-[2] will-change-transform cursor-grab select-none"
          draggable={false}
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            maskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            width: "clamp(100px,11.5vw,155px)",
            right: "21%",
            top: "8%",
            filter: "contrast(2) drop-shadow(0 0 22px rgba(255,107,53,.8))",
          }}
          src="/images/hero-5.png"
          alt=""
        />
        <img
          className="float-obj fo-globe absolute z-[2] will-change-transform cursor-grab select-none"
          draggable={false}
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            maskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            width: "clamp(130px,14.5vw,188px)",
            right: "4%",
            top: "34%",
            filter: "contrast(2) drop-shadow(0 0 22px rgba(0,180,255,.8))",
          }}
          src="/images/hero-1.png"
          alt=""
        />
        <img
          className="float-obj fo-phone absolute z-[2] will-change-transform cursor-grab select-none"
          draggable={false}
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            maskImage: "radial-gradient(ellipse 62% 66% at 50% 36%,black 50%,transparent 100%)",
            width: "clamp(85px,10vw,136px)",
            right: "14%",
            bottom: "13%",
            filter: "contrast(2) drop-shadow(0 0 22px rgba(0,92,232,.8))",
          }}
          src="/images/hero-2.png"
          alt=""
        />

        {/* Camera SVG */}
        <div
          className="float-obj fo-camera absolute z-[2] will-change-transform cursor-grab"
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(ellipse 78% 74% at 50% 50%,black 36%,rgba(0,0,0,.55) 58%,transparent 88%)",
            maskImage: "radial-gradient(ellipse 78% 74% at 50% 50%,black 36%,rgba(0,0,0,.55) 58%,transparent 88%)",
            width: "clamp(110px,12vw,165px)",
            left: "5%",
            top: "40%",
            filter: "contrast(1.8) drop-shadow(0 0 22px rgba(0,196,249,.9)) drop-shadow(0 0 8px rgba(0,150,240,.6))",
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="g-body" x1="15%" y1="8%" x2="85%" y2="92%">
                <stop offset="0%" stopColor="#7a8fa0" /><stop offset="40%" stopColor="#384858" /><stop offset="100%" stopColor="#080c12" />
              </linearGradient>
              <linearGradient id="g-hump" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6a7e90" /><stop offset="100%" stopColor="#1c2530" />
              </linearGradient>
              <radialGradient id="g-lens" cx="37%" cy="33%" r="58%">
                <stop offset="0%" stopColor="#5888b8" /><stop offset="18%" stopColor="#2a4868" /><stop offset="52%" stopColor="#08121e" /><stop offset="100%" stopColor="#010408" />
              </radialGradient>
              <radialGradient id="g-refl" cx="28%" cy="24%" r="48%">
                <stop offset="0%" stopColor="rgba(200,232,255,0.72)" /><stop offset="45%" stopColor="rgba(100,175,235,0.18)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <radialGradient id="g-dial" cx="38%" cy="32%" r="60%">
                <stop offset="0%" stopColor="#506070" /><stop offset="100%" stopColor="#101820" />
              </radialGradient>
            </defs>
            <rect width="200" height="200" fill="#000" />
            <rect x="16" y="74" width="168" height="98" rx="11" fill="url(#g-body)" />
            <rect x="16" y="74" width="168" height="3" rx="1.5" fill="#c0d0e0" opacity="0.42" />
            <rect x="16" y="74" width="3" height="98" rx="1.5" fill="#aabccc" opacity="0.28" />
            <ellipse cx="58" cy="90" rx="30" ry="10" fill="white" opacity="0.055" transform="rotate(-6 58 90)" />
            <path d="M76 74 L76 52 Q76 46 83 46 L120 46 Q127 46 127 52 L127 74" fill="url(#g-hump)" />
            <path d="M83 46 L120 46" stroke="#8fa0b0" strokeWidth="1.4" fill="none" opacity="0.5" />
            <rect x="84" y="44" width="32" height="2" rx="1" fill="#607080" opacity="0.4" />
            <circle cx="152" cy="82" r="10" fill="#1a2230" />
            <circle cx="152" cy="82" r="8" fill="#28363e" />
            <ellipse cx="149.5" cy="79.5" rx="3" ry="1.8" fill="#88a8c8" opacity="0.52" />
            <circle cx="32" cy="82" r="14" fill="#141e28" />
            <circle cx="32" cy="82" r="11" fill="url(#g-dial)" />
            <circle cx="32" cy="70" r="2.2" fill="#80a0b8" opacity="0.65" />
            <line x1="40" y1="74" x2="38" y2="76.5" stroke="#607888" strokeWidth="1.1" opacity="0.55" />
            <line x1="24" y1="74" x2="26" y2="76.5" stroke="#607888" strokeWidth="1.1" opacity="0.55" />
            <rect x="158" y="74" width="26" height="98" rx="2" fill="#0c1420" opacity="0.55" />
            {[92,100,108,116,124,132,140].map(y => (
              <line key={y} x1="164" y1={y} x2="178" y2={y} stroke="#08101a" strokeWidth="1.1" opacity="0.6" />
            ))}
            <circle cx="84" cy="126" r="52" fill="#050810" />
            <circle cx="84" cy="126" r="49" fill="#0a0f18" stroke="#2a3c50" strokeWidth="0.8" />
            <circle cx="84" cy="126" r="41" fill="url(#g-lens)" />
            <circle cx="84" cy="126" r="35" fill="none" stroke="#1a2a3a" strokeWidth="1.5" opacity="0.9" />
            <circle cx="84" cy="126" r="27" fill="none" stroke="#14202e" strokeWidth="1.2" opacity="0.8" />
            <circle cx="84" cy="126" r="19" fill="#040810" />
            <circle cx="84" cy="126" r="10" fill="#000507" />
            <circle cx="84" cy="126" r="5" fill="#000" />
            <circle cx="84" cy="126" r="41" fill="url(#g-refl)" />
            <ellipse cx="66" cy="110" rx="10" ry="5.5" fill="white" opacity="0.26" transform="rotate(-35 66 110)" />
            <ellipse cx="64" cy="108" rx="4.5" ry="2.2" fill="white" opacity="0.52" transform="rotate(-35 64 108)" />
            <ellipse cx="100" cy="140" rx="5" ry="2.5" fill="white" opacity="0.09" transform="rotate(20 100 140)" />
            <circle cx="160" cy="110" r="4.5" fill="#141e28" />
            <circle cx="160" cy="123" r="4.5" fill="#141e28" />
            <circle cx="160" cy="136" r="4.5" fill="#141e28" />
            <circle cx="160" cy="110" r="2.8" fill="#1e2c38" />
          </svg>
        </div>
      </div>

      {/* Aurora mesh */}
      <div
        className="absolute pointer-events-none z-[1] overflow-hidden opacity-[.65]"
        style={{ inset: "-20%" }}
      >
        <div
          className="absolute"
          style={{
            width: "70%", height: "70%", top: "10%", left: "5%",
            background: "radial-gradient(ellipse,rgba(232,112,42,.55) 0%,rgba(255,107,53,.22) 40%,transparent 70%)",
            filter: "blur(48px)",
            animation: "auroraShift 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "65%", height: "65%", top: "30%", right: "0%",
            background: "radial-gradient(ellipse,rgba(0,92,232,.48) 0%,rgba(0,196,249,.18) 42%,transparent 70%)",
            filter: "blur(52px)",
            animation: "auroraShift2 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "55%", height: "55%", bottom: "0%", left: "30%",
            background: "radial-gradient(ellipse,rgba(255,107,53,.32) 0%,rgba(232,112,42,.12) 45%,transparent 70%)",
            filter: "blur(44px)",
            animation: "auroraShift 22s ease-in-out reverse infinite",
          }}
        />
      </div>

      {/* Hero text overlay */}
      <div className="absolute inset-0 z-[6] flex flex-col items-center justify-center text-center pointer-events-none px-[7vw] pb-[80px]">
        <div style={{ pointerEvents: "auto" }}>
          <Image
            src="/images/logo.png"
            alt="Missionary Media"
            width={54}
            height={54}
            className="mb-[2.6vh] drop-shadow-[0_0_16px_rgba(255,107,53,.35)]"
            style={{ height: "clamp(36px,4.5vw,54px)", width: "auto", display: "block", margin: "0 auto 2.6vh" }}
          />

          <motion.div
            className="inline-flex items-center gap-2 mb-[3vh] font-mono text-[11.5px] tracking-[.2em] uppercase text-[#FF9060] rounded-full px-[18px] py-[7px]"
            style={{
              background: "rgba(255,107,53,.1)",
              border: "1px solid rgba(255,107,53,.32)",
              backdropFilter: "blur(8px)",
              animation: "badgePulse 3s ease-in-out infinite",
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 0.68, 0, 1.1] }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9060] animate-[pulse_2.2s_ease-in-out_infinite]" />
            Now accepting missionaries
          </motion.div>

          <motion.h1
            className="font-display font-bold leading-[1.0] tracking-[-0.042em] mb-[2.8vh] text-[rgba(250,248,245,.97)]"
            style={{ fontSize: "clamp(44px,7.2vw,106px)" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.68, 0, 1.1] }}
          >
            Equipping missionaries<br />
            to <em className="gt italic font-bold tracking-[-0.035em]">thrive</em> digitally.
          </motion.h1>

          <motion.p
            className="font-body leading-[1.65] text-[rgba(250,248,245,.52)] mb-[3.4vh] mx-auto"
            style={{ fontSize: "clamp(15px,1.25vw,19px)", maxWidth: "min(480px,70vw)" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            Built for missionaries, not marketers. We meet you in the field — where the Wi-Fi is slow, the calling is clear, and the digital tools were designed for someone else.
          </motion.p>

          <motion.div
            className="flex gap-3.5 items-center flex-wrap justify-center"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.54 }}
          >
            <a
              href="#sponsor"
              className="inline-flex items-center gap-2.5 bg-coral text-white font-body font-semibold tracking-[.01em] border-none rounded-full cursor-pointer no-underline transition-all duration-[220ms] shadow-[0_6px_30px_rgba(255,107,53,.4)] hover:-translate-y-0.5 hover:bg-orange hover:shadow-[0_12px_44px_rgba(255,107,53,.52)]"
              style={{ fontSize: "clamp(14px,1vw,15px)", padding: "14px 32px" }}
            >
              Sponsor a Missionary
            </a>
          </motion.div>
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-[92px] left-1/2 -translate-x-1/2 z-[5] flex items-center gap-2 font-mono text-[11px] tracking-[.2em] uppercase text-[rgba(250,248,245,.28)] pointer-events-none whitespace-nowrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <path d="M5 9l-3 3 3 3" /><path d="M19 9l3 3-3 3" /><line x1="2" y1="12" x2="22" y2="12" />
        </svg>
        Drag to explore
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center"
            style={{ background: "rgba(3, 8, 22, 0.65)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onPointerDown={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative"
              style={{ width: "min(82vh, 820px)", height: "min(82vh, 820px)" }}
              initial={{ scale: laptopOrigin.scale, x: laptopOrigin.x, y: laptopOrigin.y, opacity: 0 }}
              animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
              exit={{ scale: laptopOrigin.scale, x: laptopOrigin.x, y: laptopOrigin.y, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.2, 0.8, 0.3, 1] }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {/* Full laptop — transparent background PNG, no blend mode needed */}
              <img
                src="/images/hero-4-nobg.png"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
                style={{
                  filter: "drop-shadow(0 0 28px rgba(0,92,232,.8))",
                  zIndex: 1,
                }}
                alt=""
              />
              {/* Screen area — matched to laptop screen position in the PNG */}
              <div
                className="absolute"
                style={{
                  top: "22%", left: "21%", right: "21%", bottom: "35%",
                  zIndex: 2,
                  overflow: "hidden",
                  borderRadius: "8px 8px 4px 4px",
                  background: "#000",
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <iframe
                  className="w-full h-full border-none block"
                  src="https://www.youtube.com/embed/dnfMBprp0xg?autoplay=1&rel=0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <button
                className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[.22em] uppercase text-[rgba(250,248,245,.45)] hover:text-[rgba(250,248,245,.8)] transition-colors flex items-center gap-[7px] whitespace-nowrap"
                style={{ bottom: "-32px", zIndex: 3 }}
                onClick={() => setVideoOpen(false)}
                aria-label="Close video"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker video popup */}
      <AnimatePresence>
        {tickerVideo && (
          <motion.div
            className="fixed inset-0 z-[9001] flex items-center justify-center px-4"
            style={{ background: "rgba(3,8,22,0.88)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onPointerDown={() => setTickerVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-[900px]"
              style={{ aspectRatio: "16/9" }}
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 24 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.3, 1] }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full border-none block"
                style={{ borderRadius: "12px" }}
                src={`https://www.youtube.com/embed/${tickerVideo}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[.22em] uppercase text-[rgba(250,248,245,.45)] hover:text-[rgba(250,248,245,.8)] transition-colors flex items-center gap-[7px] whitespace-nowrap"
                style={{ bottom: "-32px" }}
                onClick={() => setTickerVideo(null)}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker */}
      <div
        className="ticker-outer absolute bottom-0 left-0 right-0 z-[4] overflow-hidden border-t border-[rgba(250,248,245,.1)] h-[82px]"
        style={{ background: "rgba(15,30,60,.88)", backdropFilter: "blur(20px)" }}
      >
        <div className="ticker-inner flex items-stretch h-full" style={{ width: "max-content", animation: "ticker 54s linear infinite" }}>
          {allTicker.map((item, i) => (
            <button
              key={i}
              type="button"
              className="flex items-center gap-4 px-[2.8rem] h-full border-r border-[rgba(250,248,245,.07)] shrink-0 cursor-pointer hover:bg-[rgba(255,255,255,.05)] transition-colors"
              onClick={() => setTickerVideo(item.videoId)}
            >
              <span className={`font-mono text-[9px] tracking-[.26em] uppercase px-[10px] py-[3px] rounded-full shrink-0 whitespace-nowrap ${catStyle[item.cat]}`}>
                {item.cat}
              </span>
              <div className="flex flex-col gap-[3px] text-left">
                <div className="font-body text-[13px] font-medium text-[rgba(250,248,245,.75)] whitespace-nowrap">{item.title}</div>
                <div className="font-mono text-[9px] tracking-[.18em] uppercase whitespace-nowrap flex items-center gap-[5px] text-[#FF9060] opacity-70">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><polygon points="0,0 8,4 0,8"/></svg>
                  Click to Watch
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
