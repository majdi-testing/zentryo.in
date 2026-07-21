import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getCategoryBySlug, getProducts, loadAllProducts } from '@/lib/repository';
import { ExternalResults } from '@/components/search/external-results';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { productImages, heroImages, getImageIndex, getHeroIndex } from '@/lib/utils';

export async function generateStaticParams() {
  const { getCategories } = await import('@/lib/repository');
  const categories = await getCategories();
  return categories.map(c => ({ slug: c.slug }));
}

interface CategoryPageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} | Categories | ${siteConfig.name}`,
    description: category.seoDescription,
    alternates: { canonical: `${siteConfig.url}/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, productsResult] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts({ category: slug, limit: 24 }),
  ]);

  if (!category) notFound();

  const heroIdx = getHeroIndex(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${siteConfig.url}/categories` },
      { '@type': 'ListItem', position: 3, name: category.name, item: `${siteConfig.url}/categories/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages[heroIdx]}
            alt={category.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: category.name }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-xl text-steel-200">{category.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-sm text-steel-200">
              <span>{category.productCount} products available</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {productsResult.data.length > 0 ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <p className="text-sm text-steel-500">
                  Showing {productsResult.data.length} of {productsResult.total} products
                </p>
                <div className="flex items-center gap-2">
                  <Link href={`/products?category=${slug}`} className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                    View All Filters &rarr;
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsResult.data.map((product, i) => {
                  const imgIdx = getImageIndex(product.name);
                  return (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
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
                          <h3 className="font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors mb-1">{product.name}</h3>
                          <p className="text-xs text-steel-500 mb-2">{product.brand} | {product.sku}</p>
                          <p className="text-sm text-steel-600 line-clamp-2">{product.shortDescription}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-steel-100">
                            <span className="text-xs text-steel-400">MPN: {product.mpn}</span>
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

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-steel-100">
                <p className="text-sm text-steel-500">Page 1 of {productsResult.totalPages}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled className="opacity-50">Previous</Button>
                  <Button variant="outline" size="sm" disabled={!productsResult.hasNextPage} className={!productsResult.hasNextPage ? 'opacity-50' : ''}>
                    Next
                  </Button>
                </div>
              </div>

              <ExternalResults query={category.name} />
            </>
          ) : (
            <>
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-10 w-10 text-navy-300" />
                </div>
                <h2 className="text-2xl font-bold text-navy-900 mb-2">No Products Found in Catalog</h2>
                <p className="text-steel-500 mb-6">No products currently available in this category in our catalog. Check sourced products from our network below.</p>
                <Link href="/products">
                  <Button className="bg-navy-800 hover:bg-navy-900 text-white">Browse All Products</Button>
                </Link>
              </div>
              <ExternalResults query={category.name} />
            </>
          )}
        </div>
      </section>
    </>
  );
}


