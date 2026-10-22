import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { clamp, easeOutCubic, lerp, range } from '../../lib/math';
import { onFrame } from '../../lib/scroll';

export default function AboutHeroStage() {
  const rootRef = useRef(null);
  const veilRef = useRef(null);
  const dustRef = useRef(null);
  const titleRef = useRef(null);
  const hudRef = useRef(null);
  const clockRef = useRef(null);
  const elevRef = useRef(null);

  const skyRef = useRef(null);
  const monumentRef = useRef(null);
  const plainsRef = useRef(null);
  const frameRef = useRef(null);
  const travelerRef = useRef(null);
  const groundRef = useRef(null);

  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  // Dust canvas setup
  useEffect(() => {
    const c = dustRef.current;
    if (!c) return;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = dustRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const motes = Array.from({ length: 100 }, () => ({
      x: rand(),
      y: rand(),
      r: 0.4 + rand() * 1.5,
      s: 0.3 + rand(),
      a: 0.2 + rand() * 0.6
    }));

    let lastP = -1;
    let lastTime = 0;
    let smoothP = 0;

    const setLayer = (el, y, scale = 1, opacity = 1) => {
      if (!el) return;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      el.style.opacity = String(opacity.toFixed(3));
    };

    return onFrame((time) => {
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = Math.max(1, rect.height - vh);
      const targetP = clamp(-rect.top / totalScroll);
      smoothP += (targetP - smoothP) * 0.18;
      const p = smoothP;

      // Dust drifts every frame while visible
      const veil = 1 - range(p, 0, 0.25);
      if (veil > 0.001) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const dpr = canvas.width / Math.max(1, w);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#dfe6f2';
        for (const m of motes) {
          if (!reducedRef.current) {
            m.x += 0.006 * m.s * dt;
            m.y -= 0.004 * m.s * dt;
            if (m.x > 1) m.x -= 1;
            if (m.y < 0) m.y += 1;
          }
          ctx.globalAlpha = m.a * veil;
          ctx.beginPath();
          ctx.arc(m.x * w, (m.y - p * 0.4) * h, m.r * (1 + p * 3), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (Math.abs(p - lastP) < 0.0001) return;
      lastP = p;

      // Veil clears smoothly upward
      if (veilRef.current) {
        veilRef.current.style.opacity = String(veil);
        veilRef.current.style.transform = `translate3d(0, ${-range(p, 0, 0.25) * 60}px, 0)`;
      }
      canvas.style.opacity = String(veil);

      // Parallax depths (in pixels, bounded to screen)
      const rise = easeOutCubic(range(p, 0.04, 0.6));
      setLayer(skyRef.current, -p * 30, 1.05);
      setLayer(monumentRef.current, lerp(60, 0, rise), lerp(0.96, 1, rise));
      setLayer(plainsRef.current, -p * 30);

      const rim = easeOutCubic(range(p, 0.1, 0.5));
      setLayer(frameRef.current, -p * 40, lerp(1.1, 1, rim), rim);

      const up = easeOutCubic(range(p, 0.1, 0.6));
      setLayer(travelerRef.current, lerp(40, 0, up), 1, clamp(up * 1.8));

      // Title stays clearly readable without fading into an empty void
      if (titleRef.current) {
        const titleOpacity = clamp(1 - range(p, 0.75, 1) * 0.3, 0.75, 1);
        titleRef.current.style.opacity = String(titleOpacity);
        titleRef.current.style.transform = `translate3d(0, ${-p * 25}px, 0)`;
      }

      // Telemetry HUD remains visible
      if (hudRef.current) {
        hudRef.current.style.opacity = '1';
      }
      if (clockRef.current) {
        const secs = p * 3600;
        clockRef.current.textContent = `T+ ${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;
      }
      if (elevRef.current) {
        elevRef.current.textContent = `${(rise * 12.4).toFixed(1)}°`;
      }
    });
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      aria-label="Subcontinental Earthrise"
      className="hero-stage-section"
    >
      <div className="hero-sticky-stage">
        {/* Layer 1: Celestial Sky */}
        <div ref={skyRef} className="hero-layer sky-layer">
          <img
            src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2000&q=80"
            alt="Deep Sky"
            className="layer-media"
          />
          <div className="sky-overlay" />
        </div>

        {/* Layer 2: Rising Taj Mahal Monument */}
        <div ref={monumentRef} className="hero-layer monument-layer">
          <div className="monument-wrapper">
            <img
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85"
              alt="Taj Mahal Wonder"
              className="monument-img"
            />
          </div>
        </div>

        {/* Layer 3: Subcontinental Plains & River */}
        <div ref={plainsRef} className="hero-layer plains-layer">
          <div className="plains-gradient" />
        </div>

        {/* Cinematic Title: Bounded to viewport width */}
        <div ref={titleRef} className="hero-title-box">
          <h1 className="hero-display-wordmark font-display">
            SUB-CONTINENT
          </h1>
          <p className="hero-kicker-text font-mono">
            A Bespoke Subcontinental Odyssey · Plan My Trip Agency
          </p>
        </div>

        {/* Layer 4: Palace Jharokha Archway Frame */}
        <div ref={frameRef} className="hero-layer frame-layer">
          <svg viewBox="0 0 1920 1080" className="frame-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="palaceArchGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b1329" />
                <stop offset="100%" stopColor="#05070c" />
              </linearGradient>
            </defs>
            <path d="M0 0 L240 0 C220 220 230 600 200 1080 L0 1080 Z" fill="url(#palaceArchGrad)" opacity="0.95" />
            <path d="M1920 0 L1680 0 C1700 220 1690 600 1720 1080 L1920 1080 Z" fill="url(#palaceArchGrad)" opacity="0.95" />
            <path d="M0 0 L1920 0 L1920 140 Q960 300 0 140 Z" fill="url(#palaceArchGrad)" opacity="0.95" />
          </svg>
        </div>

        {/* Layer 5: Traveler Silhouette */}
        <div ref={travelerRef} className="hero-layer traveler-layer">
          <svg viewBox="0 0 100 200" className="traveler-svg">
            <circle cx="50" cy="30" r="14" fill="#030712" />
            <path d="M30 48 Q50 44 70 48 L76 120 L66 180 L52 180 L54 125 L46 125 L48 180 L34 180 L24 120 Z" fill="#030712" />
            <path d="M26 50 L10 100 L18 104 L32 64 Z" fill="#030712" />
            <path d="M74 50 L90 100 L82 104 L68 64 Z" fill="#030712" />
          </svg>
        </div>

        {/* Layer 6: Ground with Black Base */}
        <div ref={groundRef} className="hero-layer ground-layer">
          <div className="ground-gradient" />
        </div>

        {/* Cosmic Dust / Atmospheric Veil */}
        <div ref={veilRef} className="hero-veil">
          <div className="veil-content">
            <p className="veil-sub font-mono">
              Plan My Trip Agency · India Sanctuary
            </p>
            <p className="veil-title font-display">
              Scroll to clear the veil
            </p>
            <span className="veil-arrow">↓</span>
          </div>
        </div>
        <canvas ref={dustRef} className="hero-canvas" />

        {/* Telemetry HUD in 4 Corners */}
        <div ref={hudRef} className="hero-hud-frame font-mono">
          <div className="brackets absolute inset-0 text-[#8b909b]/30" />
          <div className="hud-corner top-left">
            <p ref={clockRef} className="hud-metric">T+ 00:00:00</p>
            <p className="hud-desc">Expedition clock</p>
          </div>
          <div className="hud-corner top-right">
            <p className="hud-metric">
              Horizon Elev <span ref={elevRef} className="text-[#6fb6ff]">0.0°</span>
            </p>
            <p className="hud-desc">27.17°N 78.04°E</p>
          </div>
          <div className="hud-corner bottom-left">
            Namakkal & Agra Corridor · 11.21°N 78.16°E
          </div>
          <div className="hud-corner bottom-right">
            Scroll <span className="arrow-bounce">↓</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-stage-section {
          position: relative;
          width: 100%;
          max-width: 100vw;
          height: 135vh;
          background: #05070c;
          overflow-x: clip;
        }
        .hero-sticky-stage {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          max-width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #05070c;
        }
        .hero-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .layer-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sky-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5, 7, 12, 0.25);
        }
        .monument-layer {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .monument-wrapper {
          position: relative;
          width: 85vw;
          max-width: 950px;
          max-height: 55vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .monument-img {
          width: 100%;
          height: auto;
          max-height: 55vh;
          object-fit: contain;
          filter: drop-shadow(0 15px 45px rgba(37, 99, 235, 0.35));
        }
        .plains-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 16vh;
          background: linear-gradient(to top, rgba(10, 25, 47, 0.8) 0%, rgba(7, 17, 32, 0.4) 60%, transparent 100%);
        }
        .hero-title-box {
          position: absolute;
          inset-x: 0;
          top: 18%;
          text-align: center;
          pointer-events: none;
          z-index: 10;
          padding: 0 1rem;
        }
        .hero-display-wordmark {
          font-size: clamp(1.8rem, 5.2vw, 4.2rem);
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: clamp(0.12em, 0.22em, 0.26em);
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
          margin: 0 auto;
          max-width: 100%;
        }
        .hero-kicker-text {
          font-size: clamp(0.68rem, 1.2vw, 0.85rem);
          color: #c9ccd3;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-top: 0.75rem;
        }
        .frame-svg {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
        .traveler-layer {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 3.5rem;
        }
        .traveler-svg {
          width: clamp(50px, 6vw, 85px);
          height: auto;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8));
        }
        .ground-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 10vh;
          background: linear-gradient(to top, #05070c 10%, rgba(5, 7, 12, 0.5) 60%, transparent 100%);
        }
        .hero-veil {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at center, rgba(10, 25, 47, 0.3) 0%, rgba(5, 7, 12, 0.65) 80%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }
        .veil-content {
          text-align: center;
          padding: 0 1rem;
        }
        .veil-sub {
          font-size: 0.72rem;
          color: #c9ccd3;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .veil-title {
          font-size: clamp(0.85rem, 1.6vw, 1.1rem);
          letter-spacing: 0.38em;
          color: #ffffff;
          text-transform: uppercase;
        }
        .veil-arrow {
          display: inline-block;
          margin-top: 1rem;
          font-size: 1.2rem;
          color: #6fb6ff;
          animation: bounce 1.6s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 22;
        }
        .hero-hud-frame {
          position: absolute;
          inset: 1.25rem;
          pointer-events: none;
          z-index: 25;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: rgba(201, 204, 211, 0.75);
          text-transform: uppercase;
        }
        .hud-corner {
          position: absolute;
        }
        .top-left {
          top: 3.5rem;
          left: 0.75rem;
        }
        .top-right {
          top: 3.5rem;
          right: 0.75rem;
          text-align: right;
        }
        .bottom-left {
          bottom: 0.5rem;
          left: 0.75rem;
        }
        .bottom-right {
          bottom: 0.5rem;
          right: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .hud-metric {
          color: #ffffff;
          font-weight: 600;
        }
        .hud-desc {
          color: #8b909b;
          font-size: 0.65rem;
        }
        .arrow-bounce {
          display: inline-block;
          animation: bounce 1.6s infinite ease-in-out;
        }
        @media (max-width: 768px) {
          .hero-hud-frame {
            inset: 0.75rem;
            font-size: 0.65rem;
          }
          .top-left, .top-right {
            top: 4.5rem;
          }
          .bottom-left {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
