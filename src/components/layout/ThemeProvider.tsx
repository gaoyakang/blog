"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#0c0c0c",
} as const;

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: "dark", setTheme: () => {} });

function getSnapshot(): Theme {
  const stored = localStorage.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
}

function animateThemeChange(newTheme: Theme, onDone: () => void) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    onDone();
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "theme-transition-overlay";
  overlay.style.backgroundColor = THEME_COLORS[newTheme];
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("theme-transition-overlay--active");
    });
  });

  const finish = () => {
    overlay.removeEventListener("transitionend", finish);
    overlay.remove();
    onDone();
  };

  overlay.addEventListener("transitionend", finish);
  window.setTimeout(finish, 900);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const transitioning = useRef(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme || transitioning.current) return;

    transitioning.current = true;

    const commit = () => {
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
      window.dispatchEvent(new Event("storage"));
      transitioning.current = false;
    };

    animateThemeChange(newTheme, commit);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
