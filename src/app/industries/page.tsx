import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Zap, Fuel, Ship, Bolt, Factory, Car, Plane, FlaskRound, Pickaxe, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getIndustries } from '@/lib/repository';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Industries | ${siteConfig.name}`,
    description: `${siteConfig.name} serves 10+ industrial sectors including power generation, oil & gas, marine, manufacturing, aerospace, chemical processing, and more.`,
    alternates: { canonical: `${siteConfig.url}/industries` },
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

export default async function IndustriesPage() {
  const industries = await getIndustries();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: industries.map((ind, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Organization', name: ind.name, description: ind.shortDescription },
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
              <li className="text-white font-medium" aria-current="page">Industries</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Industries We Serve</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              From power generation to pharmaceutical manufacturing, ZENTRYO delivers mission-critical components and solutions across 10 major industrial sectors worldwide.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center mb-4 group-hover:from-navy-800 group-hover:to-navy-900 transition-all">
                      <div className="text-navy-700 group-hover:text-cyan-400 transition-colors">
                        {industryIcons[industry.slug] || <Factory className="h-7 w-7" />}
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-navy-900 group-hover:text-cyan-600 transition-colors mb-2">{industry.name}</h2>
                    <p className="text-sm text-steel-500 mb-3">{industry.shortDescription}</p>
                    <div className="flex items-center gap-1.5 text-sm text-cyan-600 font-medium">
                      <span>{industry.productCount} products</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Don&apos;t See Your Industry?</h2>
              <p className="text-steel-200 text-lg mb-8">
                ZENTRYO serves many specialized sectors. Contact our team to discuss your specific industry requirements.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
