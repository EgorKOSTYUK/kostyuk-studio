import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

interface ThemeContextType {
  theme: Theme;
  preference: ThemePreference;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemePreference;
  switchable?: boolean;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialPreference(defaultTheme: ThemePreference, switchable: boolean): ThemePreference {
  if (!switchable || typeof window === "undefined") return defaultTheme;
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  switchable = false,
}: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    getInitialPreference(defaultTheme, switchable),
  );
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const transitionTimer = useRef<number | null>(null);
  const theme = preference === "system" ? systemTheme : preference;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = (event?: MediaQueryListEvent) => {
      setSystemTheme((event?.matches ?? media.matches) ? "dark" : "light");
    };

    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColor?.setAttribute("content", theme === "dark" ? "#101214" : "#f4f4ef");

    if (switchable) {
      try {
        if (preference === "system") localStorage.removeItem("theme");
        else localStorage.setItem("theme", preference);
      } catch {
        // The theme still works for the current session if storage is unavailable.
      }
    }
  }, [preference, switchable, theme]);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    document.documentElement.classList.remove("theme-transition");
  }, []);

  const toggleTheme = switchable
    ? () => {
        const root = document.documentElement;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!reducedMotion) {
          root.classList.add("theme-transition");
          void root.offsetWidth;
          if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
          transitionTimer.current = window.setTimeout(() => {
            root.classList.remove("theme-transition");
            transitionTimer.current = null;
          }, 280);
        }

        setPreference((current) => {
          const resolved = current === "system" ? systemTheme : current;
          return resolved === "light" ? "dark" : "light";
        });
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, preference, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
