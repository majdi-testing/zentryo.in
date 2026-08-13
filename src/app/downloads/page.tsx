import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { DownloadsContent } from './downloads-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Downloads & Resources - Catalogs & Manuals',
    description: `Download product catalogs, technical manuals, datasheets, and engineering guides from ${siteConfig.name}. Free technical resources for industrial component selection.`,
    alternates: { canonical: `${siteConfig.url}/downloads` },
  };
}

export default function DownloadsPage() {
  return <DownloadsContent />;
}