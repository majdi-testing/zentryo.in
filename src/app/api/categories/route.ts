import { NextResponse } from 'next/server';
import { getCategories, loadAllProducts } from '@/lib/repository';

export async function GET() {
  const categories = await getCategories();

  const allProducts = await loadAllProducts();
  const subcategoryMap = new Map<string, Set<string>>();
  for (const p of allProducts) {
    const slug = p.category.toLowerCase().replace(/\s+/g, '-');
    if (!subcategoryMap.has(slug)) {
      subcategoryMap.set(slug, new Set());
    }
    subcategoryMap.get(slug)!.add(p.subcategory);
  }

  const result = categories.map(c => ({
    slug: c.slug,
    name: c.name,
    productCount: c.productCount,
    subcategories: Array.from(subcategoryMap.get(c.slug) || []).slice(0, 6),
  }));

  return NextResponse.json(result);
}
