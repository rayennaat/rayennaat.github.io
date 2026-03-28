import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Categories", href: "#categories" },
];


const socials = [
  {
    name: "Discord",
    href: "https://discord.gg/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.013.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583871901979",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/securinetsisg/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/securinets-isgt/posts/?feedView=all",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];
function handleNav(e, href) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const { logo, primary, primaryRgb } = useTheme();  // ✔ VALID

  const [year] = useState(new Date().getFullYear());
  const [topVisible, setTopVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setTopVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <footer className="relative bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${primaryRgb},0.5), transparent)` }} />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(${primary} 1px, transparent 1px), linear-gradient(90deg, ${primary} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

          <div className="flex flex-col gap-6">
            <a href="#hero" onClick={(e) => handleNav(e, "#hero")} className="flex items-center gap-3 group w-fit">
              <img
                src={logo}
                alt="logo"
                className="w-15 h-15 object-contain transition-all duration-300 group-hover:scale-105"
                style={{ filter: `drop-shadow(0 0 6px ${primary})` }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-xl tracking-widest uppercase">Securinets ISGT</span>
                <span className="text-xs tracking-[0.35em] uppercase font-mono" style={{ color: primary }}>CTF · {year}</span>
              </div>
            </a>
            <p className="font-mono text-gray-600 text-sm leading-relaxed max-w-xs">
              A Capture-The-Flag competition built around the mind of Gotham's most dangerous puzzle-maker.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-gray-600 transition-all duration-300"
                  onMouseEnter={e => { e.currentTarget.style.color = primary; e.currentTarget.style.borderColor = `rgba(${primaryRgb},0.5)`; e.currentTarget.style.boxShadow = `0 0 12px rgba(${primaryRgb},0.2)`; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: primary }}>Navigate</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="group flex items-center gap-2 font-mono text-sm text-gray-500 transition-colors duration-300 uppercase tracking-widest"
                    onMouseEnter={e => e.currentTarget.style.color = primary}
                    onMouseLeave={e => e.currentTarget.style.color = ""}
                  >
                    <span className="w-0 h-px transition-all duration-300 group-hover:w-4" style={{ background: primary }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: primary }}>Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-lg" style={{ color: primary }}>✉</span>
                <div>
                  <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-0.5">Email</p>
                  <a href="mailto:contact@riddlerctf.com" target="_blank" className="font-mono text-sm text-gray-400 transition-colors duration-300" onMouseEnter={e => e.currentTarget.style.color = primary} onMouseLeave={e => e.currentTarget.style.color = ""}>
                    securinetsisgtunis@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-lg" style={{ color: primary }}>💬</span>
                <div>
                  <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-0.5">Discord</p>
                  <a href="https://discord.gg/" target="_blank" className="font-mono text-sm text-gray-400 transition-colors duration-300" onMouseEnter={e => e.currentTarget.style.color = primary} onMouseLeave={e => e.currentTarget.style.color = ""}>
                    https://discord.gg/
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-lg" style={{ color: primary }}>📍</span>
                <div>
                  <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-0.5">Location</p>
                  <span className="font-mono text-sm text-gray-400">On-site · ISGT Tunis</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-gray-700 text-xs tracking-wider">© {year} Riddler CTF · All riddles reserved.</p>
          <p className="font-mono text-gray-700 text-xs tracking-wider text-center">
            <span className="opacity-60" style={{ color: primary }}>?</span>
            {" "}Built with chaos, caffeine, and ciphers.{" "}
            <span className="opacity-60" style={{ color: primary }}>?</span>
          </p>
          <p className="font-mono text-gray-700 text-xs tracking-wider">
            Inspired by{" "}
            <span className="opacity-60" style={{ color: primary }}>The Batman · 2022</span>
          </p>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-10 h-10 flex items-center justify-center transition-all duration-300 z-50 ${topVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{ border: `1px solid rgba(${primaryRgb},0.4)`, color: primary }}
        onMouseEnter={e => { e.currentTarget.style.background = primary; e.currentTarget.style.color = "black"; e.currentTarget.style.boxShadow = `0 0 20px rgba(${primaryRgb},0.5)`; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = primary; e.currentTarget.style.boxShadow = "none"; }}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
