'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getAvailabilityLabel } from '@/lib/utils';
import type { Category, Brand, AvailabilityStatus } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
}

const availabilityOptions: { value: AvailabilityStatus; label: string }[] = [
  { value: 'in-stock', label: 'In Stock' },
  { value: 'low-stock', label: 'Low Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
  { value: 'made-to-order', label: 'Made to Order' },
];

export function ProductFilters({ categories, brands }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const selectedCategories = useMemo(
    () => searchParams.get('category')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedBrands = useMemo(
    () => searchParams.get('brand')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedAvailability = searchParams.get('availability') ?? '';
  const currentSort = searchParams.get('sort') ?? 'popular';

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

  const debouncedSearch = useCallback(
    (value: string) => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        updateParams({ search: value || null });
      }, 300);
    },
    [updateParams]
  );

  useEffect(() => {
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  const toggleFilter = (key: string, current: string[], value: string) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParams({ [key]: next.length > 0 ? next.join(',') : null });
  };

  const clearFilters = () => {
    setSearch('');
    router.push('/products', { scroll: false });
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedAvailability !== '' ||
    search !== '';

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Sort By</h3>
        </div>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value === 'popular' ? null : value })}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="alphabetical">Alphabetical (A-Z)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Category</h3>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <Label
              key={cat.id}
              className="flex items-center gap-2 text-sm font-normal cursor-pointer py-0.5"
            >
              <Checkbox
                checked={selectedCategories.includes(cat.slug)}
                onCheckedChange={() => toggleFilter('category', selectedCategories, cat.slug)}
              />
              <span className="flex-1">{cat.name}</span>
              <span className="text-xs text-muted-foreground">({cat.productCount})</span>
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Brand</h3>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <Label
              key={brand.id}
              className="flex items-center gap-2 text-sm font-normal cursor-pointer py-0.5"
            >
              <Checkbox
                checked={selectedBrands.includes(brand.slug)}
                onCheckedChange={() => toggleFilter('brand', selectedBrands, brand.slug)}
              />
              <span className="flex-1">{brand.name}</span>
              <span className="text-xs text-muted-foreground">({brand.productCount})</span>
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Availability</h3>
        <div className="space-y-2">
          {availabilityOptions.map((opt) => (
            <Label
              key={opt.value}
              className="flex items-center gap-2 text-sm font-normal cursor-pointer py-0.5"
            >
              <Checkbox
                checked={selectedAvailability === opt.value}
                onCheckedChange={(checked) =>
                  updateParams({ availability: checked ? opt.value : null })
                }
              />
              <span>{opt.label}</span>
            </Label>
          ))}
        </div>
      </div>
    </aside>
  );
}
