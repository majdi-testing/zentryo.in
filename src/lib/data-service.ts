import fs from 'fs';
import path from 'path';
import type { Product, ProductFilters, PaginatedResponse, Category, Brand, Industry } from '@/types';
import { paginate } from '@/lib/utils';
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

  if (category) products = products.filter(p => p.category === category || p.subcategory === category);
  if (brand) products = products.filter(p => p.brand === brand);
  if (industry) products = products.filter(p => p.industry.includes(industry));
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
  const brandMap = new Map<string, Brand>();
  for (const p of products) {
    if (!brandMap.has(p.brand)) {
      brandMap.set(p.brand, {
        id: p.brand.toLowerCase().replace(/\s+/g, '-'),
        slug: p.brand.toLowerCase().replace(/\s+/g, '-'),
        name: p.brand,
        logo: `/images/brands/${p.brand.toLowerCase().replace(/\s+/g, '-')}.png`,
        description: `${p.brand} - Trusted industrial manufacturer.`,
        website: `https://www.${p.brand.toLowerCase().replace(/\s+/g, '')}.com`,
        country: 'United States',
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

export async function getIndustries(): Promise<Industry[]> {
  const products = await loadProducts();
  const industryList = [
    { id: 'power-plants', slug: 'power-plants', name: 'Power Plants', icon: 'Zap', image: '/images/industries/power-plants.jpg' },
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
    for (const ind of p.industry) {
      const key = ind.toLowerCase().replace(/\s+/g, '-');
      const entry = indMap.get(key) || indMap.get(ind.replace(/\s+/g, '-').toLowerCase());
      if (entry) entry.productCount++;
    }
  }
  return Array.from(indMap.values());
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const industries = await getIndustries();
  return industries.find(i => i.slug === slug) || null;
}
