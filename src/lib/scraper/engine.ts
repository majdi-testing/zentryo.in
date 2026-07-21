import type { ExternalProduct } from '@/types';
import { scrapeGoogle } from './sources/google';
import { scrapeBing } from './sources/bing';
import { getFallbackProducts, getFallbackTotalPages } from './sources/fallback';
import { getCached, setCache } from './cache';

export async function searchExternalProducts(
  query: string,
  page: number = 1
): Promise<{ data: ExternalProduct[]; total: number; page: number; totalPages: number }> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return { data: [], total: 0, page, totalPages: 0 };
  }

  const cacheKey = `ext:${trimmedQuery.toLowerCase()}:${page}`;
  const cached = getCached<{ data: ExternalProduct[]; total: number; totalPages: number }>(cacheKey);
  if (cached) {
    return { ...cached, page };
  }

  const [googleResults, bingResults] = await Promise.allSettled([
    scrapeGoogle(trimmedQuery, page),
    scrapeBing(trimmedQuery, page),
  ]);

  const scrapedResults: ExternalProduct[] = [];
  if (googleResults.status === 'fulfilled') {
    scrapedResults.push(...googleResults.value);
  }
  if (bingResults.status === 'fulfilled') {
    scrapedResults.push(...bingResults.value);
  }

  const seen = new Set<string>();
  const deduped = scrapedResults.filter(p => {
    const key = p.name.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (deduped.length === 0) {
    const fallback = getFallbackProducts(trimmedQuery, page);
    const totalPages = getFallbackTotalPages();
    const result = { data: fallback, total: fallback.length * totalPages, totalPages };
    setCache(cacheKey, result);
    return { ...result, page };
  }

  const totalPages = Math.max(10, Math.ceil(deduped.length / 10));
  const result = {
    data: deduped.slice(0, 10),
    total: deduped.length * totalPages,
    totalPages,
  };
  setCache(cacheKey, result);
  return { ...result, page };
}
