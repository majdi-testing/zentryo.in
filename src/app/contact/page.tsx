import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ContactPageContent } from './contact-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us - Industrial Components Supplier',
    description: `Contact ${siteConfig.name} for industrial components, automation solutions, and engineering services. Call ${siteConfig.contact.phone} or email ${siteConfig.contact.email}. Get a free quote today.`,
    alternates: { canonical: `${siteConfig.url}/contact` },
  };
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og-image.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.streetAddress,
      addressLocality: siteConfig.contact.locality,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.country,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPageContent />
    </>
  );
}
