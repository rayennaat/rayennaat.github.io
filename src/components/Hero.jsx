import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";


function useRevealText(text, speed = 60) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    setDisplay("");
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timeout);
  }, [text]);
  return display;
}
function FloatingQMark({ style, color }) {
  return (
    <span
      className="absolute font-black select-none pointer-events-none animate-pulse"
      style={{ opacity: 0.06, color, ...style }}
    >
      ?
    </span>
  );
}

const qmarks = [
  { fontSize: "12rem", top: "5%", left: "2%", animationDelay: "0s" },
  { fontSize: "6rem", top: "20%", right: "5%", animationDelay: "0.8s" },
  { fontSize: "18rem", bottom: "-4%", right: "-2%", animationDelay: "0.3s" },
  { fontSize: "4rem", top: "60%", left: "8%", animationDelay: "1.2s" },
  { fontSize: "9rem", top: "10%", left: "40%", animationDelay: "0.5s" },
  { fontSize: "3rem", bottom: "20%", left: "25%", animationDelay: "1.8s" },
  { fontSize: "7rem", bottom: "10%", right: "20%", animationDelay: "0.9s" },
];

const SUBTITLE = "Can you solve what I've devised?";

export default function Hero() {
  const { primary, primaryRgb, primaryLow, logo } = useTheme();
  const title1 = useRevealText("Securinets ISGT");
  const title2 = useRevealText("CTF");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const cols = Math.floor(w / 28);
    const drops = Array(cols).fill(0);
    const chars = "?01ABCDEF#@!<>";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = `rgba(${primaryRgb},0.07)`;
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 28, y * 18);
        if (y * 18 > h && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      });
    };

    const id = setInterval(draw, 55);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { clearInterval(id); window.removeEventListener("resize", onResize); };
  }, [primaryRgb]);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={logo}
          alt="logo"
          className="w-125 md:w-175 opacity-[0.5] blur-[2px] mix-blend-screen"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "70vw",
            height: "70vw",
            background: `radial-gradient(circle, rgba(${primaryRgb},0.07) 0%, transparent 70%)`,
          }}
        />
      </div>

      {qmarks.map((style, i) => (
        <FloatingQMark key={i} style={style} color={primary} />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(${primaryRgb},0.015) 2px, rgba(${primaryRgb},0.015) 4px)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-px" style={{ background: primary, boxShadow: `0 0 8px ${primary}` }} />
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: primary }}>
            Securinets.ISGT · 2026
          </span>
          <div className="w-12 h-px" style={{ background: primary, boxShadow: `0 0 8px ${primary}` }} />
        </div>

        <div className="flex flex-col items-center leading-none gap-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white">
            {title1}
          </h1>
          <h1
            className="font-black uppercase select-none"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "0.12em",
              color: primary,
              textShadow: `0 0 10px rgba(${primaryRgb},0.3)`,
              fontFamily: "'Impact', 'Arial Black', sans-serif",
            }}
          >
            {title2}
          </h1>
        </div>

        <p
          className="font-mono text-gray-400 max-w-lg"
          style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", letterSpacing: "0.06em" }}
        >
          {SUBTITLE}
        </p>

        <div className="flex items-center gap-4">
          <div className="w-20 h-px" style={{ background: `linear-gradient(to right, transparent, ${primary})` }} />
          <span className="text-2xl font-black" style={{ color: primary, textShadow: `0 0 12px ${primary}` }}>?</span>
          <div className="w-20 h-px" style={{ background: `linear-gradient(to left, transparent, ${primary})` }} />
        </div>

        <div className="flex gap-10 md:gap-16">
          {[
            { val: "8+", label: "Categories" },
            { val: "20+", label: "Challenges" },
            { val: "\u221e", label: "Riddles" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="font-black text-white"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  fontFamily: "'Impact', sans-serif",
                  textShadow: `0 0 20px rgba(${primaryRgb},0.4)`,
                }}
              >
                {val}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase opacity-80" style={{ color: primary }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => handleScroll("#about")}
            className="px-8 py-3.5 font-black font-mono text-sm uppercase tracking-widest transition-all duration-300 active:scale-95"
            style={{
              background: primary,
              color: "black",
              fontFamily: "'Impact', sans-serif",
              letterSpacing: "0.2em",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.boxShadow = `0 0 20px rgba(${primaryRgb},0.4)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = primary; e.currentTarget.style.boxShadow = "none"; }}
          >
            Decode Now
          </button>
          <button
            onClick={() => handleScroll("#categories")}
            className="px-8 py-3.5 font-mono text-sm uppercase tracking-widest transition-all duration-300 active:scale-95"
            style={{ border: `1px solid rgba(${primaryRgb},0.5)`, color: primary }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.boxShadow = `0 0 20px rgba(${primaryRgb},0.2)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `rgba(${primaryRgb},0.5)`; e.currentTarget.style.boxShadow = "none"; }}
          >
            View Challenges
          </button>
        </div>

        <div className="flex flex-col items-center gap-1 mt-4 opacity-50">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: primary }}>Scroll</span>
          <div className="w-px h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, ${primary}, transparent)` }} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.4), transparent)` }} />
    </section>
  );
}
