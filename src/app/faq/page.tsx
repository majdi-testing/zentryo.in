'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { getFAQs } from '@/lib/repository';

interface FAQ { id: string; question: string; answer: string; category: string; order: number; }

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getFAQs().then(setFaqs);
  }, []);

  const categories = [...new Set(faqs.map((f) => f.category))];
  const filtered = search
    ? faqs.filter((f) => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">FAQ</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Find answers to common questions about our products, services, ordering process, and more.
            </p>
          </div>
          <div className="relative max-w-xl mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-steel-400 focus-visible:ring-cyan-400"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {search && (
            <p className="text-sm text-steel-500 mb-6 animate-fade-in-up">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
            </p>
          )}

          {filtered.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {categories.map((category) => {
                const catFaqs = filtered.filter((f) => f.category === category);
                if (catFaqs.length === 0) return null;
                return (
                  <div key={category} className="animate-fade-in-up">
                    <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-cyan-500" />
                      {category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {catFaqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border border-steel-100 rounded-lg px-4">
                          <AccordionTrigger className="text-sm font-medium text-navy-900 hover:text-cyan-600 hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-steel-600 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <HelpCircle className="h-16 w-16 text-steel-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-navy-900 mb-2">No Results Found</h2>
              <p className="text-steel-500 mb-6">No FAQs match your search criteria. Try different keywords.</p>
              <Button onClick={() => setSearch('')} variant="outline" className="border-navy-200">Clear Search</Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
              <p className="text-steel-200 text-lg mb-8">
                Our team is ready to provide personalized answers to your specific questions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Submit an RFQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
