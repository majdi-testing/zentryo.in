'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Loader2, Globe, AlertTriangle } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import type { ExternalProduct } from '@/types';

interface ExternalResultsProps {
  query: string;
}

export function ExternalResults({ query }: ExternalResultsProps) {
  const [products, setProducts] = useState<ExternalProduct[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const fetchIdRef = useRef(0);

  const fetchExternal = useCallback(async (pageNum: number, fetchId: number) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/external-search?q=${encodeURIComponent(query)}&page=${pageNum}`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      if (fetchId !== fetchIdRef.current) return;
      if (data.data?.length) {
        setProducts(prev => pageNum === 1 ? data.data : [...prev, ...data.data]);
        setHasMore(pageNum < data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch {
      if (fetchId === fetchIdRef.current) {
        setError(true);
        setHasMore(false);
      }
    } finally {
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
        setInitialLoading(false);
      }
    }
  }, [query]);

  useEffect(() => {
    if (!query.trim()) return;
    fetchIdRef.current += 1;
    const currentFetchId = fetchIdRef.current;
    const timer = setTimeout(() => {
      setPage(1);
      setInitialLoading(true);
      setProducts([]);
      setHasMore(true);
      setError(false);
      fetchExternal(1, currentFetchId);
    }, 0);
    return () => clearTimeout(timer);
  }, [query, fetchExternal]);

  useEffect(() => {
    if (!query.trim()) return;
    const el = loaderRef.current;
    if (!el || !hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          const currentFetchId = fetchIdRef.current;
          const timer = setTimeout(() => {
            fetchExternal(nextPage, currentFetchId);
          }, 0);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [query, page, hasMore, loading, fetchExternal]);

  if (!query.trim()) return null;
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
        <span className="ml-3 text-sm text-muted-foreground">Searching external sources...</span>
      </div>
    );
  }
  if (error && products.length === 0) return null;
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-5 w-5 text-cyan-600" />
        <h2 className="text-xl font-bold text-navy-900">Sourced Products</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          Network-wide
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isExternal />
        ))}
      </div>
      <div ref={loaderRef} className="flex justify-center items-center py-8 gap-2">
        {loading && (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />
            <span className="text-sm text-muted-foreground">Loading more...</span>
          </>
        )}
        {!hasMore && products.length > 0 && (
          <span className="text-xs text-muted-foreground">Showing all sourced results</span>
        )}
        {error && (
          <div className="flex items-center gap-2 text-amber-600 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>Could not load more results</span>
          </div>
        )}
      </div>
    </div>
  );
}
