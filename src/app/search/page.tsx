import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getProducts } from '@/lib/repository';
import { ExternalResults } from '@/components/search/external-results';

interface SearchPageProps { searchParams: Promise<{ q?: string; page?: string }> }

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q || '';
  return {
    title: q ? `Search results for "${q}" | ${siteConfig.name}` : `Search | ${siteConfig.name}`,
    description: q ? `Search results for "${q}" in our industrial product catalog.` : `Search our catalog of industrial components at ${siteConfig.name}.`,
    alternates: { canonical: `${siteConfig.url}/search${q ? `?q=${encodeURIComponent(q)}` : ''}` },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = params.q || '';
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const productsResult = await getProducts({ search: q, page, limit: siteConfig.productsPerPage });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: q ? `Search results for "${q}"` : 'Search',
    description: `Search results for "${q}" - ZENTRYO industrial products`,
    mainEntity: { '@type': 'ItemList', itemListElement: productsResult.data.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: p.name, description: p.shortDescription } })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {q ? `Search Results for "${q}"` : 'Search Products'}
            </h1>
            {q && (
              <p className="text-steel-200 text-lg">
                {productsResult.total} result{productsResult.total !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {q ? (
            productsResult.data.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productsResult.data.map((product, i) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                      <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardContent className="p-5">
                          <div className="w-full h-36 rounded-lg bg-gradient-to-br from-navy-50 to-steel-50 mb-4 flex items-center justify-center">
                            <span className="text-3xl font-bold text-navy-200/50">{product.name.split(' ').map((w: string) => w[0]).join('').slice(0, 3)}</span>
                          </div>
                          <h2 className="font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors mb-1">{product.name}</h2>
                          <p className="text-xs text-steel-500 mb-2">{product.brand} | {product.sku}</p>
                          <p className="text-sm text-steel-600 line-clamp-2">{product.shortDescription}</p>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-steel-100 text-xs text-steel-400">
                            <span>{product.category}</span>
                            <span>|</span>
                            <span className={product.availability === 'in-stock' ? 'text-emerald-600 font-medium' : 'text-amber-600'}>
                              {product.availability.replace(/-/g, ' ')}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {productsResult.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-steel-100">
                    {Array.from({ length: productsResult.totalPages }, (_, i) => i + 1).map((p) => (
                      <Link key={p} href={`/search?q=${encodeURIComponent(q)}&page=${p}`}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                          p === page ? 'bg-navy-800 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                        }`}>
                        {p}
                      </Link>
                    ))}
                  </div>
                )}

                <ExternalResults query={q} />
              </>
            ) : (
              <>
                <div className="text-center py-20 animate-fade-in-up">
                  <Search className="h-16 w-16 text-steel-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-navy-900 mb-2">No Results Found in Catalog</h2>
                  <p className="text-steel-500 max-w-md mx-auto mb-6">
                    We couldn&apos;t find any products matching &ldquo;{q}&rdquo; in our catalog. However, check our sourced products from our network below.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/products"><Button className="bg-navy-800 hover:bg-navy-900 text-white">Browse All Products</Button></Link>
                    <Link href="/categories"><Button variant="outline" className="border-navy-200 text-navy-700">View Categories</Button></Link>
                  </div>
                </div>
                <ExternalResults query={q} />
              </>
            )
          ) : (
            <div className="text-center py-20 animate-fade-in-up">
              <Search className="h-16 w-16 text-steel-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Search Our Catalog</h2>
              <p className="text-steel-500 max-w-md mx-auto mb-6">
                Use the search bar above or browse our product categories to find the industrial components you need.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/products"><Button className="bg-navy-800 hover:bg-navy-900 text-white">Browse All Products</Button></Link>
                <Link href="/categories"><Button variant="outline" className="border-navy-200 text-navy-700">Browse Categories</Button></Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
