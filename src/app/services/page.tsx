import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, BrainCircuit, Truck, Wrench, GraduationCap, SearchCheck, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getServices } from '@/lib/repository';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Services | ${siteConfig.name}`,
    description: `Comprehensive industrial services from ${siteConfig.name}: engineering consulting, supply chain management, maintenance & repair, technical training, quality inspection, and custom fabrication.`,
    alternates: { canonical: `${siteConfig.url}/services` },
  };
}

const serviceIcons: Record<string, React.ReactNode> = {
  'engineering-consulting': <BrainCircuit className="h-8 w-8" />,
  'supply-chain': <Truck className="h-8 w-8" />,
  'maintenance-repair': <Wrench className="h-8 w-8" />,
  'technical-training': <GraduationCap className="h-8 w-8" />,
  'quality-inspection': <SearchCheck className="h-8 w-8" />,
  'custom-fabrication': <Hammer className="h-8 w-8" />,
};

const serviceImages: Record<string, string> = {
  'engineering-consulting': 'https://images.pexels.com/photos/3846251/pexels-photo-3846251.jpeg?auto=compress&cs=tinysrgb&w=800',
  'supply-chain': 'https://images.pexels.com/photos/36694994/pexels-photo-36694994.jpeg?auto=compress&cs=tinysrgb&w=800',
  'maintenance-repair': 'https://images.pexels.com/photos/35290678/pexels-photo-35290678.jpeg?auto=compress&cs=tinysrgb&w=800',
  'technical-training': 'https://images.pexels.com/photos/35216547/pexels-photo-35216547.jpeg?auto=compress&cs=tinysrgb&w=800',
  'quality-inspection': 'https://images.pexels.com/photos/32845674/pexels-photo-32845674.jpeg?auto=compress&cs=tinysrgb&w=800',
  'custom-fabrication': 'https://images.pexels.com/photos/30117046/pexels-photo-30117046.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export default async function ServicesPage() {
  const services = await getServices();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Service', name: s.name, description: s.description, url: `${siteConfig.url}/services#${s.slug}` },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Services</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              End-to-end industrial services designed to optimize your operations, reduce downtime, and drive engineering excellence across every phase of your project lifecycle.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="block">
                <Card id={service.slug} className="group border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-[16/7] relative overflow-hidden">
                    <img src={serviceImages[service.id]} alt={service.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center -mt-10 mb-4 border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                      <div className="text-cyan-400">{serviceIcons[service.id] || <Wrench className="h-8 w-8" />}</div>
                    </div>
                    <h2 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-cyan-600 transition-colors">{service.name}</h2>
                    <p className="text-steel-600 mb-4">{service.shortDescription}</p>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-navy-800 uppercase tracking-wider mb-2">Key Features</h3>
                      <ul className="space-y-1.5">
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-steel-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:gap-2 transition-all mt-4">
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a Custom Service Solution?</h2>
              <p className="text-steel-200 text-lg mb-8">
                Our engineering team will work with you to develop tailored solutions for your specific industrial requirements.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                    Request a Consultation <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Submit an RFQ
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
