import { HomeHero } from '@/components/home/hero';
import { TrustedBrands } from '@/components/home/trusted-brands';
import { Statistics } from '@/components/home/statistics';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { IndustriesSection } from '@/components/home/industries';
import { ProductRange } from '@/components/home/product-range';
import { CategoriesSection, type CategoryCard } from '@/components/home/categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { SolutionsSection } from '@/components/home/solutions';
import { EngineeringServices } from '@/components/home/engineering-services';
import { OurProcess } from '@/components/home/our-process';
import { QualityAssurance } from '@/components/home/quality-assurance';
import { CertificatesSection } from '@/components/home/certificates';
import { GlobalPresence } from '@/components/home/global-presence';
import { TestimonialsSection } from '@/components/home/testimonials';
import { LatestBlogs } from '@/components/home/latest-blogs';
import { FAQSection } from '@/components/home/faq';
import { HomeContactForm } from '@/components/home/contact-form';
import { getCategories, loadAllProducts } from '@/lib/data-service';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Industrial Components & Automation Supplier',
    description:
      `${siteConfig.name} supplies industrial components, OEM spare parts, bearings, valves, and automation systems for power, oil & gas, and marine industries in India.`,
    alternates: { canonical: siteConfig.url },
    openGraph: {
      type: 'website',
      url: siteConfig.url,
      title: `${siteConfig.name} - Industrial Components & Automation Solutions`,
      description: siteConfig.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} - Industrial Components & Automation Solutions`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
  };
}

async function getCategoriesWithSubcategories(): Promise<CategoryCard[]> {
  const categories = await getCategories();
  const allProducts = await loadAllProducts();
  const subcategoryMap = new Map<string, Set<string>>();
  for (const p of allProducts) {
    const slug = p.category.toLowerCase().replace(/\s+/g, '-');
    if (!subcategoryMap.has(slug)) subcategoryMap.set(slug, new Set());
    subcategoryMap.get(slug)!.add(p.subcategory);
  }
  return categories.map(c => ({
    slug: c.slug,
    name: c.name,
    productCount: c.productCount,
    subcategories: Array.from(subcategoryMap.get(c.slug) || []).slice(0, 6),
  }));
}

export default async function HomePage() {
  const categories = await getCategoriesWithSubcategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/og-image.jpg`,
        description: siteConfig.description,
        foundingDate: siteConfig.organization.foundingDate,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.contact.streetAddress,
          addressLocality: siteConfig.contact.locality,
          addressRegion: siteConfig.contact.region,
          postalCode: siteConfig.contact.postalCode,
          addressCountry: siteConfig.contact.country,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.contact.phone,
          contactType: 'sales',
          email: siteConfig.contact.email,
          availableLanguage: ['English'],
        },
        sameAs: siteConfig.organization.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/products?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HomeHero />
      <TrustedBrands />
      <ProductRange />
      <CategoriesSection categories={categories} />
      <Statistics />
      <WhyChooseUs />
      <IndustriesSection />
      <FeaturedProducts />
      <SolutionsSection />
      <EngineeringServices />
      <OurProcess />
      <QualityAssurance />
      <CertificatesSection />
      <GlobalPresence />
      <TestimonialsSection />
      <LatestBlogs />
      <FAQSection />
      <HomeContactForm />
    </>
  );
}
