'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LayoutGrid, List, SlidersHorizontal, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductPagination } from '@/components/products/product-pagination';
import { ExternalResults } from '@/components/search/external-results';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Category, Brand, PaginatedResponse, Product } from '@/types';

interface ProductListingContentProps {
  initialProducts: PaginatedResponse<Product>;
  categories: Category[];
  brands: Brand[];
}

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
  { value: 'newest', label: 'Newest First' },
];

export function ProductListingContent({ initialProducts, categories, brands }: ProductListingContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const brandFilter = searchParams.get('brand') || '';
  const availabilityFilter = searchParams.get('availability') || '';
  const currentSort = searchParams.get('sort') || 'popular';

  const toggleMobileFilters = useCallback(() => {
    setMobileFiltersOpen((prev) => !prev);
  }, []);

  const externalQuery = searchQuery || categoryFilter.replace(/-/g, ' ');

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || value === 'popular') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.set('page', '1');
      const qs = params.toString();
      router.push(qs ? `/products?${qs}` : '/products', { scroll: false });
    },
    [router, searchParams]
  );

  const hasActiveFilters = searchQuery || categoryFilter || brandFilter || availabilityFilter;

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (categoryFilter) count += categoryFilter.split(',').length;
    if (brandFilter) count += brandFilter.split(',').length;
    if (availabilityFilter) count++;
    return count;
  }, [searchQuery, categoryFilter, brandFilter, availabilityFilter]);

  const getCategoryName = useCallback(
    (slug: string) => categories.find((c) => c.slug === slug)?.name || slug,
    [categories]
  );

  const getBrandName = useCallback(
    (slug: string) => brands.find((b) => b.slug === slug)?.name || slug,
    [brands]
  );

  const filterPills = useMemo(() => {
    const pills: { label: string; onRemove: () => void }[] = [];
    if (searchQuery) {
      pills.push({
        label: `Search: "${searchQuery}"`,
        onRemove: () => updateParams({ search: null }),
      });
    }
    if (categoryFilter) {
      categoryFilter.split(',').forEach((slug) => {
        pills.push({
          label: getCategoryName(slug),
          onRemove: () => {
            const next = categoryFilter.split(',').filter((s) => s !== slug);
            updateParams({ category: next.length > 0 ? next.join(',') : null });
          },
        });
      });
    }
    if (brandFilter) {
      brandFilter.split(',').forEach((slug) => {
        pills.push({
          label: getBrandName(slug),
          onRemove: () => {
            const next = brandFilter.split(',').filter((s) => s !== slug);
            updateParams({ brand: next.length > 0 ? next.join(',') : null });
          },
        });
      });
    }
    if (availabilityFilter) {
      pills.push({
        label: availabilityFilter.replace(/-/g, ' '),
        onRemove: () => updateParams({ availability: null }),
      });
    }
    return pills;
  }, [searchQuery, categoryFilter, brandFilter, availabilityFilter, getCategoryName, getBrandName, updateParams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Mobile filter sheet */}
      <div className="lg:hidden flex items-center justify-between mb-2">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-navy-800 text-white text-[10px] font-medium">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProductFilters categories={categories} brands={brands} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-8 w-8"
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Filters sidebar */}
      <aside className="hidden lg:block">
        <ProductFilters categories={categories} brands={brands} />
      </aside>

      {/* Main content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {initialProducts.total} product{initialProducts.total !== 1 ? 's' : ''}
              {searchQuery && (
                <span className="text-muted-foreground/60">
                  {' '}for &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </p>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="text-xs font-normal">
                {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial">
              <Select
                value={currentSort}
                onValueChange={(value) => updateParams({ sort: value === 'popular' ? null : value })}
              >
                <SelectTrigger className="h-8 text-xs w-full sm:w-[160px]">
                  <span className="text-muted-foreground mr-1">Sort:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-8 w-8"
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        {filterPills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {filterPills.map((pill, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="pl-2 pr-1 py-1 text-xs font-normal gap-1 border border-muted-foreground/20"
              >
                {pill.label}
                <button
                  onClick={pill.onRemove}
                  className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                  aria-label={`Remove ${pill.label} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/products')}
              className="h-6 text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Clear all
            </Button>
          </div>
        )}

        <Separator />

        <ProductGrid products={initialProducts.data} viewMode={viewMode} />

        <ProductPagination
          currentPage={currentPage}
          totalPages={initialProducts.totalPages}
          total={initialProducts.total}
          limit={initialProducts.limit}
        />

        {externalQuery && (
          <ExternalResults query={externalQuery} />
        )}
      </div>
    </div>
  );
}
