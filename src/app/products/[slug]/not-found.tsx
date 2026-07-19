import Link from 'next/link';
import type { Metadata } from 'next';
import { PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Product Not Found | ${siteConfig.name}`,
};

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center text-center max-w-md mx-auto">
        <PackageSearch className="h-20 w-20 text-muted-foreground/30 mb-6" />
        <h1 className="text-3xl font-bold tracking-tight mb-3">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist or may have been removed.
          Please check the URL or browse our product catalog.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
