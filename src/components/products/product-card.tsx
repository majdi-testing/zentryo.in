'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, getAvailabilityColor, getAvailabilityLabel, truncate } from '@/lib/utils';
import type { Product } from '@/types';

const productImages = [
  'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4494653/pexels-photo-4494653.jpeg?auto=compress&cs=tinysrgb&w=600',
];

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const availabilityColor = getAvailabilityColor(product.availability);
  const availabilityLabel = getAvailabilityLabel(product.availability);
  const imageIndex = product.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % productImages.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/products/${product.slug}`} className="block group">
        <Card
          className={cn(
            'overflow-hidden border-muted transition-all duration-500',
            'group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-primary/30',
            viewMode === 'list' && 'flex flex-row'
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden',
              viewMode === 'grid' ? 'h-48 w-full' : 'h-40 w-40 shrink-0'
            )}
          >
            <img
              src={productImages[imageIndex]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {product.tags.includes('featured') && (
              <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                Featured
              </Badge>
            )}
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="text-xs bg-background">
                {product.category}
              </Badge>
            </div>
          </div>
          <CardContent className={cn('flex flex-col gap-2', viewMode === 'list' ? 'flex-1 p-4' : 'p-4')}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
              </div>
            </div>
            {viewMode === 'list' && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {truncate(product.shortDescription, 120)}
              </p>
            )}
            <div className="flex items-center gap-3 mt-auto pt-2">
              <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full', availabilityColor)}>
                <Circle className="h-2 w-2 fill-current" />
                {availabilityLabel}
              </span>
              <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
