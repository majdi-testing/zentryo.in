import fs from 'fs';
import path from 'path';
import type { Product, ProductFilters, PaginatedResponse, Category, Brand, Industry } from '@/types';
import { paginate, slugify } from '@/lib/utils';
import { siteConfig } from '@/config/site';

async function loadProducts(): Promise<Product[]> {
  const files = [
    'bearings.json', 'valves.json', 'automation.json', 'controllers.json',
    'sensors.json', 'manifolds.json', 'turbine-parts.json', 'plc-accessories.json',
    'hydraulics.json', 'pneumatics.json', 'seals.json', 'filters.json',
    'gears.json', 'couplings.json', 'fasteners.json', 'electrical.json'
  ];
  const dataDir = path.join(process.cwd(), 'src', 'data', 'products');
  const allProducts: Product[] = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      const products: Product[] = JSON.parse(content);
      allProducts.push(...products);
    } catch {
      // File not found, skip
    }
  }
  return allProducts;
}

export async function loadAllProducts(): Promise<Product[]> {
  return loadProducts();
}

export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
  let products = await loadProducts();
  const { category, brand, industry, availability, search, sort, page = 1, limit = siteConfig.productsPerPage } = filters;

  if (category) products = products.filter(p => slugify(p.category) === category || slugify(p.subcategory || '') === category);
  if (brand) products = products.filter(p => slugify(p.brand) === brand);
  if (industry) products = products.filter(p => matchesIndustry(p.industry, industry));
  if (availability) products = products.filter(p => p.availability === availability);
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) ||
      p.mpn.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sort === 'alphabetical') products.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'newest') products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  else if (sort === 'popular') products.sort((a, b) => (b.tags.length - a.tags.length));

  return paginate(products, page, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await loadProducts();
  return products.find(p => p.slug === slug) || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await loadProducts();
  const featured = products.filter(p => p.tags.includes('featured')).slice(0, 8);
  if (featured.length > 0) return featured;
  return products.slice(0, 8);
}

export async function getProductsByCatalog(
  categories?: string[],
  subcategories?: string[],
  page = 1,
  limit = siteConfig.productsPerPage
): Promise<PaginatedResponse<Product>> {
  let products = await loadProducts();
  if (categories && categories.length > 0) {
    products = products.filter(p => categories.includes(p.category));
  }
  if (subcategories && subcategories.length > 0) {
    products = products.filter(p => subcategories.includes(p.subcategory));
  }
  return paginate(products, page, limit);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  const products = await loadProducts();
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand || p.industry.some(i => product.industry.includes(i))))
    .slice(0, 4);
}

