'use client';

import { useState, useRef, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, Phone, Mail, ChevronDown, Search, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';
import { mainNavItems, siteInfo } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SearchCommand } from '@/components/layout/search-command';

const NAV_ITEMS = mainNavItems;
const SITE_INFO = siteInfo;

const DropdownContent = memo(function DropdownContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
});

export function Header() {
  const { isScrolled } = useScroll(50);
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
          isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        )}
      >
        <div
          className={cn(
            'hidden lg:block overflow-hidden transition-all duration-300',
            isScrolled ? 'h-0 opacity-0' : 'h-auto opacity-100'
          )}
        >
          <div className="bg-navy-900 text-white text-xs">
            <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
              <span className="font-medium text-cyan-400 tracking-wider uppercase">{SITE_INFO.tagline}</span>
              <div className="flex items-center gap-6">
                <a href={`tel:${SITE_INFO.phone}`} className="flex items-center gap-1.5 text-steel-200 hover:text-cyan-400 transition-colors">
                  <Phone className="h-3 w-3" /> <span>{SITE_INFO.phone}</span>
                </a>
                <a href={`mailto:${SITE_INFO.email}`} className="flex items-center gap-1.5 text-steel-200 hover:text-cyan-400 transition-colors">
                  <Mail className="h-3 w-3" /> <span>{SITE_INFO.email}</span>
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
                        isScrolled ? 'text-navy-800 hover:text-cyan-600 hover:bg-navy-50' : 'text-white/90 hover:text-white hover:bg-white/10'
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
                        isScrolled ? 'text-navy-800 hover:text-cyan-600 hover:bg-navy-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.children && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-1 w-[640px] bg-white rounded-xl shadow-xl border border-steel-100 p-5 grid grid-cols-3 gap-4"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.children.map((category) => (
                        <div key={category.name}>
                          <Link href={category.slug} className="block text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-2 hover:text-cyan-700 transition-colors">
                            {category.name}
                          </Link>
                          <ul className="space-y-1">
                            {category.items?.map((subItem) => (
                              <li key={subItem.name}>
                                <Link href={subItem.slug} className="block text-sm text-steel-600 hover:text-navy-900 hover:bg-navy-50 rounded-md px-2 py-1.5 transition-colors">
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className={cn('p-2 rounded-lg transition-colors',
                  isScrolled ? 'text-steel-600 hover:text-navy-900 hover:bg-navy-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link href="/rfq" className={cn('hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
                isScrolled ? 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm' : 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25'
              )}>
                Request Quote
              </Link>

              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <button className={cn('lg:hidden p-2 rounded-lg transition-colors',
                    isScrolled ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10'
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
