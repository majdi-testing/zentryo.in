import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Shield, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getBrands } from '@/lib/repository';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Brands | ${siteConfig.name}`,
    description: `Browse brands available at ${siteConfig.name}. We supply products from leading industrial manufacturers including GE, Siemens, ABB, Honeywell, Emerson, Parker, and more.`,
    alternates: { canonical: `${siteConfig.url}/brands` },
  };
}

export default async function BrandsPage() {
  const brands = await getBrands();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brands.map((b, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Brand', name: b.name, description: b.description },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Brands</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Brands</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              ZENTRYO partners with 500+ leading industrial manufacturers worldwide to bring you the highest quality components and systems, backed by comprehensive warranties and technical support.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center group-hover:from-navy-800 group-hover:to-navy-900 transition-all shrink-0">
                        <span className="text-lg font-bold text-navy-700 group-hover:text-cyan-400 transition-colors">{brand.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-bold text-navy-900 group-hover:text-cyan-600 transition-colors mb-1">{brand.name}</h2>
                        <p className="text-sm text-steel-500 line-clamp-2">{brand.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-steel-500">
                      <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-navy-400" /> {brand.productCount} products</span>
                      <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-navy-400" /> {brand.country}</span>
                      {brand.certifications.length > 0 && (
                        <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-navy-400" /> {brand.certifications.length} certs</span>
                      )}
                    </div>
                    {brand.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {brand.categories.slice(0, 3).map((cat) => (
                          <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-navy-50 text-navy-600">{cat}</span>
                        ))}
                        {brand.categories.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-navy-50 text-navy-600">+{brand.categories.length - 3}</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Representing Your Brand?</h2>
              <p className="text-steel-200 text-lg mb-8">
                If you are a manufacturer interested in partnering with ZENTRYO, we would love to hear from you.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                  Become a Partner <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
