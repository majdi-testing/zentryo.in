'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  sku: string;
}

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MOCK_PRODUCTS: SearchResult[] = [
  { id: '1', name: 'Industrial Ball Bearing 6205-2RS', slug: '/products/bearings/ball-bearings/industrial-ball-bearing-6205-2rs', category: 'Bearings', brand: 'SKF', sku: 'ZEN-BRG-SKF-00001' },
  { id: '2', name: 'Gate Valve Class 150 DN50', slug: '/products/valves/gate-valves/gate-valve-class-150-dn50', category: 'Valves', brand: 'Emerson', sku: 'ZEN-VLV-EMR-00001' },
  { id: '3', name: 'PLC Controller S7-1200', slug: '/products/automation/plc-controllers/plc-controller-s7-1200', category: 'Automation', brand: 'Siemens', sku: 'ZEN-AUT-SIE-00001' },
  { id: '4', name: 'Pressure Transmitter 3051S', slug: '/products/automation/sensors/pressure-transmitter-3051s', category: 'Sensors', brand: 'Rosemount', sku: 'ZEN-SEN-ROS-00001' },
  { id: '5', name: 'Hydraulic Cylinder HCD-100x500', slug: '/products/hydraulics-pneumatics/cylinders/hydraulic-cylinder-hcd-100x500', category: 'Hydraulics', brand: 'Parker', sku: 'ZEN-HYD-PRK-00001' },
  { id: '6', name: 'Gas Turbine Blade GE 7FA', slug: '/products/gas-turbine-parts/blades/gas-turbine-blade-ge-7fa', category: 'Gas Turbine Parts', brand: 'GE', sku: 'ZEN-GTB-GE-00001' },
  { id: '7', name: 'Spherical Roller Bearing 22320', slug: '/products/bearings/roller-bearings/spherical-roller-bearing-22320', category: 'Bearings', brand: 'FAG', sku: 'ZEN-BRG-FAG-00001' },
  { id: '8', name: 'Butterfly Valve DN200 PN16', slug: '/products/valves/butterfly-valves/butterfly-valve-dn200-pn16', category: 'Valves', brand: 'Bray', sku: 'ZEN-VLV-BRY-00001' },
];

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lower = searchQuery.toLowerCase();
    const filtered = MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
    setTimeout(() => {
      setResults(filtered);
      setSelectedIndex(0);
      setIsSearching(false);
    }, 150);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(value), 300);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl top-[15%] translate-y-0 p-0 gap-0 rounded-xl overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 px-4 border-b border-steel-100">
          <Search className="h-5 w-5 text-steel-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, brands, categories..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 py-4 text-base text-navy-900 placeholder-steel-400 bg-transparent border-0 outline-none focus:outline-none"
            aria-label="Search products"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
          />
          {isSearching && (
            <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
          )}
        </div>

        {query && !isSearching && (
          <div
            id="search-results"
            role="listbox"
            className={cn(
              'max-h-80 overflow-y-auto',
              results.length === 0 && 'p-8 text-center'
            )}
          >
            {results.length === 0 ? (
              <p className="text-sm text-steel-500">
                No products found for &quot;{query}&quot;
              </p>
            ) : (
              <ul className="py-2">
                {results.map((result, index) => (
                  <li key={result.id} role="option" aria-selected={index === selectedIndex}>
                    <Link
                      href={result.slug}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 transition-colors',
                        index === selectedIndex
                          ? 'bg-navy-50'
                          : 'hover:bg-navy-50'
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900 truncate">
                          {result.name}
                        </p>
                        <p className="text-xs text-steel-500 mt-0.5">
                          {result.brand} &middot; {result.category} &middot;{' '}
                          <span className="font-mono">{result.sku}</span>
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-steel-400 shrink-0 ml-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {!query && (
          <div className="p-4 text-center">
            <p className="text-sm text-steel-400">
              Type to search products, brands, or categories
            </p>
          </div>
        )}

        <div className="border-t border-steel-100 px-4 py-2.5 flex items-center gap-4 text-xs text-steel-500">
          <span>
            <kbd className="px-1.5 py-0.5 rounded border border-steel-200 bg-steel-50 font-mono text-steel-600">
              &uarr;
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-steel-200 bg-steel-50 font-mono text-steel-600 ml-0.5">
              &darr;
            </kbd>
            <span className="ml-1">Navigate</span>
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded border border-steel-200 bg-steel-50 font-mono text-steel-600">
              Enter
            </kbd>
            <span className="ml-1">Open</span>
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded border border-steel-200 bg-steel-50 font-mono text-steel-600">
              Esc
            </kbd>
            <span className="ml-1">Close</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
