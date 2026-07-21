import * as cheerio from 'cheerio';
import axios from 'axios';
import { getRandomUA, normalizeProduct, inferCategory } from '../normalizer';
import type { ExternalProduct } from '@/types';

export async function scrapeBing(query: string, page: number): Promise<ExternalProduct[]> {
  try {
    const first = (page - 1) * 10 + 1;
    const url = `https://www.bing.com/shop/search?q=${encodeURIComponent(query)}&first=${first}`;
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

    $('.br-item, .prodCard, .productCard, [data-product]').each((_, el) => {
      const title = $(el).find('.br-title, .prodTitle, .productTitle').text().trim() || '';
      const snippet = $(el).find('.br-desc, .prodDesc, .productDesc').text().trim() || '';
      const imageUrl = $(el).find('img').first().attr('src') || '';
      let sourceUrl = $(el).find('a').first().attr('href') || '';
      if (sourceUrl.includes('/redirect?')) {
        const match = sourceUrl.match(/url=([^&]+)/);
        if (match) sourceUrl = decodeURIComponent(match[1]);
      }

      if (title && title.length > 5) {
        products.push(normalizeProduct({
          title, snippet,
          imageUrl: imageUrl.startsWith('http') ? imageUrl : '',
          sourceUrl,
          source: 'bing',
          category: inferCategory(query),
        }));
      }
    });

    return products.slice(0, 10);
  } catch {
    return [];
  }
}
