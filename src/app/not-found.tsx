import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Home, Package, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: '404 - Page Not Found | ZENTRYO',
  description: 'The page you are looking for does not exist. Browse our products or contact us for assistance.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-800/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-navy-900/5 to-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Large 404 */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-[10rem] md:text-[16rem] font-bold leading-none tracking-tighter bg-gradient-to-r from-navy-900 via-navy-700 to-cyan-500 bg-clip-text text-transparent select-none">
            404
          </h1>
        </div>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-navy-800 mx-auto mb-8 rounded-full" />

        <div className="max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-steel-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <form action="/search" method="GET">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-400" />
              <Input
                name="q"
                placeholder="Search for products..."
                className="pl-12 h-14 text-base bg-white border-steel-200 focus-visible:ring-cyan-400"
              />
            </form>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-navy-800 hover:bg-navy-900 text-white gap-2">
                <Home className="h-4 w-4" /> Go Home
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-navy-200 text-navy-700 gap-2">
                <Package className="h-4 w-4" /> Browse Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-navy-200 text-navy-700 gap-2">
                <Mail className="h-4 w-4" /> Contact Us
              </Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-steel-100">
            <p className="text-sm text-steel-500 mb-4">Popular Pages</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Categories', 'Brands', 'Industries', 'Services', 'Solutions', 'Blog', 'FAQ', 'About'].map((page) => (
                <Link key={page} href={`/${page.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-full text-sm bg-navy-50 text-navy-700 hover:bg-navy-100 transition-colors">
                  {page}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
