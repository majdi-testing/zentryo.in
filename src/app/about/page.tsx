import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Heart, Award, ArrowRight, CheckCircle, Globe, ShieldCheck, Users, Factory, Headphones, Mail, TrendingUp, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { getTeamMembers, getStatistics } from '@/lib/repository';
import { CTASection } from '@/components/layout/cta-section';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About Us | ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name} - a premier global supplier of industrial engineering components, automation systems, and industrial solutions with 25+ years of experience.`,
    alternates: { canonical: `${siteConfig.url}/about` },
    openGraph: {
      title: `About ${siteConfig.name}`,
      description: `Discover our mission, vision, and commitment to industrial excellence.`,
    },
  };
}

const milestones = [
  { year: '2000', title: 'Founded', description: 'ZENTRYO established in Houston, TX with a vision to revolutionize industrial component supply.' },
  { year: '2005', title: 'Global Expansion', description: 'Expanded operations to 20+ countries with strategic partnerships across Europe and Asia.' },
  { year: '2010', title: 'ISO Certification', description: 'Achieved ISO 9001 quality management certification, setting new standards for excellence.' },
  { year: '2015', title: '10,000 Products', description: 'Catalog surpassed 10,000 industrial components serving 15 major industries.' },
  { year: '2020', title: 'Digital Transformation', description: 'Launched digital platform with real-time inventory, AI-powered sourcing, and automated logistics.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as a top-tier industrial supplier serving 2,500+ clients across 80+ countries.' },
];

const highlights = [
  { icon: Globe, text: 'Global supply chain spanning 80+ countries' },
  { icon: Package, text: '50,000+ premium industrial products in catalog' },
  { icon: ShieldCheck, text: 'ISO 9001 & ISO 14001 certified quality management' },
  { icon: Users, text: '500+ industry partners including GE, Siemens, ABB' },
  { icon: Headphones, text: '24/7 technical support and engineering consultation' },
  { icon: TrendingUp, text: '25+ years of continuous growth and innovation' },
];

export default async function AboutPage() {
  const [team, stats] = await Promise.all([getTeamMembers(), getStatistics()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og-image.jpg`,
    foundingDate: '2000',
    address: { '@type': 'PostalAddress', streetAddress: siteConfig.contact.address, addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77001', addressCountry: 'US' },
    contactPoint: { '@type': 'ContactPoint', telephone: siteConfig.contact.phone, contactType: 'customer service', email: siteConfig.contact.email },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter, siteConfig.social.youtube],
    numberOfEmployees: { '@type': 'QuantitativeValue', value: '500+' },
    areaServed: 'Worldwide',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Advanced manufacturing and automation facility"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f42]/95 via-[#0a1f42]/90 to-[#0a1f42]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/25 via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/30 text-cyan-300 mb-4">
              Since 2000
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Powering Industry Forward
            </h1>
            <p className="text-xl text-steel-200 leading-relaxed mb-8">
              For over 25 years, ZENTRYO has been the trusted partner for industrial engineering components, automation systems, and mission-critical solutions worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent gap-2">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-900/50 to-transparent" />
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative animate-fade-in-up">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image
                  src="https://images.pexels.com/photos/32845680/pexels-photo-32845680.jpeg?auto=compress&cs=tinysrgb&w=750"
                  alt="ZENTRYO engineering team at work"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f42]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-xl bg-white/20">
                      <div className="text-2xl font-bold text-cyan-400">50K+</div>
                      <div className="text-xs text-steel-200">Products</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/20">
                      <div className="text-2xl font-bold text-cyan-400">2.5K+</div>
                      <div className="text-xs text-steel-200">Clients</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/20">
                      <div className="text-2xl font-bold text-cyan-400">80+</div>
                      <div className="text-xs text-steel-200">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Your Trusted Industrial Partner</h2>
              <div className="w-20 h-1 bg-cyan-500 mb-6" />
              <p className="text-steel-600 text-lg leading-relaxed mb-6">
                ZENTRYO is a premier global supplier of industrial engineering components, automation systems, gas turbine spare parts, OEM components, and comprehensive industrial solutions. Headquartered in Houston, Texas, we serve the power generation, oil & gas, marine, manufacturing, aerospace, chemical processing, mining, and pharmaceutical industries.
              </p>
              <div className="space-y-3 mb-8">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center">
                      <item.icon className="h-3.5 w-3.5 text-cyan-600" />
                    </div>
                    <span className="text-steel-600">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <Button className="bg-navy-900 hover:bg-navy-800 text-white gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-4">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">What Drives Us</h2>
            <p className="text-steel-600 max-w-2xl mx-auto text-lg">The principles that guide everything we do at ZENTRYO.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Our Mission</h3>
                <p className="text-steel-600 leading-relaxed">
                  To empower industrial operations worldwide with premium engineering components, innovative automation solutions, and exceptional technical support that drive productivity, safety, and sustainability.
                </p>
              </CardContent>
            </Card>
            <Card className="group border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Our Vision</h3>
                <p className="text-steel-600 leading-relaxed">
                  To be the world&apos;s most trusted industrial supply partner, setting the global standard for quality, reliability, and innovation in engineering components and automation solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="group border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Our Values</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Heart, text: 'Uncompromising quality and precision' },
                    { icon: ShieldCheck, text: 'Integrity and transparency in every interaction' },
                    { icon: TrendingUp, text: 'Continuous innovation and improvement' },
                    { icon: Users, text: 'Customer-centric approach and partnership' },
                    { icon: Globe, text: 'Environmental responsibility and sustainability' },
                  ].map((value) => (
                    <li key={value.text} className="flex items-start gap-3 text-steel-600">
                      <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center">
                        <value.icon className="h-3.5 w-3.5 text-cyan-600" />
                      </div>
                      <span>{value.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 gradient-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center animate-fade-in-up">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm text-steel-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">A Legacy of Excellence</h2>
            <p className="text-steel-600 max-w-2xl mx-auto text-lg">From our founding in 2000 to becoming a global industry leader.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-400 to-navy-600 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative md:pl-20 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="hidden md:flex absolute left-4 top-1 w-10 h-10 rounded-full bg-white border-4 border-cyan-500 items-center justify-center shadow-lg shadow-cyan-500/30">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-navy-900">{milestone.title}</h3>
                  </div>
                  <p className="text-steel-600 ml-1">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-4">
              Leadership Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Meet the Experts</h2>
            <p className="text-steel-600 max-w-2xl mx-auto text-lg">Industry veterans dedicated to your success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="group border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Image
                      src="https://images.pexels.com/photos/32845680/pexels-photo-32845680.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt={member.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover mx-auto border-4 border-cyan-100 group-hover:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-navy-900">{member.name}</h3>
                    <p className="text-cyan-600 text-sm font-medium">{member.designation}</p>
                    <p className="text-steel-400 text-xs mt-1">{member.department}</p>
                  </div>
                  <p className="text-steel-500 text-sm text-center leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-steel-100">
                    <Link href={`mailto:${member.name.toLowerCase().replace(/\s+/g, '.').replace(/^dr\.\s*/i, '')}@zentryo.com`} className="text-steel-400 hover:text-cyan-600 transition-colors">
                      <Mail className="h-4 w-4" />
                    </Link>
                    <Link href={siteConfig.social.linkedin} className="text-steel-400 hover:text-cyan-600 transition-colors">
                      <Globe className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Partner with Industry Leaders?"
        description="Contact our team today to discover how ZENTRYO can support your industrial component and automation needs. Our experts are standing by."
        buttons={[
          { label: 'Contact Us', href: '/contact', variant: 'primary', icon: <ArrowRight className="h-4 w-4" /> },
          { label: 'Browse Products', href: '/products', variant: 'secondary' },
        ]}
      />
    </>
  );
}
