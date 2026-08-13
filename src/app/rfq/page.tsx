import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { RFQContent } from './rfq-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Request for Quote (RFQ) - Industrial Parts & Components',
    description: `Submit a request for quote (RFQ) to ${siteConfig.name}. Get competitive pricing on industrial components, automation systems, OEM spare parts, and engineered solutions.`,
    alternates: { canonical: `${siteConfig.url}/rfq` },
  };
}

export default function RFQPage() {
  return <RFQContent />;
}
