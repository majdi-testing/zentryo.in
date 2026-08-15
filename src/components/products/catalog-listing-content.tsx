import Image from 'next/image';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { productImages, getImageIndex } from '@/lib/utils';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalResults } from '@/components/search/external-results';
import { getProductsByCatalog } from '@/lib/data-service';
import type { Product } from '@/types';
import type { ProductCategoryDef, ProductSubcategoryDef } from '@/lib/product-catalog';

interface CatalogListingContentProps {
  category: ProductCategoryDef;
  subcategory?: ProductSubcategoryDef;
  page?: number;
}

export async function CatalogListingContent({ category, subcategory, page = 1 }: CatalogListingContentProps) {
  const limit = siteConfig.productsPerPage;
  const [productsResult, allProducts] = await Promise.all([
    getProductsByCatalog(
      subcategory?.dataCategories ?? category.dataCategories,
      subcategory?.dataSubcategories,
      page,
      limit
    ),
    getProductsByCatalog(category.dataCategories, undefined, 1, 1).catch(() => null),
  ]);

  const isSubcategory = !!subcategory;
  const title = subcategory ? subcategory.name : category.name;
  const description = subcategory?.description ?? category.description;
  const query = title;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/products/${category.slug}${subcategory ? `/${subcategory.slug}` : ''}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: productsResult.total,
      itemListElement: productsResult.data.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Product', name: p.name, url: `${siteConfig.url}/products/${p.slug}` },
      })),
    },
  };

  const totalCategories = category.dataCategories.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/[0.04] via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10">
          <Breadcrumbs
            variant="hero"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: category.name, href: `/products/${category.slug}` },
              ...(subcategory ? [{ label: subcategory.name }] : []),
            ]}
          />
          <div className="max-w-3xl animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <category.icon className="h-8 w-8 text-[#ffffff]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-4">{title}</h1>
            <p className="text-xl text-[#bcccdc] leading-relaxed">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff]/15 text-sm text-[#ffffff] font-medium backdrop-blur-sm">
                <Package className="h-4 w-4" />
                {productsResult.total.toLocaleString()} products available
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-950/60 to-transparent" />
      </section>

      {/* Subcategory navigation */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2">
          {!isSubcategory && category.subcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/products/${category.slug}/${sub.slug}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-navy-50 text-navy-700 hover:bg-cyan-500 hover:text-[#ffffff] transition-colors"
            >
              {sub.name}
            </Link>
          ))}
          {isSubcategory && (
            <Link
              href={`/products/${category.slug}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-50 text-cyan-700 hover:bg-cyan-500 hover:text-[#ffffff] transition-colors"
            >
              ← All {category.name}
            </Link>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productsResult.data.length > 0 ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <p className="text-sm text-steel-500">
                  Showing {productsResult.data.length} of {productsResult.total.toLocaleString()} products
                  {totalCategories > 1 ? ` across ${totalCategories} categories` : ''}
                </p>
                <div className="flex items-center gap-2">
                  <Link href={`/products?category=${category.slug}`} className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                    View All Filters &rarr;
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsResult.data.map((product, i) => {
                  const imgIdx = getImageIndex(product.name);
                  return (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
                      <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={productImages[imgIdx]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors mb-1 line-clamp-2">{product.name}</h3>
                          <p className="text-xs text-steel-500 mb-2">{product.brand} | {product.sku}</p>
                          <p className="text-sm text-steel-600 line-clamp-2">{product.shortDescription}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-steel-100">
                            <span className="text-xs text-[#829ab1]">MPN: {product.mpn}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              product.availability === 'in-stock' ? 'bg-emerald-50 text-emerald-600' :
                              product.availability === 'low-stock' ? 'bg-amber-50 text-amber-600' :
                              product.availability === 'out-of-stock' ? 'bg-red-50 text-red-600' :
                              'bg-blue-50 text-blue-600'
                            }`}>
                              {product.availability.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {productsResult.totalPages > 1 && (
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-steel-100">
                  <p className="text-sm text-steel-500">
                    Page {productsResult.page} of {productsResult.totalPages}
                  </p>
                  <div className="flex gap-2">
                    {productsResult.hasPrevPage && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-navy-700"
                      >
                        <Link href={`/products/${category.slug}${subcategory ? `/${subcategory.slug}` : ''}?page=${productsResult.page - 1}`}>
                          Previous
                        </Link>
                      </Button>
                    )}
                    {productsResult.hasNextPage && (
                      <Button
                        size="sm"
                        asChild
                      >
                        <Link href={`/products/${category.slug}${subcategory ? `/${subcategory.slug}` : ''}?page=${productsResult.page + 1}`}>
                          Next
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-navy-300" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">No Products Found in Catalog</h2>
              <p className="text-steel-500 mb-6">No products currently available in this {isSubcategory ? 'subcategory' : 'category'} in our catalog. Check sourced products from our network below.</p>
              <Link href="/products">
                <Button className="bg-navy-950 hover:bg-[#0a1f42] text-[#ffffff]">Browse All Products</Button>
              </Link>
            </div>
          )}

          <div className="mt-12">
            <ExternalResults query={query} />
          </div>
        </div>
      </section>
    </>
  );
}
