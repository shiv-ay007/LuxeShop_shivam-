import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('luxeshop_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('luxeshop_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('luxeshop_theme', 'light');
    }
  }, [isDark]);

  return [isDark, setIsDark];
};
