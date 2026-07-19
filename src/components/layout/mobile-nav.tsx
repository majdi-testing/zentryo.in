'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Phone, Mail, MapPin, Search, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavItems, siteInfo } from '@/constants/navigation';

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-steel-100">
        <Link
          href="/"
          className="flex items-center mb-4"
          onClick={onClose}
        >
          <Image src="/images/logo.png" alt="ZENTRYO" width={160} height={46} className="object-contain" />
        </Link>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-steel-50 border border-steel-200 rounded-lg text-sm text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {mainNavItems.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-navy-800 hover:bg-navy-50 transition-colors"
                    aria-expanded={expandedItems.includes(item.name)}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-steel-500 transition-transform duration-200',
                        expandedItems.includes(item.name) && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      expandedItems.includes(item.name)
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="pl-3 border-l-2 border-cyan-200 ml-4 mt-1 mb-2 space-y-1">
                      {item.children.map((category) => (
                        <div key={category.name} className="py-1">
                          <Link
                            href={category.slug}
                            onClick={onClose}
                            className="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 hover:text-cyan-700"
                          >
                            {category.name}
                          </Link>
                          {category.items && (
                            <ul className="mt-0.5 space-y-0.5">
                              {category.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.slug}
                                    onClick={onClose}
                                    className="block px-3 py-1.5 text-sm text-steel-600 hover:text-navy-900 hover:bg-navy-50 rounded-md transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.slug}
                  onClick={onClose}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-navy-800 hover:bg-navy-50 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-steel-100 p-4 space-y-3">
        <Link
          href="/rfq"
          onClick={onClose}
          className="block w-full text-center px-4 py-2.5 bg-cyan-500 text-white rounded-lg text-sm font-semibold hover:bg-cyan-600 transition-colors"
        >
          Request a Quote
        </Link>
        <div className="space-y-2">
          <a
            href={`tel:${siteInfo.phone}`}
            className="flex items-center gap-2.5 text-sm text-steel-600 hover:text-navy-900 transition-colors"
          >
            <Phone className="h-4 w-4 text-cyan-500 shrink-0" />
            <span>{siteInfo.phone}</span>
          </a>
          <a
            href={`mailto:${siteInfo.email}`}
            className="flex items-center gap-2.5 text-sm text-steel-600 hover:text-navy-900 transition-colors"
          >
            <Mail className="h-4 w-4 text-cyan-500 shrink-0" />
            <span>{siteInfo.email}</span>
          </a>
          <div className="flex items-start gap-2.5 text-sm text-steel-600">
            <MapPin className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
            <span>{siteInfo.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
