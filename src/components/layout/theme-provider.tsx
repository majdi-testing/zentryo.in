'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import Script from 'next/script';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

const STORAGE_KEY = 'theme';
const THEME_SCRIPT_ID = 'theme-init';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, []);

  return (
    <>
      <Script
        id={THEME_SCRIPT_ID}
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){try{var e=localStorage.getItem('${STORAGE_KEY}');if(!e||'dark'!==e&&'light'!==e){e=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark','dark'===e)}catch(e){}}()`,
        }}
      />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
      </ThemeContext.Provider>
    </>
  );
}

export const useTheme = () => useContext(ThemeContext);