export async function getCategories(): Promise<Category[]> {
  const products = await loadProducts();
  const categoryMap = new Map<string, Category>();
  for (const p of products) {
    if (!categoryMap.has(p.category)) {
      categoryMap.set(p.category, {
        id: p.category.toLowerCase().replace(/\s+/g, '-'),
        slug: p.category.toLowerCase().replace(/\s+/g, '-'),
        name: p.category,
        description: `Premium ${p.category} for industrial applications.`,
        shortDescription: `Industrial ${p.category}`,
        image: `/images/categories/${p.category.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        icon: 'Package',
        parentId: null,
        children: [],
        productCount: 1,
        seoTitle: `${p.category} | ZENTRYO`,
        seoDescription: `Browse our range of ${p.category} from leading manufacturers.`,
      });
    } else {
      const cat = categoryMap.get(p.category)!;
      cat.productCount++;
    }
  }
  return Array.from(categoryMap.values());
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

export async function getBrands(): Promise<Brand[]> {
  const products = await loadProducts();
  const brandCountryMap: Record<string, string> = {
    'SKF': 'Sweden', 'FAG': 'Germany', 'INA': 'Germany', 'Timken': 'USA',
    'NSK': 'Japan', 'NTN': 'Japan', 'KOYO': 'Japan', 'NACHI': 'Japan',
    'ZWZ': 'China', 'HRB': 'China', 'Bauer': 'Germany',
    'Bosch Rexroth': 'Germany', 'Siemens': 'Germany', 'SEW': 'Germany',
    'Flender': 'Germany', 'Siemens/Flender': 'Germany', 'Festo': 'Germany',
    'Parker': 'USA', 'Eaton': 'USA', 'Emerson': 'USA', 'Honeywell': 'USA',
    'ABB': 'Switzerland', 'Schneider': 'France', 'Legrand': 'France',
    'Omron': 'Japan', 'Panasonic': 'Japan', 'Mitsubishi': 'Japan',
    'Yokogawa': 'Japan', 'Fuji Electric': 'Japan', 'SMC': 'Japan',
    'CKD': 'Japan', 'Danfoss': 'Denmark',
    'Atos': 'Italy', 'Bonfiglioli': 'Italy', 'Motovario': 'Italy',
    'Rossi': 'Italy', 'Varvel': 'Italy', 'Cameron': 'USA',
    'Flowserve': 'USA', 'Crane': 'USA', 'Velan': 'France',
    'Kitz': 'Japan', 'Bray': 'USA', 'Neles': 'Finland', 'Metso': 'Finland',
    'Samson': 'Germany', 'Spirax Sarco': 'UK', 'SICK': 'Germany',
    'Balluff': 'Germany', 'Turck': 'Germany', 'Pepperl+Fuchs': 'Germany',
    'Phoenix Contact': 'Germany', 'Wago': 'Germany', 'Weidmuller': 'Germany',
    'Rittal': 'Germany', 'Hilti': 'Liechtenstein', 'Endress+Hauser': 'Switzerland',
    'Krohne': 'Germany', 'Vega': 'Germany', 'Rosemount': 'USA',
    'Allen-Bradley': 'USA', 'GE': 'USA', 'GE Fanuc': 'USA',
    'Woodward': 'USA', 'B&R': 'Austria', 'Red Lion': 'USA',
    'West Control': 'UK', 'Eurotherm': 'UK', 'RKC': 'Japan',
    'Watlow': 'USA', 'Donaldson': 'USA', 'Pall': 'USA',
    'Mann+Hummel': 'Germany', 'Camfil': 'Sweden', 'AAF International': 'USA',
    'Gore': 'USA', 'Freudenberg': 'Germany', 'Trelleborg': 'Sweden',
    'Garlock': 'USA', 'Burgmann': 'Germany', 'James Walker': 'UK',
    'Bal-Seal': 'USA', 'A.W. Chesterton': 'USA', 'Klinger': 'Austria',
    'Hydac': 'Germany', 'Voith': 'Germany',
    'Sun Hydraulics': 'USA', 'Hydraforce': 'USA', 'Bucher': 'Switzerland',
    'Walvoil': 'Italy', 'Hydrocontrol': 'Italy', 'Deltrol': 'USA',
    'Vickers': 'USA', 'Sauer-Danfoss': 'Denmark',
    'Norgren': 'UK', 'Clippard': 'USA',
    'Camozzi': 'Italy', 'AirTac': 'China', 'Metal Work': 'Italy',
    'AVENTICS': 'Germany', 'Humphrey': 'USA',
    'M+S': 'Germany', 'Daman': 'USA', 'Bibby': 'UK', 'Lovejoy': 'USA', 'Rexnord': 'USA',
    'Falk': 'USA', 'Kop-Flex': 'USA', 'Jaure': 'Italy', 'Mayr': 'Germany',
    'KTR': 'Germany', 'Ringfeder': 'Germany', 'Centaflex': 'Germany',
    'Boston Gear': 'USA', 'Cleveland': 'USA', 'Sumitomo': 'Japan',
    'NORD': 'Germany', 'Wittenstein': 'Germany',
    'Ansaldo': 'Italy', 'MAN Energy': 'Germany', 'Solar Turbines': 'USA',
    'Chromalloy': 'USA', 'Alstom': 'France', 'Kawasaki': 'Japan', 'Anvil': 'USA',
    'Simpson': 'USA', 'McMaster-Carr': 'USA', 'Fastenal': 'USA',
    'LISI': 'France', 'Unbrako': 'USA', 'Parker Fasteners': 'USA',
    'Hager': 'Germany', 'Sperian': 'France', 'ITW': 'USA',
    'Mee Industries': 'USA', 'RBC': 'USA', 'Precision Castparts': 'USA',
    'Dyson': 'UK', 'Yates': 'USA',
  };
  const brandMap = new Map<string, Brand>();
  for (const p of products) {
    const brandSlug = slugify(p.brand);
    if (!brandMap.has(p.brand)) {
      brandMap.set(p.brand, {
        id: brandSlug,
        slug: brandSlug,
        name: p.brand,
        logo: `/images/brands/${brandSlug}.png`,
        description: `${p.brand} - Trusted industrial manufacturer.`,
        website: `https://www.${p.brand.toLowerCase().replace(/\s+/g, '')}.com`,
        country: brandCountryMap[p.brand] || 'Global',
        productCount: 1,
        categories: [p.category],
        industries: p.industry,
        certifications: ['ISO 9001', 'ISO 14001'],
      });
    } else {
      const brand = brandMap.get(p.brand)!;
      brand.productCount++;
      if (!brand.categories.includes(p.category)) brand.categories.push(p.category);
      p.industry.forEach(i => { if (!brand.industries.includes(i)) brand.industries.push(i); });
    }
  }
  return Array.from(brandMap.values());
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find(b => b.slug === slug) || null;
}

