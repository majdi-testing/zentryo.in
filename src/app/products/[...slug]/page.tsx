import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getProductBySlug } from '@/lib/data-service';
import { getCategoryDef, getSubcategoryDef, productCatalog } from '@/lib/product-catalog';
import { ProductDetailContent } from '@/components/products/product-detail-content';
import { CatalogListingContent } from '@/components/products/catalog-listing-content';

type SearchParams = { [key: string]: string | string[] | undefined };

interface CatchAllProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<SearchParams>;
}
function titleCase(str: string) {
  return str
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: CatchAllProps): Promise<Metadata> {
  const { slug: segments } = await params;
  if (!Array.isArray(segments) || segments.length === 0 || segments.length > 2) {
    return { title: `Not Found | ${siteConfig.name}` };
  }

  // Two segments → category/subcategory
  if (segments.length === 2) {
    const category = getCategoryDef(segments[0]);
    const subcategory = getSubcategoryDef(segments[0], segments[1]);
    if (category && subcategory) {
      return {
        title: `${subcategory.name} | ${siteConfig.name}`,
        description: subcategory.description,
        alternates: { canonical: `${siteConfig.url}/products/${category.slug}/${subcategory.slug}` },
      };
    }
    return { title: `Not Found | ${siteConfig.name}` };
  }

  // Single segment → product or category
  const slug = segments[0];
  const category = getCategoryDef(slug);
  if (category) {
    return {
      title: `${category.name} | ${siteConfig.name}`,
      description: category.description,
      alternates: { canonical: `${siteConfig.url}/products/${category.slug}` },
    };
  }

  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: `Product Not Found | ${siteConfig.name}` };
  }
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.seoKeywords,
    alternates: { canonical: `${siteConfig.url}/products/${product.slug}` },
  };
}

export default async function ProductsCatchAllPage({ params, searchParams }: CatchAllProps) {
  const [segments, sp] = await Promise.all([
    params.then((p) => p.slug),
    searchParams ?? Promise.resolve<SearchParams>({}),
  ]);
  if (!Array.isArray(segments) || segments.length === 0 || segments.length > 2) {
    notFound();
  }

  const page = typeof sp?.page === 'string' ? Math.max(1, parseInt(sp.page, 10) || 1) : 1;
  // Two segments → category/subcategory listing
  if (segments.length === 2) {
    const category = getCategoryDef(segments[0]);
    const subcategory = getSubcategoryDef(segments[0], segments[1]);
    if (category && subcategory) {
      return <CatalogListingContent category={category} subcategory={subcategory} page={page} />;
    }
    notFound();
  }

  // Single segment → product or category listing
  const slug = segments[0];
  const category = getCategoryDef(slug);
  if (category) {
    return <CatalogListingContent category={category} page={page} />;
  }

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
