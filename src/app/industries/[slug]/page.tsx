import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, CheckCircle, Zap, Fuel, Ship, Bolt, Factory, Car, Plane, FlaskRound, Pickaxe, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getIndustryBySlug, getProducts, getSolutions, getBrands } from '@/lib/repository';

const productImages = [
  'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4494653/pexels-photo-4494653.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const heroImages = [
  'https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/12270481/pexels-photo-12270481.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/12583030/pexels-photo-12583030.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

function getImageIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % productImages.length;
}

function getHeroIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % heroImages.length;
}

interface IndustryPageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return { title: 'Industry Not Found' };
  return {
    title: `${industry.name} | Industries | ${siteConfig.name}`,
    description: industry.description,
    alternates: { canonical: `${siteConfig.url}/industries/${slug}` },
  };
}

const industryIcons: Record<string, React.ReactNode> = {
  'power-plants': <Zap className="h-8 w-8" />,
  'oil-gas': <Fuel className="h-8 w-8" />,
  'marine': <Ship className="h-8 w-8" />,
  'energy': <Bolt className="h-8 w-8" />,
  'manufacturing': <Factory className="h-8 w-8" />,
  'automotive': <Car className="h-8 w-8" />,
  'aerospace': <Plane className="h-8 w-8" />,
  'chemical': <FlaskRound className="h-8 w-8" />,
  'mining': <Pickaxe className="h-8 w-8" />,
  'pharmaceutical': <Pill className="h-8 w-8" />,
};

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const [industry, productsResult, solutions, brandsList] = await Promise.all([
    getIndustryBySlug(slug),
    getProducts({ industry: slug, limit: 8 }),
    getSolutions(),
    getBrands(),
  ]);

  if (!industry) notFound();

  const heroIdx = getHeroIndex(slug);
  const relatedSolutions = solutions.filter((s) => s.industries.includes(slug));
  const industryBrands = brandsList.filter((b) => b.industries.includes(industry.name));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${siteConfig.url}/industries` },
      { '@type': 'ListItem', position: 3, name: industry.name, item: `${siteConfig.url}/industries/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages[heroIdx]}
            alt={industry.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">{industry.name}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-white">
              {industryIcons[slug] || <Factory className="h-8 w-8" />}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{industry.name}</h1>
            </div>
          </div>
          <p className="text-xl text-steel-200 max-w-3xl mt-4">{industry.description}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 animate-fade-in-up">
            Products for {industry.name}
          </h2>
          {productsResult.data.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {productsResult.data.map((product) => {
                  const imgIdx = getImageIndex(product.name);
                  return (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group animate-fade-in-up">
                      <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={productImages[imgIdx]}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors mb-1">{product.name}</h3>
                          <p className="text-xs text-steel-500 mb-2">{product.brand} | {product.sku}</p>
                          <p className="text-sm text-steel-600 line-clamp-2">{product.shortDescription}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
              {productsResult.total > 8 && (
                <div className="text-center">
                  <Link href={`/products?industry=${slug}`}>
                    <Button variant="outline" className="border-navy-200 text-navy-700 gap-2">
                      View All {productsResult.total} Products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-steel-500">
              <p className="text-lg">Browse our full catalog for {industry.name} components.</p>
              <Link href="/products" className="mt-4 inline-block">
                <Button className="bg-navy-800 hover:bg-navy-900 text-white">Browse All Products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {relatedSolutions.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 animate-fade-in-up">
              Solutions for {industry.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedSolutions.map((solution) => (
                <Card key={solution.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all animate-fade-in-up">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{solution.name}</h3>
                    <p className="text-steel-600 mb-4">{solution.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {solution.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-navy-50 text-navy-700">
                          <CheckCircle className="h-3 w-3 text-cyan-500" />
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link href="/solutions">
                      <Button variant="link" className="text-cyan-600 p-0 h-auto gap-1">
                        View Solution Details <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {industryBrands.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 animate-fade-in-up">
              Brands Serving {industry.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {industryBrands.map((b) => (
                <Link key={b.slug} href={`/brands/${b.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-steel-200 hover:border-cyan-300 hover:bg-navy-50 transition-all text-sm font-medium text-navy-700">
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need {industry.name} Components?
              </h2>
              <p className="text-steel-200 text-lg mb-8">
                Our team has decades of experience serving the {industry.name} industry. Let us help you find the right solution.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                    Contact Our Team <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Submit RFQ
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
