import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to day or saved preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mughal_theme') || 'day';
  });

  useEffect(() => {
    localStorage.setItem('mughal_theme', theme);
    const root = document.documentElement;
    if (theme === 'night') {
      root.classList.add('night-theme');
      root.classList.remove('day-theme');
    } else {
      root.classList.add('day-theme');
      root.classList.remove('night-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'day' ? 'night' : 'day'));
  };

  const isNight = theme === 'night';

  return (
    <ThemeContext.Provider value={{ theme, isNight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
