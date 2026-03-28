import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

import sponsor1 from "../assets/logo_ODDO.png";
import sponsor2 from "../assets/logo_4C_ISG.png";
import sponsor3 from "../assets/isg.png";

const sponsors = [
  { name: "ODDO BHF",  img: sponsor1 },
  { name: "4C ISG",    img: sponsor2 },
  { name: "ISG",       img: sponsor3 },
];

const marqueeItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

export default function Sponsors() {
  const { primary, primaryRgb } = useTheme();
  const [paused, setPaused] = useState(false);

  return (
    <section id="sponsors" className="relative py-32 bg-black overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${primary} 1px, transparent 1px), linear-gradient(90deg, ${primary} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.3), transparent)` }} />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.3), transparent)` }} />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: primary }}>02 /</span>
          <h2
            className="text-white font-black uppercase"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: "-0.02em" }}
          >
            Our{" "}
            <span style={{ color: primary, textShadow: `0 0 30px rgba(${primaryRgb},0.5)` }}>
              Sponsors
            </span>
          </h2>
          <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, rgba(${primaryRgb},0.4), transparent)` }} />
        </div>
        <p className="font-mono text-gray-500 text-sm tracking-wider max-w-xl">
          The organizations that help make Riddler CTF possible. Without them, Gotham stays dark.
        </p>
      </div>

      {/* Marquee */}
      <div
        className="relative w-full overflow-hidden py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
        />

        {/* Track */}
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 28s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {marqueeItems.map((sponsor, i) => (
            <div
              key={i}
              style={{
                width: "220px",
                height: "110px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "48px",
                marginRight: "48px",
              }}
            >
              <img
                src={sponsor.img}
                alt={sponsor.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  filter: "grayscale(50%) brightness(0.85)",
                  transition: "filter 0.4s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%) brightness(1)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(50%) brightness(0.85)")}
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Become a Sponsor CTA */}
      <div
        className="max-w-7xl mx-auto px-6 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
        style={{ border: `1px solid rgba(${primaryRgb},0.15)`, background: `rgba(${primaryRgb},0.02)` }}
      >
        <div>
          <h3 className="text-white font-black uppercase text-2xl mb-1" style={{ fontFamily: "'Impact', sans-serif" }}>
            Become a Sponsor
          </h3>
          <p className="font-mono text-gray-500 text-sm tracking-wide">
            Join the ranks of Gotham's most powerful allies. Get visibility in front of 500+ hackers.
          </p>
        </div>
        <a
          href="mailto:contact@riddlerctf.com"
          className="flex-shrink-0 px-8 py-3.5 font-mono text-sm uppercase tracking-widest transition-all duration-300"
          style={{ border: `1px solid ${primary}`, color: primary }}
          onMouseEnter={e => {
            e.currentTarget.style.background = primary;
            e.currentTarget.style.color = "black";
            e.currentTarget.style.boxShadow = `0 0 30px rgba(${primaryRgb},0.4)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = primary;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Contact Us →
        </a>
      </div>
    </section>
  );
}