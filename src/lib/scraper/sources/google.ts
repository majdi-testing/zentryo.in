import * as cheerio from 'cheerio';
import axios from 'axios';
import { getRandomUA, normalizeProduct, inferCategory } from '../normalizer';
import type { ExternalProduct } from '@/types';

export async function scrapeGoogle(query: string, page: number): Promise<ExternalProduct[]> {
  try {
    const start = (page - 1) * 10;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query + ' industrial')}&tbm=shop&start=${start}`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': getRandomUA(),
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 6000,
    });
    const $ = cheerio.load(data);
    const products: ExternalProduct[] = [];

    $('.sh-dgr__content, .sh-dgr__grid-result, [data-name]').each((_, el) => {
      const title = $(el).find('.tAxDx, .sh-t__title, [role="heading"]').text().trim()
        || $(el).attr('data-name') || '';
      const snippet = $(el).find('.LX3sXb, .sh-ds__info').text().trim() || '';
      const imageUrl = $(el).find('img').first().attr('src') || '';
      const sourceUrl = $(el).find('a').first().attr('href') || '';
      if (title && title.length > 5) {
        products.push(normalizeProduct({
          title,
          snippet,
          imageUrl: imageUrl.startsWith('http') ? imageUrl : '',
          sourceUrl: sourceUrl.startsWith('http') ? sourceUrl : '',
          source: 'google',
          category: inferCategory(query),
        }));
      }
    });

    if (products.length < 3) {
      $('div.g, div[data-hveid]').each((_, el) => {
        const title = $(el).find('h3').text().trim() || '';
        const snippet = $(el).find('.VwiC3b, [data-sncf]').text().trim() || '';
        const imageUrl = $(el).find('img').first().attr('src') || '';
        const sourceUrl = $(el).find('a').first().attr('href') || '';
        if (title && !products.some(p => p.name.includes(title.slice(0, 20)))) {
          products.push(normalizeProduct({
            title, snippet,
            imageUrl: imageUrl && imageUrl.startsWith('http') ? imageUrl : '',
            sourceUrl: sourceUrl.startsWith('http') ? sourceUrl : '',
            source: 'google', category: inferCategory(query),
          }));
        }
      });
    }

    return products.slice(0, 10);
  } catch {
    return [];
  }
}
