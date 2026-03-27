import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const categories = [
  {
    id: "01",
    name: "Forensics",
    icon: "🔍",
    color: "#00ff41",
    glow: "rgba(0,255,65,0.25)",
    desc: "Dig through corrupted files, memory dumps, and hidden artifacts.",
    tags: ["Disk Images", "Memory Dumps", "Steganography", "Log Analysis"],
    difficulty: "Medium",
    challenges: 6,
    riddleHint: "I hide in plain sight, yet no one can see me. What am I?",
  },
  {
    id: "02",
    name: "Web Exploitation",
    icon: "🕸️",
    color: "#ff6b35",
    glow: "rgba(255,107,53,0.25)",
    desc: "Gotham's web is full of vulnerabilities.",
    tags: ["SQL Injection", "XSS", "SSRF", "Auth Bypass"],
    difficulty: "Medium",
    challenges: 7,
    riddleHint: "I'm the door that stands open, yet no one knows it. What am I?",
  },
  {
    id: "03",
    name: "Cryptography",
    icon: "🔐",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    desc: "The Riddler loves ciphers.",
    tags: ["RSA", "AES", "Hash Cracking", "Classical Ciphers"],
    difficulty: "Hard",
    challenges: 5,
    riddleHint: "I lock without a key, I speak without a tongue. What am I?",
  },
  {
    id: "04",
    name: "OSINT",
    icon: "🌐",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.25)",
    desc: "Every villain leaves a trace.",
    tags: ["Geolocation", "Social Media", "Metadata", "People Search"],
    difficulty: "Easy",
    challenges: 4,
    riddleHint: "I am everywhere and nowhere. What am I?",
  },
  {
    id: "05",
    name: "Reverse Engineering",
    icon: "⚙️",
    color: "#facc15",
    glow: "rgba(250,204,21,0.25)",
    desc: "Tear apart binaries and understand what machines think.",
    tags: ["Disassembly", "Decompilation", "Anti-Debug", "Obfuscation"],
    difficulty: "Hard",
    challenges: 5,
    riddleHint: "I was built to be used, not understood. What am I?",
  },
  {
    id: "06",
    name: "PWN",
    icon: "💣",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.25)",
    desc: "Exploit memory corruptions.",
    tags: ["Buffer Overflow", "ROP Chains", "Heap Exploitation", "Format Strings"],
    difficulty: "Expert",
    challenges: 4,
    riddleHint: "I break what was built to hold. What am I?",
  },
  {
    id: "07",
    name: "Game PWN",
    icon: "🎮",
    color: "#34d399",
    glow: "rgba(52,211,153,0.25)",
    desc: "The Riddler hid secrets inside games.",
    tags: ["Game Hacking", "Memory Editing", "Cheat Engine", "Logic Bugs"],
    difficulty: "Medium",
    challenges: 3,
    riddleHint: "I play by the rules until the rules are mine. What am I?",
  },
  {
    id: "08",
    name: "Misc",
    icon: "🃏",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.25)",
    desc: "The wildcard. Anything goes.",
    tags: ["Puzzles", "Programming", "Trivia", "Anything"],
    difficulty: "Varies",
    challenges: 5,
    riddleHint: "I am the question with no category. What am I?",
  },
];

const difficultyColor = {
  Easy: "#34d399",
  Medium: "#facc15",
  Hard: "#f97316",
  Expert: "#f43f5e",
  Varies: "#a855f7",
};

function CategoryCard({ cat, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{
        perspective: "1000px",
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setFlipped(false); }}
    >
      <div
        className="transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transitionDelay: `${index * 70}ms`,
        }}
      >
        <div
          className="relative w-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "260px",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 w-full h-full border p-6 flex flex-col gap-4 transition-all duration-400"
            style={{
              backfaceVisibility: "hidden",
              borderColor: hovered ? `${cat.color}60` : "rgba(255,255,255,0.07)",
              background: hovered
                ? `linear-gradient(135deg, ${cat.glow} 0%, rgba(0,0,0,0.9) 60%)`
                : "rgba(255,255,255,0.02)",
              boxShadow: hovered ? `0 0 40px ${cat.glow}` : "none",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl">{cat.icon}</span>
              <span
                className="font-mono text-xs tracking-widest opacity-40"
                style={{ color: cat.color }}
              >
                {cat.id}
              </span>
            </div>

            <h3
              className="font-black uppercase text-white text-xl"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                textShadow: hovered ? `0 0 20px ${cat.color}60` : "none",
              }}
            >
              {cat.name}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed flex-1">{cat.desc}</p>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: difficultyColor[cat.difficulty],
                    boxShadow: `0 0 6px ${difficultyColor[cat.difficulty]}`,
                  }}
                />
              </div>
              <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">
                {cat.challenges} challenges
              </span>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 w-full h-full border p-6 flex flex-col gap-4"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderColor: `${cat.color}60`,
              background: `linear-gradient(135deg, ${cat.glow} 0%, rgba(0,0,0,0.95) 70%)`,
              boxShadow: `0 0 40px ${cat.glow}`,
            }}
            onClick={() => setFlipped(false)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-2xl font-black"
                style={{ color: cat.color }}
              >
                ?
              </span>
              <span className="font-mono text-xs uppercase" style={{ color: cat.color }}>
                Riddler's Hint
              </span>
            </div>

            <p className="font-mono text-gray-300 text-sm italic flex-1">
              "{cat.riddleHint}"
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 font-mono text-xs uppercase tracking-wider border"
                  style={{
                    borderColor: `${cat.color}40`,
                    color: cat.color,
                    background: `${cat.color}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-mono text-xs uppercase tracking-widest opacity-30 mt-2" style={{ color: cat.color }}>
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Categories() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  // 🎨 THEME PRIMARY (Green for Riddler, Red for Batman)
  const { primary, primaryRgb } = useTheme();

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden px-6"
    >
      {/* Background dots using THEME color */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${primary} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow blob using THEME color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "80vw",
          height: "60vw",
          background: `radial-gradient(circle, rgba(${primaryRgb},0.04) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: primary }}>
            03 /
          </span>

          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
            }}
          >
            Challenge{" "}
            <span style={{ color: primary, textShadow: `0 0 30px rgba(${primaryRgb},0.5)` }}>
              Categories
            </span>
          </h2>

          <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, rgba(${primaryRgb},0.4), transparent)` }} />
        </div>

        {/* SUB TEXT */}
        <p
          className={`font-mono text-gray-500 text-sm tracking-wider max-w-xl mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          8 domains of chaos. Each category holds a piece of the Riddler's master plan.{" "}
          <span style={{ color: primary, opacity: 0.7 }}>Click any card to reveal his riddle.</span>
        </p>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} inView={inView} />
          ))}
        </div>

        {/* BOTTOM COUNTERS */}
        <div
          className={`mt-16 flex flex-wrap gap-6 items-center justify-center border-t border-white/5 pt-10 transition-all duration-700 delay-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            { val: "8", label: "Categories" },
            { val: "39", label: "Total Challenges" },
            { val: "4", label: "Difficulty Tiers" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-8">
              <span
                className="font-black text-white"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontFamily: "'Impact', sans-serif",
                  textShadow: `0 0 30px rgba(${primaryRgb},0.3)`,
                }}
              >
                {val}
              </span>
              <span
                className="font-mono text-xs uppercase tracking-widest opacity-60"
                style={{ color: primary }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.3), transparent)` }}
      />
    </section>
  );
}