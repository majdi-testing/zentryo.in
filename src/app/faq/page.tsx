import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { FAQContent } from './faq-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'FAQ - Industrial Components & Services Questions',
    description: `Find answers to common questions about ${siteConfig.name} products, industrial component sourcing, shipping, quality certifications, RFQ process, and more.`,
    alternates: { canonical: `${siteConfig.url}/faq` },
  };
}

export default function FAQPage() {
  return <FAQContent />;
}