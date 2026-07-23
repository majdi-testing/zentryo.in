'use client';

import Link from 'next/link';
import { Circle, HelpCircle, ExternalLink, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, getAvailabilityColor, getAvailabilityLabel, truncate, productImages } from '@/lib/utils';
import type { Product, ExternalProduct } from '@/types';

interface ProductCardProps {
  product: Product | ExternalProduct;
  viewMode?: 'grid' | 'list';
  isExternal?: boolean;
}

export function ProductCard({ product, viewMode = 'grid', isExternal }: ProductCardProps) {
  const extProduct = product as ExternalProduct;
  const isExt = isExternal || ('isExternal' in product && product.isExternal === true);
  const imageIndex = product.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % productImages.length;
  const imageSrc = isExt && (extProduct as ExternalProduct).imageUrl
    ? (extProduct as ExternalProduct).imageUrl
    : productImages[imageIndex];

  const rfqHref = isExt
    ? `/rfq?productName=${encodeURIComponent(product.name)}&productSKU=${product.sku}&requirements=${encodeURIComponent(product.shortDescription || '')}`
    : '';

  const sourceUrl = isExt ? (product as ExternalProduct).sourceUrl : '';
  const source = isExt ? (product as ExternalProduct).source : '';

  const cardContent = (
    <Card
      className={cn(
        'overflow-hidden border-muted transition-all duration-500',
        'hover:shadow-xl hover:-translate-y-2 hover:border-primary/30',
        viewMode === 'list' && 'flex flex-row'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          isExt ? 'h-36 w-36 shrink-0' : viewMode === 'grid' ? 'h-48 w-full' : 'h-40 w-40 shrink-0'
        )}
      >
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {isExt ? (
          <Badge className="absolute top-2 left-2 text-xs bg-cyan-600 hover:bg-cyan-700 text-white border-none">
            Sourced
          </Badge>
        ) : product.tags.includes('featured') && (
          <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="text-xs bg-background/90 backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
      </div>
      <CardContent className={cn('flex flex-col gap-2', isExt || viewMode === 'list' ? 'flex-1 p-4' : 'p-4')}>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
        </div>
        {isExt && (
          <>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {truncate(product.shortDescription, 120)}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {product.sku}
              </span>
              {source && (
                <span className="inline-flex items-center gap-1">
                  Source: <span className="font-medium capitalize">{source}</span>
                </span>
              )}
              {sourceUrl && sourceUrl !== '#' && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-700 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3" />
                  View Source
                </a>
              )}
            </div>
          </>
        )}
        <div className="flex items-center gap-3 pt-2">
          <span className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full',
            isExt ? 'text-amber-700 bg-amber-50 border border-amber-200' : getAvailabilityColor(product.availability)
          )}>
            <Circle className={cn('h-2 w-2 fill-current', isExt && 'text-amber-500')} />
            {isExt ? 'Subject to Confirmation' : getAvailabilityLabel(product.availability)}
          </span>
          {!isExt && (
            <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
          )}
        </div>
        {isExt && (
          <div className="mt-2 pt-2 border-t border-muted">
            <Button size="sm" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs gap-1.5" asChild>
              <Link href={rfqHref}>
                <HelpCircle className="h-3.5 w-3.5" />
                Request Quote
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isExt) {
    return <div>{cardContent}</div>;
  }

  return (
    <div>
      <Link href={`/products/${product.slug}`} className="block group">
        {cardContent}
      </Link>
    </div>
  );
}
