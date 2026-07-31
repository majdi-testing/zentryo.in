import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Cpu, Zap, Gauge, Droplets, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { getSolutions, getSolutionBySlug } from '@/lib/repository';
import { getIndustries } from '@/lib/data-service';
import { CTASection } from '@/components/layout/cta-section';

const solutionIcons: Record<string, React.ReactNode> = {
  'automation-systems': <Cpu className="h-8 w-8" />,
  'power-generation': <Zap className="h-8 w-8" />,
  'process-control': <Gauge className="h-8 w-8" />,
  'fluid-power': <Droplets className="h-8 w-8" />,
};

const solutionImages: Record<string, string> = {
  'automation-systems': 'https://images.pexels.com/photos/3846251/pexels-photo-3846251.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'power-generation': 'https://images.pexels.com/photos/12270481/pexels-photo-12270481.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'process-control': 'https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'fluid-power': 'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return { title: `Solution Not Found | ${siteConfig.name}` };
  return {
    title: `${solution.name} | ${siteConfig.name}`,
    description: solution.shortDescription,
    alternates: { canonical: `${siteConfig.url}/solutions/${slug}` },
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [solution, allSolutions, industries] = await Promise.all([
    getSolutionBySlug(slug),
    getSolutions(),
    getIndustries(),
  ]);

  if (!solution) notFound();

  const solutionIndustries = industries.filter((ind) => solution.industries.includes(ind.slug));
  const relatedSolutions = allSolutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.name,
    description: solution.description,
    provider: { '@type': 'Organization', name: siteConfig.name },
    serviceType: solution.features,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={solutionImages[slug]} alt={solution.name} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/90 to-navy-900/75" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: solution.name }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
              <div className="text-cyan-400">{solutionIcons[slug] || <Cpu className="h-8 w-8" />}</div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{solution.name}</h1>
            <p className="text-xl text-steel-200 leading-relaxed">{solution.description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-600 mb-4">Features</h2>
              <h3 className="text-3xl font-bold text-navy-900 mb-6">What We Deliver</h3>
              <div className="space-y-4">
                {solution.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-steel-50 border border-steel-100">
                    <CheckCircle className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-steel-700 font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-600 mb-4">Benefits</h2>
              <h3 className="text-3xl font-bold text-navy-900 mb-6">Why Choose Us</h3>
              <div className="space-y-4">
                {solution.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-cyan-50 border border-cyan-100">
                    <ArrowRight className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-cyan-800 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Industries Served</h2>
          <p className="text-steel-600 mb-8">
            {solution.name} delivers value across the following industries:
          </p>
          <div className="flex flex-wrap gap-3">
            {solutionIndustries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white border border-steel-200 text-navy-700 hover:border-cyan-300 hover:text-cyan-700 transition-colors">
                {ind.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {relatedSolutions.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">Related Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedSolutions.map((rel) => (
                <Link key={rel.slug} href={`/solutions/${rel.slug}`}
                  className="group p-6 rounded-xl border border-steel-100 bg-white hover:border-cyan-300 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-4 group-hover:bg-cyan-500/10">
                    <div className="text-navy-700 group-hover:text-cyan-600">{solutionIcons[rel.slug] || <Cpu className="h-6 w-6" />}</div>
                  </div>
                  <h3 className="font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors mb-2">{rel.name}</h3>
                  <p className="text-sm text-steel-500 line-clamp-2">{rel.shortDescription}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 mt-4">
                    Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading={`Ready to Implement ${solution.name}?`}
        description={`Contact our engineering team to discuss how ${solution.name.toLowerCase()} can optimize your operations.`}
        buttons={[
          { label: 'Talk to an Engineer', href: '/contact', variant: 'primary', icon: <ArrowRight className="h-4 w-4" /> },
          { label: 'Explore Products', href: '/products', variant: 'secondary' },
        ]}
      />
    </>
  );
}
