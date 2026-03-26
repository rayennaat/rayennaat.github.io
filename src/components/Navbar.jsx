import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Categories", href: "#categories" },
];

export default function Navbar() {

  // ✔ HOOKS MUST BE CALLED INSIDE THE COMPONENT
  const { logo, isBatman, setTheme, primary, primaryFaint, primaryGlow, primaryHalf } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [joinHovered, setJoinHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navStyle = scrolled
    ? {
        backgroundColor: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${primaryFaint}`,
        boxShadow: `0 0 30px ${primaryGlow}`,
      }
    : {};

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <img
            src={logo}
            alt="logo"
            className="w-20 object-contain transition-all duration-300 group-hover:scale-105"
            style={{ filter: `drop-shadow(0 0 6px ${primary})` }}
          />
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-base tracking-widest uppercase">
              SECURINETS ISGT
            </span>
            <span
              className="text-xs tracking-[0.3em] uppercase font-mono transition-colors duration-500"
              style={{ color: primary }}
            >
              CTF
            </span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative font-mono text-sm uppercase tracking-widest transition-colors duration-300"
                style={{ color: hoveredLink === link.label ? primary : "#9ca3af" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: hoveredLink === link.label ? "100%" : "0%",
                    backgroundColor: primary,
                    boxShadow: `0 0 6px ${primary}`,
                  }}
                />
              </a>
            </li>
          ))}

          <li>
            <a
              href="#categories"
              onClick={(e) => handleNav(e, "#categories")}
              onMouseEnter={() => setJoinHovered(true)}
              onMouseLeave={() => setJoinHovered(false)}
              className="px-5 py-2 font-mono text-sm uppercase tracking-widest transition-all duration-300"
              style={{
                border: `1px solid ${primary}`,
                color: joinHovered ? "black" : primary,
                backgroundColor: joinHovered ? primary : "transparent",
                boxShadow: joinHovered ? `0 0 20px ${primaryHalf}` : "none",
              }}
            >
              Join Now
            </a>
          </li>

          <li>
            <button
              onClick={() => setTheme(isBatman ? "riddler" : "batman")}
              className="px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm"
              style={{
                border: `1px solid ${primary}`,
                color: primary,
                boxShadow: `0 0 10px ${primaryFaint}`,
              }}
            >
              {isBatman ? "Riddler" : "Batman"}
            </button>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="w-6 h-0.5 transition-all duration-300" style={{ backgroundColor: primary, transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
          <span className="w-6 h-0.5 transition-all duration-300" style={{ backgroundColor: primary, opacity: menuOpen ? 0 : 1 }} />
          <span className="w-6 h-0.5 transition-all duration-300" style={{ backgroundColor: primary, transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-md"
        style={{
          maxHeight: menuOpen ? "300px" : "0px",
          borderTop: menuOpen ? `1px solid ${primaryFaint}` : "none",
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="font-mono text-sm uppercase tracking-widest"
                style={{ color: "#9ca3af" }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#categories"
              onClick={(e) => handleNav(e, "#categories")}
              className="inline-block px-5 py-2 font-mono text-sm uppercase tracking-widest transition-all duration-300"
              style={{ border: `1px solid ${primary}`, color: primary }}
            >
              Join Now
            </a>
          </li>
          <li>
            <button
              onClick={() => setTheme(isBatman ? "riddler" : "batman")}
              className="px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300"
              style={{ border: `1px solid ${primary}`, color: primary }}
            >
              {isBatman ? "Riddler" : "Batman"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
