import React, { useEffect, useState } from 'react';

interface ThemeToggleProps {}

export const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg 
                 hover:scale-110 transition-all duration-200 z-50"
      aria-label="Toggle theme"
    >
      <span className="text-2xl">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};
