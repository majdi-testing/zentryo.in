import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Award, Download, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getCertificates } from '@/lib/repository';
import { formatDate } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Certificates | ${siteConfig.name}`,
    description: `View quality certifications and compliance documents from ${siteConfig.name}: ISO 9001, ISO 14001, AS9100D, API Q1, CE, ATEX, and more.`,
    alternates: { canonical: `${siteConfig.url}/certificates` },
  };
}

const categoryColors: Record<string, string> = {
  Quality: 'bg-blue-50 text-blue-700 border-blue-200',
  Environmental: 'bg-green-50 text-green-700 border-green-200',
  Aerospace: 'bg-purple-50 text-purple-700 border-purple-200',
  'Oil & Gas': 'bg-amber-50 text-amber-700 border-amber-200',
  Compliance: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Safety: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: certificates.map((c, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'CreativeWork', name: c.name, description: c.description },
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
              <li className="text-white font-medium" aria-current="page">Certificates</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Certifications & Compliance</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              ZENTRYO maintains the highest quality standards with internationally recognized certifications across all our operations and products.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <Card key={cert.id} className="border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center text-navy-700 shrink-0">
                      <Award className="h-7 w-7" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-navy-900 mb-1">{cert.name}</h2>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[cert.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                        {cert.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-steel-600 mb-4">{cert.description}</p>
                  <div className="text-xs text-steel-400 space-y-1 mb-4">
                    <p className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Issued by: {cert.issuer}</p>
                    <p className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Issued: {formatDate(cert.issueDate)}</p>
                    <p className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Expires: {formatDate(cert.expiryDate)}</p>
                  </div>
                  <a href={cert.file} download className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
                    <Download className="h-4 w-4" /> Download Certificate
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Compliance Documentation for Your Order?</h2>
              <p className="text-steel-200 text-lg mb-8">
                Every product from ZENTRYO comes with the appropriate certification and compliance documentation.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                  Request Documentation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
