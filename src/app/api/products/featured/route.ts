import { NextResponse } from 'next/server';
import { getFeaturedProducts } from '@/lib/repository';

export async function GET() {
  const products = await getFeaturedProducts();
  return NextResponse.json(products);
}
