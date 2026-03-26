import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const RIDDLES = [
  "I have cities, but no houses live there. I have mountains, but no trees grow. I have water, but no fish swim. I have roads, but no cars drive. What am I?",
  "The more you take, the more you leave behind. What am I?",
  "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const facts = [
  { icon: "🗂️", title: "8+ Categories", desc: "From Web to Crypto, test your skills across all domains." },
  { icon: "🧩", title: "20+ Challenges", desc: "Riddles disguised as flags. Each one harder than the last." },
  { icon: "🌍", title: "Open to All", desc: "Teams of up to 4. Beginners welcome. Legends expected." },
  { icon: "🏆", title: "Big Prizes", desc: "Cash, swag, and eternal bragging rights await the sharpest minds." },
];

export default function About() {
  const { primary, primaryRgb } = useTheme();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setRevealed(false);
      setTimeout(() => setRiddleIdx((i) => (i + 1) % RIDDLES.length), 500);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden py-32 px-6"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${primary} 1px, transparent 1px), linear-gradient(90deg, ${primary} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-64" style={{ background: `linear-gradient(to bottom, transparent, ${primary}, transparent)` }} />

      <div className="max-w-7xl mx-auto w-full">
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: primary }}>01 /</span>
          <h2
            className="text-white font-black uppercase"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: "-0.02em" }}
          >
            About the{" "}
            <span style={{ color: primary, textShadow: `0 0 30px rgba(${primaryRgb},0.5)` }}>CTF</span>
          </h2>
          <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, rgba(${primaryRgb},0.4), transparent)` }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className={`flex flex-col gap-8 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="pl-6 flex flex-col gap-5" style={{ borderLeft: `2px solid ${primary}` }}>
              <p className="text-gray-300 leading-relaxed" style={{ fontSize: "1.05rem" }}>
                Gotham's most dangerous intellect has escaped — and he's left his riddles scattered
                across the city's digital infrastructure. Welcome to{" "}
                <span className="font-mono font-bold" style={{ color: primary }}>Securinets ISGT CTF</span>, a
                Capture-The-Flag competition inspired by the twisted genius of Edward Nygma.
              </p>
              <p className="text-gray-400 leading-relaxed">
                This isn't just a hacking competition. It's a psychological battle. Every challenge
                is a clue. Every flag is an answer to a riddle only the sharpest minds can decode.
                Are you clever enough to outsmart the Riddler?
              </p>
              <p className="text-gray-400 leading-relaxed">
                Compete across Web Exploitation, Forensics, Cryptography, Reverse Engineering, OSINT,
                and more — all wrapped in the dark, noir atmosphere of Gotham City.
              </p>
            </div>

            <div
              className="relative p-6 transition-all duration-500 group"
              style={{
                border: `1px solid rgba(${primaryRgb},0.3)`,
                background: `rgba(${primaryRgb},0.03)`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = `rgba(${primaryRgb},0.06)`}
              onMouseLeave={e => e.currentTarget.style.background = `rgba(${primaryRgb},0.03)`}
            >
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(to right, ${primary}, transparent)` }} />
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl font-black leading-none" style={{ color: primary, textShadow: `0 0 12px ${primary}` }}>?</span>
                <span className="font-mono text-xs tracking-widest uppercase pt-2" style={{ color: primary }}>Riddler's Challenge</span>
              </div>
              <p className="font-mono text-gray-300 text-sm leading-relaxed italic">
                "{RIDDLES[riddleIdx]}"
              </p>
              <button
                onClick={() => setRevealed(!revealed)}
                className="mt-4 font-mono text-xs tracking-widest uppercase hover:underline opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: primary }}
              >
                {revealed ? "Hide answer →" : "Can you answer? →"}
              </button>
              {revealed && (
                <p className="mt-2 font-mono text-xs italic" style={{ color: `rgba(${primaryRgb},0.7)` }}>
                  {riddleIdx === 0 && "→ A map."}
                  {riddleIdx === 1 && "→ Footsteps."}
                  {riddleIdx === 2 && "→ An echo."}
                </p>
              )}
              <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: `linear-gradient(to left, rgba(${primaryRgb},0.3), transparent)` }} />
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {facts.map((f, i) => (
              <div
                key={f.title}
                className="group relative border border-white/10 p-6 bg-white/[0.02] transition-all duration-400 cursor-default"
                style={{ transitionDelay: `${i * 80}ms` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${primaryRgb},0.5)`; e.currentTarget.style.background = `rgba(${primaryRgb},0.04)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div className="absolute top-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" style={{ background: primary }} />
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="text-white font-black uppercase mb-2" style={{ fontFamily: "'Impact', sans-serif", letterSpacing: "0.05em" }}>
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{f.desc}</p>
                <div className="absolute bottom-0 right-0 w-0 h-px transition-all duration-500 group-hover:w-full" style={{ background: primary }} />
              </div>
            ))}

            <div
              className="sm:col-span-2 p-5 flex items-center justify-between gap-4 flex-wrap"
              style={{ border: `1px solid rgba(${primaryRgb},0.2)`, background: `rgba(${primaryRgb},0.03)` }}
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: primary }}>Event Date</span>
                <span className="text-white font-black uppercase text-xl" style={{ fontFamily: "'Impact', sans-serif" }}>04.04.2026</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: primary }}>Format</span>
                <span className="text-white font-mono text-sm">On-site · Jeopardy Style</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: primary }}>Team Size</span>
                <span className="text-white font-mono text-sm">4 members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.3), transparent)` }} />
    </section>
  );
}
