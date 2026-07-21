import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle, BrainCircuit, Truck, Wrench, GraduationCap, SearchCheck, Hammer } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { getServiceBySlug, getServices } from '@/lib/repository';
import { CTASection } from '@/components/layout/cta-section';

const iconMap: Record<string, React.ReactNode> = {
  'engineering-consulting': <BrainCircuit className="h-8 w-8" />,
  'supply-chain': <Truck className="h-8 w-8" />,
  'maintenance-repair': <Wrench className="h-8 w-8" />,
  'technical-training': <GraduationCap className="h-8 w-8" />,
  'quality-inspection': <SearchCheck className="h-8 w-8" />,
  'custom-fabrication': <Hammer className="h-8 w-8" />,
};

const serviceImages: Record<string, string> = {
  'engineering-consulting': 'https://images.pexels.com/photos/3846251/pexels-photo-3846251.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'supply-chain': 'https://images.pexels.com/photos/36694994/pexels-photo-36694994.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'maintenance-repair': 'https://images.pexels.com/photos/35290678/pexels-photo-35290678.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'technical-training': 'https://images.pexels.com/photos/35216547/pexels-photo-35216547.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'quality-inspection': 'https://images.pexels.com/photos/32845674/pexels-photo-32845674.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'custom-fabrication': 'https://images.pexels.com/photos/30117046/pexels-photo-30117046.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | ${siteConfig.name}`,
    description: service.shortDescription,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: { '@type': 'Organization', name: siteConfig.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={serviceImages[slug]} alt={service.name} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f42]/95 via-[#0a1f42]/90 to-[#0a1f42]/80" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.name }]} />
          <div className="max-w-3xl">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
              <div className="text-cyan-400">{iconMap[slug]}</div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{service.name}</h1>
            <p className="text-xl text-steel-200 leading-relaxed">{service.description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-600 mb-4">Features</h2>
              <h3 className="text-3xl font-bold text-navy-900 mb-6">What We Offer</h3>
              <div className="space-y-4">
                {service.features.map((f) => (
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
                {service.benefits.map((b) => (
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

      <CTASection
        variant="light"
        heading="Ready to Get Started?"
        description={`Contact our team to discuss how our ${service.name.toLowerCase()} can benefit your operations.`}
        buttons={[
          { label: 'Contact Us', href: '/contact', variant: 'primary', icon: <ArrowRight className="h-4 w-4" /> },
          { label: 'Submit RFQ', href: '/rfq', variant: 'secondary' },
        ]}
      />
    </>
  );
}
