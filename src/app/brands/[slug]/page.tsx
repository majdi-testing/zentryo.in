import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Globe, Shield, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getBrandBySlug, getProducts } from '@/lib/repository';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { productImages, heroImages, getImageIndex, getHeroIndex } from '@/lib/utils';

export async function generateStaticParams() {
  const { getBrands } = await import('@/lib/repository');
  const brands = await getBrands();
  return brands.map(b => ({ slug: b.slug }));
}

interface BrandPageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: 'Brand Not Found' };
  return {
    title: `${brand.name} | Brands | ${siteConfig.name}`,
    description: brand.description,
    alternates: { canonical: `${siteConfig.url}/brands/${slug}` },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const [brand, productsResult] = await Promise.all([
    getBrandBySlug(slug),
    getProducts({ brand: slug, limit: 12 }),
  ]);

  if (!brand) notFound();

  const heroIdx = getHeroIndex(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${siteConfig.url}/brands` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `${siteConfig.url}/brands/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages[heroIdx]}
            alt={brand.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Brands', href: '/brands' }, { label: brand.name }]} />
          <div className="flex items-center gap-6 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{brand.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{brand.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-steel-300 text-sm">
                <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> {brand.productCount} Products</span>
                <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {brand.country}</span>
              </div>
            </div>
          </div>
          <p className="text-xl text-steel-200 max-w-3xl mt-4">{brand.description}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 animate-fade-in-up">{brand.name} Products</h2>
          <p className="text-steel-600 mb-8 max-w-2xl">
            Browse our complete inventory of {brand.name} products. All items are sourced directly from the manufacturer with full certification and warranty.
          </p>

          {brand.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {brand.categories.map((cat) => (
                <Link key={cat} href={`/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-navy-50 text-navy-700 hover:bg-navy-100 transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          )}

          {productsResult.data.length > 0 ? (
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
                        <p className="text-xs text-steel-500 mb-2">SKU: {product.sku} | MPN: {product.mpn}</p>
                        <p className="text-sm text-steel-600 line-clamp-2">{product.shortDescription}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-steel-500">
              <p className="text-lg">No products found for this brand.</p>
              <Link href="/products" className="mt-4 inline-block">
                <Button className="bg-navy-800 hover:bg-navy-900 text-white">Browse All Products</Button>
              </Link>
            </div>
          )}

          {productsResult.total > 12 && (
            <div className="text-center mt-8">
              <Link href={`/products?brand=${slug}`}>
                <Button variant="outline" className="border-navy-200 text-navy-700 gap-2">
                  View All {productsResult.total} Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {brand.certifications.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 animate-fade-in-up">Certifications</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brand.certifications.map((cert) => (
                <Card key={cert} className="border border-steel-100 animate-fade-in-up">
                  <CardContent className="p-5 flex items-center gap-3">
                    <Award className="h-8 w-8 text-navy-400 shrink-0" />
                    <div>
                      <p className="font-medium text-navy-900">{cert}</p>
                      <p className="text-xs text-steel-500">Verified certification</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto shrink-0" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need a Specific {brand.name} Component?
              </h2>
              <p className="text-steel-200 text-lg mb-8">
                Our team can source any {brand.name} product you need. Contact us with your requirements.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
