import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("riddler");

  const isBatman = theme === "batman";

  // Theme colors
  const primary      = isBatman ? "#e63329" : "#00ff41";
  const primaryRgb   = isBatman ? "230,51,41" : "0,255,65";
  const primaryFaint = `rgba(${primaryRgb},0.2)`;
  const primaryGlow  = `rgba(${primaryRgb},0.08)`;
  const primaryHalf  = `rgba(${primaryRgb},0.5)`;
  const primaryLow   = `rgba(${primaryRgb},0.3)`;

  // Logo switching (FIXED)
  const riddlerLogo = "/landing_page/logo.png";
  const batmanLogo  = "/landing_page/batman_logo.png";
  const logo = isBatman ? batmanLogo : riddlerLogo;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isBatman,
        primary,
        primaryRgb,
        primaryFaint,
        primaryGlow,
        primaryHalf,
        primaryLow,
        logo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}