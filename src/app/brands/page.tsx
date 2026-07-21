import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Globe, Award } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getBrands } from '@/lib/repository';
import { CTASection } from '@/components/layout/cta-section';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <CTASection
        heading="Representing Your Brand?"
        description="If you are a manufacturer interested in partnering with ZENTRYO, we would love to hear from you."
        buttons={[
          { label: 'Become a Partner', href: '/contact', variant: 'primary', icon: <ArrowRight className="h-4 w-4" /> },
        ]}
      />
    </>
  );
}
