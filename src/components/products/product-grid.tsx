'use client';

import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <PackageSearch className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No products found</h3>
        <p className="text-sm text-muted-foreground/60 max-w-md">
          Try adjusting your search terms or filters to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className={cn(
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
          : 'flex flex-col gap-4'
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </motion.div>
  );
}
