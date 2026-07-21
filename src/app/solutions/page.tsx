import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Zap, Gauge, Droplets, CheckCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getSolutions, getIndustries } from '@/lib/repository';
import { CTASection } from '@/components/layout/cta-section';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Solutions | ${siteConfig.name}`,
    description: `Comprehensive industrial solutions from ${siteConfig.name}: automation systems, power generation, process control, and fluid power systems for diverse industries.`,
    alternates: { canonical: `${siteConfig.url}/solutions` },
  };
}

const solutionIcons: Record<string, React.ReactNode> = {
  'automation-systems': <Cpu className="h-8 w-8" />,
  'power-generation': <Zap className="h-8 w-8" />,
  'process-control': <Gauge className="h-8 w-8" />,
  'fluid-power': <Droplets className="h-8 w-8" />,
};

export default async function SolutionsPage() {
  const [solutions, industries] = await Promise.all([getSolutions(), getIndustries()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: solutions.map((s, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Service', name: s.name, description: s.description },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Industrial Solutions</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Integrated engineering solutions that combine world-class components, advanced automation, and deep industry expertise to solve your toughest operational challenges.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const solutionIndustries = industries.filter((ind) => solution.industries.includes(ind.slug));
              return (
                <Card key={solution.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center mb-6">
                      <div className="text-cyan-400">{solutionIcons[solution.id] || <Cpu className="h-8 w-8" />}</div>
                    </div>
                    <h2 className="text-2xl font-bold text-navy-900 mb-3">{solution.name}</h2>
                    <p className="text-steel-600 mb-6">{solution.description}</p>

                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-navy-800 uppercase tracking-wider mb-3">Industries Served</h3>
                      <div className="flex flex-wrap gap-2">
                        {solutionIndustries.map((ind) => (
                          <Link key={ind.slug} href={`/industries/${ind.slug}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-50 text-navy-700 hover:bg-navy-100 transition-colors">
                            {ind.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-semibold text-navy-800 uppercase tracking-wider mb-3">Features</h3>
                        <ul className="space-y-2">
                          {solution.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-steel-600">
                              <CheckCircle className="h-4 w-4 text-cyan-500 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-navy-800 uppercase tracking-wider mb-3">Benefits</h3>
                        <ul className="space-y-2">
                          {solution.benefits.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-sm text-steel-600">
                              <ArrowRight className="h-4 w-4 text-cyan-500 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link href={`/industries?solution=${solution.slug}`}>
                      <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50 gap-2">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Looking for a Custom Solution?"
        description="Our engineering team will design a tailored solution for your specific operational requirements and industry challenges."
        buttons={[
          { label: 'Talk to an Engineer', href: '/contact', variant: 'primary', icon: <ArrowRight className="h-4 w-4" /> },
          { label: 'Explore Services', href: '/services', variant: 'secondary' },
        ]}
      />
    </>
  );
}
