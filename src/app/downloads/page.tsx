'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Download, FileText, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getDownloads } from '@/lib/repository';
import { formatDate } from '@/lib/utils';
import type { DownloadResource } from '@/types';

const typeColors: Record<string, string> = {
  catalog: 'bg-purple-50 text-purple-700',
  datasheet: 'bg-blue-50 text-blue-700',
  manual: 'bg-amber-50 text-amber-700',
  whitepaper: 'bg-cyan-50 text-cyan-700',
  brochure: 'bg-green-50 text-green-700',
  drawing: 'bg-rose-50 text-rose-700',
};

export default function DownloadsPage() {
  const [resources, setResources] = useState<DownloadResource[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => { getDownloads().then(setResources); }, []);

  const categories = ['All', ...new Set(resources.map((r) => r.category))];
  const filtered = resources.filter((r) => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Downloads</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Downloads & Resources</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Access product catalogs, technical manuals, datasheets, and engineering guides from ZENTRYO.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-navy-800 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((resource, index) => (
              <Card key={resource.id} className="border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">{resource.title}</h3>
                        <p className="text-sm text-steel-500 mt-0.5">{resource.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-steel-400 mb-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${typeColors[resource.type] || 'bg-gray-50 text-gray-700'}`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                    <span>{resource.size}</span>
                    <span>{resource.downloadCount} downloads</span>
                    <span>{formatDate(resource.createdAt)}</span>
                  </div>
                  <a href={resource.file} download className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
                    <Download className="h-4 w-4" /> Download
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-steel-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-navy-900 mb-2">No Resources Found</h2>
              <p className="text-steel-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
