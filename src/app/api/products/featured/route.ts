import { NextResponse } from 'next/server';
import { getFeaturedProducts } from '@/lib/data-service';

export async function GET() {
  const products = await getFeaturedProducts();
  return NextResponse.json(products);
}
