import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import sponsor1 from "../assets/logo_ODDO.png";
import sponsor2 from "../assets/logo_4C_ISG.png";
import sponsor3 from "../assets/isg.png";

const sponsors = [
  { name: "Sponsor One",   img: sponsor1, tier: "Gold"   },
  { name: "Sponsor Two",   img: sponsor2, tier: "Silver" },
  { name: "Sponsor Three", img: sponsor3, tier: "Bronze" },
];

const marqueeItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

const tierColors = {
  Gold:   { border: "#ffd700", glow: "rgba(255,215,0,0.3)",   label: "#ffd700" },
  Silver: { border: "#c0c0c0", glow: "rgba(192,192,192,0.25)", label: "#c0c0c0" },
  Bronze: { border: "#cd7f32", glow: "rgba(205,127,50,0.25)",  label: "#cd7f32" },
};

function SponsorCard({ sponsor }) {
  const colors = tierColors[sponsor.tier];
  return (
    <div className="relative flex-shrink-0 flex flex-col items-center justify-center gap-4 mx-6 group cursor-default" style={{ width: "220px" }}>
      <div
        className="relative w-full flex flex-col items-center justify-center gap-4 p-8 border transition-all duration-500"
        style={{ borderColor: `${colors.border}30`, background: "rgba(0,0,0,0.6)" }}
      >
        <div className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: colors.border }} />
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 font-mono text-xs uppercase tracking-widest border"
          style={{ color: colors.label, borderColor: `${colors.border}50`, background: "#000", textShadow: `0 0 8px ${colors.label}` }}
        >
          {sponsor.tier}
        </span>
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-sm transition-all duration-500" style={{ filter: "grayscale(60%) brightness(0.85)" }}>
          <img
            src={sponsor.img}
            alt={sponsor.name}
            className="w-full h-full object-contain transition-all duration-500"
            onMouseEnter={e => (e.currentTarget.style.filter = "none")}
            onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(60%) brightness(0.85)")}
          />
        </div>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: colors.label, opacity: 0.8 }}>{sponsor.name}</span>
        <div className="absolute bottom-0 right-0 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: colors.border }} />
      </div>
    </div>
  );
}

export default function Sponsors() {
  const { primary, primaryRgb } = useTheme();
  const [paused, setPaused] = useState(false);

  return (
    <section id="sponsors" className="relative py-32 bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${primary} 1px, transparent 1px), linear-gradient(90deg, ${primary} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.3), transparent)` }} />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: primary }}>02 /</span>
          <h2 className="text-white font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: "-0.02em" }}>
            Our{" "}
            <span style={{ color: primary, textShadow: `0 0 30px rgba(${primaryRgb},0.5)` }}>Sponsors</span>
          </h2>
          <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, rgba(${primaryRgb},0.4), transparent)` }} />
        </div>
        <p className="font-mono text-gray-500 text-sm tracking-wider max-w-xl">
          The organizations that help make Riddler CTF possible. Without them, Gotham stays dark.
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden py-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />
        <div
          className="flex"
          style={{
            animation: "marquee 24s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {marqueeItems.map((sponsor, i) => (
            <SponsorCard key={i} sponsor={sponsor} />
          ))}
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
        style={{ border: `1px solid rgba(${primaryRgb},0.15)`, background: `rgba(${primaryRgb},0.02)` }}
      >
        <div>
          <h3 className="text-white font-black uppercase text-2xl mb-1" style={{ fontFamily: "'Impact', sans-serif" }}>Become a Sponsor</h3>
          <p className="font-mono text-gray-500 text-sm tracking-wide">Join the ranks of Gotham's most powerful allies. Get visibility in front of 500+ hackers.</p>
        </div>
        <a
          href="mailto:contact@riddlerctf.com"
          className="flex-shrink-0 px-8 py-3.5 font-mono text-sm uppercase tracking-widest transition-all duration-300"
          style={{ border: `1px solid ${primary}`, color: primary }}
          onMouseEnter={e => { e.currentTarget.style.background = primary; e.currentTarget.style.color = "black"; e.currentTarget.style.boxShadow = `0 0 30px rgba(${primaryRgb},0.4)`; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = primary; e.currentTarget.style.boxShadow = "none"; }}
        >
          Contact Us →
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.3), transparent)` }} />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
