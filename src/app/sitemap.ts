import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { loadAllProducts, getCategories, getBrands, getIndustries } from '@/lib/data-service';
import { getBlogPosts, getServices, getSolutions } from '@/lib/repository';
import { productCatalog } from '@/lib/product-catalog';

const STATIC_ROUTES = [
  '',
  '/about',
  '/products',
  '/categories',
  '/brands',
  '/industries',
  '/solutions',
  '/services',
  '/blog',
  '/downloads',
  '/certificates',
  '/resources',
  '/faq',
  '/contact',
  '/rfq',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.7,
  }));

  const products = await loadAllProducts();
  const productEntries: MetadataRoute.Sitemap = products.slice(0, 50000).map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt || p.createdAt || now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = (await getServices()).map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const solutionEntries: MetadataRoute.Sitemap = (await getSolutions()).map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await getBlogPosts();
    blogEntries = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt || now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // repository not available at build time — skip
  }

  const categoryEntries: MetadataRoute.Sitemap = (await getCategories()).map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const brandEntries: MetadataRoute.Sitemap = (await getBrands()).map((b) => ({
    url: `${baseUrl}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const industryEntries: MetadataRoute.Sitemap = (await getIndustries()).map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const catalogEntries: MetadataRoute.Sitemap = productCatalog.flatMap((cat): MetadataRoute.Sitemap => [
    {
      url: `${baseUrl}/products/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...cat.subcategories.map((sub): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}/products/${cat.slug}/${sub.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ]);

  return [
    ...staticEntries,
    ...productEntries,
    ...serviceEntries,
    ...solutionEntries,
    ...categoryEntries,
    ...catalogEntries,
    ...brandEntries,
    ...industryEntries,
    ...blogEntries,
  ].slice(0, 50000);
}