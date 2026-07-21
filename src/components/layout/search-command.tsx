'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Search, Loader2, ArrowRight, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
  isExternal?: boolean;
  rfqSlug?: string;
}

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SEARCH_CACHE = new Map<string, SearchResult[]>();
let searchCachePromise: Promise<SearchResult[]> | null = null;

async function loadAllSearchProducts(): Promise<SearchResult[]> {
  if (searchCachePromise) return searchCachePromise;
  searchCachePromise = fetch('/api/products/featured')
    .then(r => r.json())
    .then((data: { id: string; slug: string; name: string; brand: string; category: string; sku: string }[]) =>
      data.map(p => ({
        id: p.id,
        name: p.name,
        slug: `/products/${p.slug}`,
        category: p.category,
        brand: p.brand,
        sku: p.sku,
      }))
    )
    .catch(() => [])
    .finally(() => { searchCachePromise = null; });
  return searchCachePromise;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [externalResults, setExternalResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isExternalSearching, setIsExternalSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalResults = results.length + externalResults.length;

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setExternalResults([]);
      setIsSearching(false);
      setIsExternalSearching(false);
      return;
    }

    setIsSearching(true);
    setIsExternalSearching(true);
    const lower = searchQuery.toLowerCase();
    const allProducts = await loadAllSearchProducts();
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
    setResults(filtered);
    setIsSearching(false);

    try {
      const res = await fetch(`/api/external-search?q=${encodeURIComponent(searchQuery)}&page=1`);
      const data = await res.json();
      if (data.data?.length) {
        const ext: SearchResult[] = data.data.map((p: { id: string; name: string; brand: string; category: string; sku: string; shortDescription: string }) => ({
          id: `ext-${p.id}`,
          name: p.name,
          slug: `/rfq?productName=${encodeURIComponent(p.name)}&productSKU=${p.sku}`,
          category: p.category,
          brand: p.brand,
          sku: p.sku,
          isExternal: true,
          rfqSlug: `/rfq?productName=${encodeURIComponent(p.name)}&productSKU=${p.sku}`,
        }));
        setExternalResults(ext);
      }
    } catch {
      setExternalResults([]);
    } finally {
      setIsExternalSearching(false);
    }
    setSelectedIndex(0);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(value), 300);
  };

  useEffect(() => {
    if (open) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 100);
      const resetTimer = setTimeout(() => {
        setQuery('');
        setResults([]);
        setExternalResults([]);
      }, 0);
      return () => {
        clearTimeout(focusTimer);
        clearTimeout(resetTimer);
      };
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
      setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      const allResults = [...results, ...externalResults];
      if (allResults[selectedIndex]) {
        onOpenChange(false);
      }
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
            aria-expanded={totalResults > 0}
            aria-controls="search-results"
          />
          {(isSearching || isExternalSearching) && (
            <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
          )}
        </div>

        {query && (
          <div
            id="search-results"
            role="listbox"
            className={cn(
              'max-h-96 overflow-y-auto',
              totalResults === 0 && !isExternalSearching && 'p-8 text-center'
            )}
          >
            {results.length > 0 && (
              <>
                <div className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-steel-400">
                  Zentryo Catalog
                </div>
                <ul>
                  {results.map((result, index) => (
                    <li key={result.id} role="option" aria-selected={index === selectedIndex}>
                      <Link
                        href={result.slug}
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          'flex items-center justify-between px-4 py-2.5 transition-colors',
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
              </>
            )}

            {isExternalSearching && results.length > 0 && (
              <div className="px-4 py-2 flex items-center gap-2 text-xs text-cyan-600">
                <Loader2 className="h-3 w-3 animate-spin" />
                Searching network sources...
              </div>
            )}

            {externalResults.length > 0 && (
              <>
                <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
                  <Globe className="h-3 w-3" />
                  Sourced Products
                </div>
                <ul>
                  {externalResults.map((result, i) => {
                    const idx = results.length + i;
                    return (
                      <li key={result.id} role="option" aria-selected={idx === selectedIndex}>
                        <Link
                          href={result.rfqSlug || result.slug}
                          onClick={() => onOpenChange(false)}
                          className={cn(
                            'flex items-center justify-between px-4 py-2.5 transition-colors',
                            idx === selectedIndex
                              ? 'bg-cyan-50'
                              : 'hover:bg-cyan-50'
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-navy-900 truncate">
                                {result.name}
                              </p>
                              <Badge className="shrink-0 text-[10px] bg-cyan-600 text-white border-none px-1.5 py-0">
                                Sourced
                              </Badge>
                            </div>
                            <p className="text-xs text-steel-500 mt-0.5">
                              {result.brand} &middot; {result.category}
                            </p>
                          </div>
                          <span className="text-[10px] font-medium text-cyan-600 shrink-0 ml-2">
                            Get Quote
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {totalResults === 0 && !isExternalSearching && (
              <p className="text-sm text-steel-500">
                No products found for &quot;{query}&quot;
              </p>
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
