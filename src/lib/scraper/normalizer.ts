import type { ExternalProduct } from '@/types';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
];

export function getRandomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export function inferCategory(query: string): string {
  const q = query.toLowerCase();
  if (/\bbearing/.test(q)) return 'Bearings';
  if (/\bvalve/.test(q)) return 'Valves';
  if (/\b(plc|controller|automation|sensor|actuator|transmitter)/.test(q)) return 'Automation';
  if (/\b(turbine|blade|nozzle|combustor)/.test(q)) return 'Turbine Parts';
  if (/\b(hydraulic|pneumatic|cylinder|pump|motor)/.test(q)) return 'Hydraulics & Pneumatics';
  if (/\b(gear|coupling|seal|gasket|oring|filter|fastener|bolt|nut|screw)/.test(q)) return 'Industrial Components';
  if (/\b(switch|relay|breaker|transformer|cable|wire)/.test(q)) return 'Electrical';
  if (/\b(hose|tube|fitting|connector)/.test(q)) return 'Fittings';
  return 'Industrial Components';
}

export function generateId(title: string, sourceUrl: string): string {
  const hash = title.slice(0, 8).replace(/\s/g, '') + sourceUrl.length;
  return `ext-${hash}-${Buffer.from(title + sourceUrl).toString('base64').slice(0, 10).toLowerCase()}`;
}

export function normalizeProduct(item: {
  title: string;
  snippet: string;
  imageUrl: string;
  sourceUrl: string;
  source: ExternalProduct['source'];
  category?: string;
}): ExternalProduct {
  const id = generateId(item.title, item.sourceUrl);
  const name = item.title.replace(/\s+/g, ' ').trim();
  const brand = extractBrand(name, item.snippet);
  return {
    id,
    slug: `external-${id}`,
    name,
    brand,
    description: item.snippet || name,
    shortDescription: (item.snippet || name).slice(0, 150),
    imageUrl: item.imageUrl || '',
    category: item.category || inferCategory(name),
    sourceUrl: item.sourceUrl,
    source: item.source,
    availability: 'subject-to-confirmation',
    sku: `EXT-${id.toUpperCase().slice(0, 12)}`,
    tags: [item.category || inferCategory(name), brand],
    isExternal: true,
  };
}

function extractBrand(name: string, snippet: string): string {
  const knownBrands = [
    'SKF', 'NSK', 'FAG', 'Timken', 'NTN', 'KOYO', 'INA',
    'Siemens', 'ABB', 'Schneider', 'Honeywell', 'Emerson',
    'GE', 'Rolls-Royce', 'Bosch', 'Rexroth', 'Parker', 'SMC', 'Festo',
    'Eaton', 'Vickers', 'Danfoss', 'Grundfos', 'KSB', 'Sulzer',
  ];
  const text = `${name} ${snippet}`;
  for (const brand of knownBrands) {
    if (text.includes(brand)) return brand;
  }
  const firstWord = name.split(/[\s-]+/)[0];
  return firstWord || 'Industrial Manufacturer';
}
