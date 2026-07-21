'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { ArrowRight, Package, Phone, Mail, CheckCircle, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, productImages } from '@/lib/utils';

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  availability: string;
}

const topProducts: ProductItem[] = [
  { id: '1', slug: 'products', name: 'Premium Industrial Valves', brand: 'Cameron', category: 'Valves', shortDescription: 'High-performance gate, ball & butterfly valves for oil & gas and process industries.', availability: 'in-stock' },
  { id: '2', slug: 'products', name: 'SKF Precision Bearings', brand: 'SKF', category: 'Bearings', shortDescription: 'Premium quality bearings for heavy-duty industrial applications.', availability: 'in-stock' },
  { id: '3', slug: 'products', name: 'Siemens PLC Systems', brand: 'Siemens', category: 'Automation', shortDescription: 'Industrial automation controllers for precision process control.', availability: 'in-stock' },
  { id: '4', slug: 'products', name: 'Gas Turbine Components', brand: 'GE', category: 'Turbine Parts', shortDescription: 'High-grade turbine blades, nozzles & combustion parts for power generation.', availability: 'made-to-order' },
];

export function LatestBlogs() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* Top Products Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Top Products
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">
              Premium Industrial Products
            </h3>
            <p className="text-steel-600 max-w-2xl mx-auto text-lg">
              High-quality industrial components from world's leading manufacturers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {topProducts.map((product, i) => (
              <div key={product.id} className="group">
                <div className={cn(
                  'relative rounded-2xl overflow-hidden bg-white border border-steel-200',
                  'hover:shadow-xl hover:-translate-y-1 hover:border-cyan-200',
                  'transition-all duration-300'
                )}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={productImages[i % productImages.length]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-semibold border-0">
                      {product.brand}
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3 bg-white/95 text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-navy-900 mb-1.5 group-hover:text-cyan-600 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-sm text-steel-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={cn(
                        'flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
                        product.availability === 'in-stock' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-amber-700 bg-amber-50 border border-amber-200'
                      )}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {product.availability === 'in-stock' ? 'In Stock' : 'Made to Order'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/${product.slug}`} className="flex-1 text-center px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
                        Get Quote
                      </Link>
                      <Link href="/contact" className="flex-1 text-center px-3 py-2 border border-steel-300 text-navy-700 hover:bg-steel-50 text-sm font-semibold rounded-lg transition-colors">
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up">
            <Link href="/products">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 shadow-lg shadow-cyan-500/25">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Generation CTA */}
      <section className="relative overflow-hidden py-20 gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">
                Get In Touch
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Need a Quote or Technical Support?
              </h3>
              <p className="text-steel-300 text-lg mb-8 leading-relaxed">
                Our team of industry experts is ready to help you find the right products
                at the best prices. Get a personalized quote within 4 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919718303073" className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all border border-white/20">
                  <Phone className="h-4 w-4 text-cyan-400" />
                  Call Us Now
                </a>
                <a href="mailto:sales@zentryo.com" className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all border border-white/20">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  Email Sales
                </a>
                <Link href="/rfq" className="inline-flex items-center gap-2.5 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/30">
                  Submit RFQ <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-6">Stay Updated</h4>
                {submitted ? (
                  <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 rounded-xl px-5 py-4">
                    <CheckCircle className="h-6 w-6 shrink-0" />
                    <p className="text-sm font-medium">Thank you! We'll keep you updated with the best deals.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-steel-300 mb-4">
                      Subscribe to get exclusive product updates, industry insights, and special offers directly in your inbox.
                    </p>
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-steel-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3">
                      Subscribe for Updates
                    </Button>
                    <p className="text-xs text-steel-400 text-center">No spam. Unsubscribe anytime.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white border-b border-steel-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: 'ISO 9001 Certified', desc: 'Quality Management' },
              { icon: Clock, label: '24/7 Support', desc: 'Technical Assistance' },
              { icon: CheckCircle, label: '99.7% Delivery', desc: 'On-Time Guarantee' },
              { icon: Star, label: 'Trusted Since 2000', desc: '25+ Years Experience' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-steel-50">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900">{item.label}</div>
                  <div className="text-xs text-steel-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
