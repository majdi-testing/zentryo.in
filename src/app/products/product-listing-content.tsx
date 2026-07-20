'use client';

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductPagination } from '@/components/products/product-pagination';
import { cn } from '@/lib/utils';
import type { Category, Brand, PaginatedResponse, Product } from '@/types';

interface ProductListingContentProps {
  initialProducts: PaginatedResponse<Product>;
  categories: Category[];
  brands: Brand[];
}

export function ProductListingContent({ initialProducts, categories, brands }: ProductListingContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const toggleMobileFilters = useCallback(() => {
    setMobileFiltersOpen((prev) => !prev);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex items-center justify-between mb-2">
        <Button variant="outline" size="sm" onClick={toggleMobileFilters} className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
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

      {/* Filters sidebar */}
      <aside
        className={cn(
          'lg:block',
          mobileFiltersOpen ? 'block' : 'hidden'
        )}
      >
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={toggleMobileFilters} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ProductFilters categories={categories} brands={brands} />
      </aside>

      {/* Main content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Toolbar */}
        <div className="hidden lg:flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {initialProducts.total} product{initialProducts.total !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
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

        <Separator className="hidden lg:block" />

        <ProductGrid products={initialProducts.data} viewMode={viewMode} />

        <ProductPagination
          currentPage={currentPage}
          totalPages={initialProducts.totalPages}
          total={initialProducts.total}
          limit={initialProducts.limit}
        />
      </div>
    </div>
  );
}
