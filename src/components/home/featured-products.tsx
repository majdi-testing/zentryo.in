'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, getAvailabilityColor, getAvailabilityLabel, productImages } from '@/lib/utils';

interface ProductCard {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  availability: string;
  image: string;
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products/featured')
      .then(res => res.json())
      .then(data => setProducts(data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 animate-fade-in-up">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Products
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
              Featured Products
            </h3>
          </div>
          <Button asChild variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50 shrink-0">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-steel-100 p-4 animate-pulse">
                <div className="aspect-[4/3] rounded-lg bg-steel-100 mb-4" />
                <div className="h-4 bg-steel-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-steel-100 rounded w-1/2 mb-4" />
                <div className="h-3 bg-steel-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-steel-300 mx-auto mb-4" />
            <p className="text-steel-500">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {products.slice(0, 4).map((product, i) => (
              <div key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    'group block rounded-xl border border-steel-100 bg-white overflow-hidden',
                    'hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10',
                    'transition-all duration-300'
                  )}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={productImages[i % productImages.length]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-white/80 uppercase tracking-wider drop-shadow-sm">{product.brand}</span>
                      <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-white/95">{product.category}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-navy-800 mb-1.5 group-hover:text-cyan-600 transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-xs text-steel-500 line-clamp-2 mb-3">
                      {product.shortDescription}
                    </p>
                    <span className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full',
                      getAvailabilityColor(product.availability)
                    )}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {getAvailabilityLabel(product.availability)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
