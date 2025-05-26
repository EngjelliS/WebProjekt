import { createContext, useState, useEffect, useContext } from 'react';

// Theme Context erstellen
export const ThemeContext = createContext();

// Theme Provider Komponente
export const ThemeProvider = ({ children }) => {
  // Theme aus localStorage lesen oder Standard (light) setzen
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Theme umschalten
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Theme-Attribut im HTML setzen, wenn sich das Theme ändert
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook für einfachen Zugriff auf das Theme
export const useTheme = () => useContext(ThemeContext);