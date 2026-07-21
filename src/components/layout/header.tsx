'use client';

import { useState, useRef, useEffect, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Menu, Phone, Mail, ChevronDown, Search, Clock, Sun, Moon,
  Cog, Gauge, Cpu, Fan, Droplets, Zap, Fuel, Factory, Ship, Beaker, Pickaxe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';
import { useTheme } from '@/components/layout/theme-provider';
import { mainNavItems, siteInfo } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SearchCommand } from '@/components/layout/search-command';

const NAV_ITEMS = mainNavItems;
const SITE_INFO = siteInfo;

const categoryHighlight: Record<string, { icon: React.ReactNode; bg: string; desc: string }> = {
  'Industrial Bearings': { icon: <Cog className="h-5 w-5" />, bg: 'from-blue-50 to-blue-100 text-blue-600', desc: 'Precision bearings for every application' },
  'Industrial Valves': { icon: <Gauge className="h-5 w-5" />, bg: 'from-emerald-50 to-emerald-100 text-emerald-600', desc: 'Flow control solutions' },
  'Automation': { icon: <Cpu className="h-5 w-5" />, bg: 'from-violet-50 to-violet-100 text-violet-600', desc: 'PLC, sensors & control systems' },
  'Gas Turbine Parts': { icon: <Fan className="h-5 w-5" />, bg: 'from-orange-50 to-orange-100 text-orange-600', desc: 'Turbine blades & combustion parts' },
  'Hydraulics & Pneumatics': { icon: <Droplets className="h-5 w-5" />, bg: 'from-cyan-50 to-cyan-100 text-cyan-600', desc: 'Cylinders, pumps & manifolds' },
  'Electrical Components': { icon: <Zap className="h-5 w-5" />, bg: 'from-amber-50 to-amber-100 text-amber-600', desc: 'Switchgear, transformers & cables' },
  'By Sector': { icon: <Factory className="h-5 w-5" />, bg: 'from-navy-50 to-navy-100 text-navy-600', desc: 'Industries we serve worldwide' },
};

const DropdownContent = memo(function DropdownContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
});

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { isScrolled } = useScroll(50);
  const { theme, setTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  return (
    <>
      <header
        style={{ willChange: 'background-color' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-colors duration-300',
          isHome && !isScrolled ? 'bg-transparent' : 'bg-white shadow-sm'
        )}
      >
        <div
          className={cn(
            'hidden lg:block overflow-hidden transition-all duration-300',
            isHome && !isScrolled ? 'h-auto opacity-100' : 'h-0 opacity-0'
          )}
        >
          <div className="bg-navy-900 text-white text-xs">
            <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
              <span className="font-medium text-cyan-400 tracking-wider uppercase">{SITE_INFO.tagline}</span>
              <div className="flex items-center gap-6">
                <a href={`tel:${SITE_INFO.phone}`} className="flex items-center gap-1.5 text-steel-200 hover:text-cyan-400 transition-colors">
                  <Phone className="h-3 w-3" /> <span>{SITE_INFO.phone} | {SITE_INFO.secondaryPhone}</span>
                </a>
                <a href={`mailto:${SITE_INFO.email}`} className="flex items-center gap-1.5 text-steel-200 hover:text-cyan-400 transition-colors">
                  <Mail className="h-3 w-3" /> <span>{SITE_INFO.email} | {SITE_INFO.contactEmail}</span>
                </a>
                <span className="flex items-center gap-1.5 text-steel-200">
                  <Clock className="h-3 w-3" /> <span>Mon-Fri: 8:00 AM - 6:00 PM</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav className={cn('transition-all duration-300', isScrolled ? 'py-2' : 'py-3 lg:py-4')}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/images/logo.png" alt="ZENTRYO" width={180} height={52} className="object-contain" priority />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.children ? (
                    <button
                      className={cn('flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isHome && !isScrolled ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-navy-800 hover:text-cyan-600 hover:bg-navy-50'
                      )}
                      aria-expanded={activeDropdown === item.name}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', activeDropdown === item.name && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link href={item.slug}
                      className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isHome && !isScrolled ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-navy-800 hover:text-cyan-600 hover:bg-navy-50'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.children && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[780px] bg-white rounded-2xl shadow-2xl border border-steel-100 overflow-hidden"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                          {item.children.flatMap(cat =>
                            cat.items ? cat.items.map(sub => ({ ...sub, parentName: cat.name, parentSlug: cat.slug })) : [{ name: cat.name, slug: cat.slug, parentName: cat.name, parentSlug: cat.slug }]
                          ).slice(0, 9).map((link) => {
                            const hl = categoryHighlight[link.parentName] || categoryHighlight['Industrial Bearings'];
                            return (
                              <Link key={link.slug} href={link.slug}
                                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-steel-50 transition-all"
                              >
                                <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 transition-transform group-hover:scale-110', hl.bg)}>
                                  {hl.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors">{link.name}</div>
                                  <div className="text-xs text-steel-400 truncate">{link.parentName}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      <div className="px-6 pb-5">
                        <div className="border-t border-steel-100 pt-4 flex items-center justify-between">
                          <Link href={item.slug}
                            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name === 'Products' ? 'View All Categories →' : 'View All Industries →'}
                          </Link>
                          <Link href="/rfq"
                            className="text-sm text-steel-500 hover:text-navy-900 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Need help? Submit an RFQ →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className={cn('p-2 rounded-lg transition-colors',
                  isHome && !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-steel-600 hover:text-navy-900 hover:bg-navy-50'
                )}
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={cn('p-2 rounded-lg transition-colors',
                  isHome && !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-steel-600 hover:text-navy-900 hover:bg-navy-50'
                )}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              <Link href="/rfq" className={cn('hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
                isHome && !isScrolled ? 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25' : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm'
              )}>
                Request Quote
              </Link>

              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <button className={cn('lg:hidden p-2 rounded-lg transition-colors',
                    isHome && !isScrolled ? 'text-white hover:bg-white/10' : 'text-navy-900 hover:bg-navy-50'
                  )}
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm p-0 overflow-y-auto">
                  <MobileNav onClose={() => setMobileNavOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
