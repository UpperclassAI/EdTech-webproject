// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(
//     () => localStorage.getItem("theme") || "dark"
//   );

//   useEffect(() => {
//     localStorage.setItem("theme", theme);

//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeContext);









// import { createContext, useContext, useEffect, useState } from "react";
// import { useSettings } from "./SettingsContext";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(
//     () => localStorage.getItem("theme") || "dark"
//   );

//   useEffect(() => {
//     const root = document.documentElement;

//     root.classList.add("transition-colors", "duration-500");

//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeContext);











// context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { settings, updateSetting } = useSettings();
  
  // Initialize theme from localStorage or settings
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // Sync theme with settings
  useEffect(() => {
    if (settings?.themeMode && settings.themeMode !== theme) {
      setTheme(settings.themeMode);
    }
  }, [settings?.themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Add transition classes
    root.classList.add("transition-colors", "duration-500");
    
    // Apply theme
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
    
    // Update settings if different
    if (settings && settings.themeMode !== theme) {
      updateSetting("themeMode", theme);
    }
  }, [theme, settings]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);