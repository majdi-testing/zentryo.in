import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { siteConfig } from '@/config/site';
import { getProducts, getCategories, getBrands } from '@/lib/data-service';
import { ProductListingContent } from './product-listing-content';

export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';
  const category = typeof params.category === 'string' ? params.category : '';

  const title = search
    ? `Search results for "${search}"`
    : category
      ? `${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} Products`
      : 'Products';

  return {
    title: `${title} | ${siteConfig.name}`,
    description: `Browse our extensive catalog of industrial products${search ? ` matching "${search}"` : ''}.`,
    alternates: {
      canonical: `${siteConfig.url}/products`,
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const brand = typeof params.brand === 'string' ? params.brand : undefined;
  const availability = typeof params.availability === 'string' ? params.availability as 'in-stock' | 'low-stock' | 'out-of-stock' | 'made-to-order' : undefined;
  const sort = typeof params.sort === 'string' ? params.sort as 'alphabetical' | 'newest' | 'popular' : undefined;
  const page = typeof params.page === 'string' ? Math.max(1, parseInt(params.page, 10) || 1) : 1;

  const [productsResult, categories, brands] = await Promise.all([
    getProducts({
      search,
      category: category ? decodeURIComponent(category) : undefined,
      brand: brand ? decodeURIComponent(brand) : undefined,
      availability,
      sort: sort ?? 'popular',
      page,
      limit: siteConfig.productsPerPage,
    }),
    getCategories(),
    getBrands(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteConfig.url}/products` },
        ],
      },
      {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/products?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  const isSearch = !!search;
  const headerTitle = search
    ? `Search results for "${search}"`
    : category
      ? `${category.split(',').map(s => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')).join(', ')} Products`
      : 'Products';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={isSearch
        ? 'relative overflow-hidden gradient-blue border-b'
        : 'bg-gradient-to-b from-muted/50 to-background border-b'
      }>
        {isSearch && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <Breadcrumbs
            variant={isSearch ? 'hero' : 'default'}
            items={[
              { label: 'Home', href: '/' },
              ...(isSearch
                ? [{ label: 'Products', href: '/products' }, { label: `Search: "${search}"` }]
                : [{ label: 'Products' }]
              ),
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${isSearch ? 'text-white' : ''}`}>
                {headerTitle}
                {!isSearch && productsResult.total > 0 && (
                  <span className="text-muted-foreground text-2xl ml-2 font-normal">
                    ({productsResult.total})
                  </span>
                )}
              </h1>
              <p className={`mt-2 max-w-2xl ${isSearch ? 'text-steel-200' : 'text-muted-foreground'}`}>
                {isSearch
                  ? `${productsResult.total} product${productsResult.total !== 1 ? 's' : ''} found matching your search`
                  : 'Browse our extensive catalog of industrial components from leading manufacturers.'
                }
              </p>
            </div>
          </div>
        </div>
        {isSearch && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductListingContent
            initialProducts={productsResult}
            categories={categories}
            brands={brands}
          />
        </Suspense>
      </section>
    </>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-6 bg-muted rounded animate-pulse" />
        ))}
      </div>
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-[160px] bg-muted rounded animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card overflow-hidden">
              <div className="h-48 bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="h-10 w-64 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
