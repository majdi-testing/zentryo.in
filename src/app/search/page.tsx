import { redirect } from 'next/navigation';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = params.q || '';
  const queryString = q ? `?search=${encodeURIComponent(q)}` : '';
  redirect(`/products${queryString}`);
}
