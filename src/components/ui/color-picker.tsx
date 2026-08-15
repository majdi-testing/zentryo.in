'use client';

import { useState, useRef, useEffect } from 'react';
import { Circle, Check } from 'lucide-react';
import { useColor } from '@/providers/color-provider';
import { cn } from '@/lib/utils';

export function ColorPicker({ className }: { className?: string }) {
  const { color, setColor, colorThemes, getCurrentTheme } = useColor();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        !btnRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const currentTheme = getCurrentTheme();

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-lg transition-colors',
          className || 'text-steel-600 hover:text-navy-900 hover:bg-navy-50'
        )}
        aria-label="Change color theme"
        title="Change color theme"
      >
        {currentTheme ? (
          <span
            className="w-3.5 h-3.5 rounded-full border-2 border-current opacity-80 shadow-sm"
            style={{ background: currentTheme.swatch }}
          />
        ) : (
          <Circle className="w-[18px] h-[18px] fill-current" />
        )}
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-[calc(100%+10px)] right-0 bg-popover text-popover-foreground border border-border rounded-xl p-4 shadow-2xl min-w-[240px] z-[100]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center mb-3">
            Color Themes
          </p>
          <div className="grid grid-cols-4 gap-2">
            {colorThemes.map((theme) => {
              const isActive = color === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setColor(theme.id);
                    setOpen(false);
                  }}
                  className={cn(
                    'group relative w-full aspect-square rounded-md border-2 cursor-pointer transition-transform duration-200',
                    isActive
                      ? 'border-ring'
                      : 'border-border/50 hover:border-muted-foreground hover:scale-105'
                  )}
                  style={{ background: theme.swatch }}
                  title={theme.name}
                >
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      <Check className="w-3 h-3 text-[#ffffff]" />
                    </span>
                  )}
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {theme.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}