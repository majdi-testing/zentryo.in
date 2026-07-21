import type { ExternalProduct } from '@/types';
import { inferCategory } from '../normalizer';

const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4494653/pexels-photo-4494653.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const BRANDS = [
  'Premium Industrial', 'IndustrialPro', 'HeavyDuty Industries',
  'CertTech Manufacturing', 'Value Industrial Supply', 'Global Components Inc.',
  'Industrial Solutions Co.', 'Precision Parts Ltd.',
];

function generateFallbackProducts(query: string): ExternalProduct[] {
  const category = inferCategory(query);
  const templates = [
    `${query} - Industrial Grade Heavy Duty`,
    `${query} - OEM Specification`,
    `${query} - Premium Series`,
    `${query} - Certified Quality`,
    `${query} - Standard Duty`,
    `${query} - High Performance`,
    `${query} - Economy Range`,
    `${query} - Professional Series`,
  ];

  return templates.map((name, i) => {
    const id = `fallback-${i}-${Buffer.from(name).toString('base64').slice(0, 8).toLowerCase()}`;
    return {
      id,
      slug: `external-${id}`,
      name,
      brand: BRANDS[i % BRANDS.length],
      description: `High-quality ${query} suitable for industrial applications. Manufactured to international standards with full quality certification.`,
      shortDescription: `High-quality ${query} suitable for industrial applications.`,
      imageUrl: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
      category,
      sourceUrl: '#',
      source: 'fallback' as const,
      availability: 'subject-to-confirmation' as const,
      sku: `EXT-FB-${String(i + 1).padStart(3, '0')}`,
      tags: [category, query],
      isExternal: true as const,
    };
  });
}

export function getFallbackProducts(query: string, page: number): ExternalProduct[] {
  const pool = generateFallbackProducts(query);
  const perPage = 8;
  const start = (page - 1) * perPage;
  return pool.slice(start, start + perPage);
}

export function getFallbackTotalPages(): number {
  return 5;
}