const INDUSTRY_ALIASES: Record<string, string[]> = {
  'power-generation': ['Power Generation', 'Power Plants', 'Gas Turbines', 'Steam Turbines', 'Power Stations', 'Combined Cycle Plants', 'Cogeneration', 'Energy Storage'],
  'oil-gas': ['Oil & Gas', 'Oil Refineries', 'Refinery', 'Gas Distribution', 'Oil & Gas Pipelines', 'Refining'],
  'marine': ['Marine', 'Shipbuilding', 'Marine Propellers', 'Marine Rudders'],
  'energy': ['Energy Storage', 'Wind Turbines', 'Hydroelectric Turbines', 'Power Distribution', 'Energy'],
  'manufacturing': ['Manufacturing', 'Advanced Manufacturing', 'Machine Tools', 'CNC', 'Factory Automation', 'Packaging', 'Assembly'],
  'automotive': ['Automotive', 'Automotive Transmissions', 'Automotive Hubs', 'Forklifts'],
  'aerospace': ['Aerospace', 'Aircraft Assembly', 'Aviation'],
  'chemical': ['Chemical', 'Chemical Processing', 'Pharmaceutical', 'Polymer', 'Refinery'],
  'mining': ['Mining', 'Mining Equipment', 'Mining Machinery', 'Mining Slurry'],
  'pharmaceutical': ['Pharmaceutical', 'Biotech', 'Medical Devices', 'Pharmaceutical Manufacturing'],
};

function matchesIndustry(productIndustry: string[], slug: string): boolean {
  const aliases = INDUSTRY_ALIASES[slug] || [slug];
  return productIndustry.some((ind) =>
    aliases.some((alias) => slugify(alias) === slugify(ind))
  );
}

export async function getIndustries(): Promise<Industry[]> {
  const products = await loadProducts();
  const industryList = [
    { id: 'power-generation', slug: 'power-generation', name: 'Power Generation', icon: 'Zap', image: '/images/industries/power-generation.jpg' },
    { id: 'oil-gas', slug: 'oil-gas', name: 'Oil & Gas', icon: 'Fuel', image: '/images/industries/oil-gas.jpg' },
    { id: 'marine', slug: 'marine', name: 'Marine', icon: 'Ship', image: '/images/industries/marine.jpg' },
    { id: 'energy', slug: 'energy', name: 'Energy', icon: 'Bolt', image: '/images/industries/energy.jpg' },
    { id: 'manufacturing', slug: 'manufacturing', name: 'Manufacturing', icon: 'Factory', image: '/images/industries/manufacturing.jpg' },
    { id: 'automotive', slug: 'automotive', name: 'Automotive', icon: 'Car', image: '/images/industries/automotive.jpg' },
    { id: 'aerospace', slug: 'aerospace', name: 'Aerospace', icon: 'Plane', image: '/images/industries/aerospace.jpg' },
    { id: 'chemical', slug: 'chemical', name: 'Chemical Processing', icon: 'Flask', image: '/images/industries/chemical.jpg' },
    { id: 'mining', slug: 'mining', name: 'Mining & Minerals', icon: 'Pickaxe', image: '/images/industries/mining.jpg' },
    { id: 'pharmaceutical', slug: 'pharmaceutical', name: 'Pharmaceutical', icon: 'Pill', image: '/images/industries/pharmaceutical.jpg' },
  ];
  const indMap = new Map(industryList.map(i => [i.id, { ...i, description: `Comprehensive solutions for the ${i.name} industry.`, shortDescription: `${i.name} solutions`, solutions: [], productCount: 0 }]));
  for (const p of products) {
    for (const [id, entry] of indMap) {
      if (matchesIndustry(p.industry, id)) entry.productCount++;
    }
  }
  return Array.from(indMap.values());
}

const INDUSTRY_ALIASES_LOOKUP: Record<string, string> = {
  'power-plants': 'power-generation',
};

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const canonical = INDUSTRY_ALIASES_LOOKUP[slug] || slug;
  const industries = await getIndustries();
  return industries.find(i => i.slug === canonical || i.id === canonical) || null;
}
