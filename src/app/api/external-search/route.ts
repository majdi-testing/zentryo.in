import { NextRequest, NextResponse } from 'next/server';
import { searchExternalProducts } from '@/lib/scraper/engine';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  if (!q.trim()) {
    return NextResponse.json(
      { data: [], total: 0, page: 1, totalPages: 0 },
      { status: 400 }
    );
  }

  try {
    const results = await searchExternalProducts(q, page);
    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, max-age=900, s-maxage=900',
      },
    });
  } catch {
    return NextResponse.json(
      { data: [], total: 0, page, totalPages: 0, error: 'Search failed' },
      { status: 500 }
    );
  }
}
