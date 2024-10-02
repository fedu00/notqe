"use client";
import { createContext, useContext, useState, useEffect } from "react";

enum AppModeTypes {
  DARK = "dark",
  LIGHT = "light",
}

interface ThemeContextType {
  theme: AppModeTypes;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: AppModeTypes.DARK,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(AppModeTypes.DARK);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDarkMode ? AppModeTypes.DARK : AppModeTypes.LIGHT);
  }, []);

  const toggleTheme = () => {
    setTheme(
      theme === AppModeTypes.DARK ? AppModeTypes.LIGHT : AppModeTypes.DARK
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
