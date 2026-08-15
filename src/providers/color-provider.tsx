'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

interface ColorTheme {
  id: string;
  name: string;
  swatch: string;
  scale: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

const colorThemes: ColorTheme[] = [
  {
    id: 'cyan',
    name: 'Cyan Blue',
    swatch: '#3b82f6',
    scale: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  {
    id: 'navy',
    name: 'Navy',
    swatch: '#1a4b9e',
    scale: {
      50: '#eef4ff',
      100: '#d9e6ff',
      200: '#b3c9f0',
      300: '#7fa3e0',
      400: '#4d7dcf',
      500: '#2a5fc1',
      600: '#1a4b9e',
      700: '#153b7e',
      800: '#0f2b5c',
      900: '#0a1f42',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    swatch: '#10b981',
    scale: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
  },
  {
    id: 'teal',
    name: 'Teal',
    swatch: '#14b8a6',
    scale: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
  },
  {
    id: 'amber',
    name: 'Amber',
    swatch: '#f59e0b',
    scale: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
  },
  {
    id: 'orange',
    name: 'Orange',
    swatch: '#f97316',
    scale: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
  },
  {
    id: 'violet',
    name: 'Violet',
    swatch: '#8b5cf6',
    scale: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    swatch: '#f43f5e',
    scale: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    },
  },
];

interface ColorContextType {
  color: string;
  setColor: (id: string) => void;
  colorThemes: ColorTheme[];
  getCurrentTheme: () => ColorTheme | undefined;
}

const ColorContext = createContext<ColorContextType>({
  color: 'cyan',
  setColor: () => {},
  colorThemes,
  getCurrentTheme: () => undefined,
});

const STORAGE_KEY = 'zentryo-color';

function applyColor(theme: ColorTheme) {
  const root = document.documentElement.style;
  const prefix = '--c-cyan';
  root.setProperty(`${prefix}-50`, theme.scale[50]);
  root.setProperty(`${prefix}-100`, theme.scale[100]);
  root.setProperty(`${prefix}-200`, theme.scale[200]);
  root.setProperty(`${prefix}-300`, theme.scale[300]);
  root.setProperty(`${prefix}-400`, theme.scale[400]);
  root.setProperty(`${prefix}-500`, theme.scale[500]);
  root.setProperty(`${prefix}-600`, theme.scale[600]);
  root.setProperty(`${prefix}-700`, theme.scale[700]);
  root.setProperty(`${prefix}-800`, theme.scale[800]);
  root.setProperty(`${prefix}-900`, theme.scale[900]);
  root.setProperty('--color-accent', theme.scale[500]);
  root.setProperty('--color-accent-dark', theme.scale[600]);
  document.documentElement.setAttribute('data-color', theme.id);
  localStorage.setItem(STORAGE_KEY, theme.id);
}

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColorState] = useState<string>('cyan');
  const initialized = useRef(false);

  const setColor = useCallback((colorId: string) => {
    const theme = colorThemes.find((t) => t.id === colorId);
    if (!theme) return;
    applyColor(theme);
    setColorState(colorId);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const stored = localStorage.getItem(STORAGE_KEY);
    const theme = colorThemes.find((t) => t.id === stored) || colorThemes[0];
    applyColor(theme);
    setColorState(theme.id);
  }, []);

  const getCurrentTheme = useCallback(() => {
    return colorThemes.find((t) => t.id === color);
  }, [color]);

  return (
    <ColorContext.Provider value={{ color, setColor, colorThemes, getCurrentTheme }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext);