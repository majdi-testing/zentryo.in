'use client';

import Link from 'next/link';

import { Zap, Fuel, Ship, Bolt, Factory, Beaker, Pickaxe, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const industries = [
  { slug: 'power-plants', name: 'Power Plants', description: 'Turbine parts, generators, and control systems for power generation.', icon: Zap, image: 'https://images.pexels.com/photos/12270481/pexels-photo-12270481.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'oil-gas', name: 'Oil & Gas', description: 'Valves, instrumentation, and safety systems for upstream and downstream.', icon: Fuel, image: 'https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'marine', name: 'Marine', description: 'Marine-grade components and propulsion system parts.', icon: Ship, image: 'https://images.pexels.com/photos/12583030/pexels-photo-12583030.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'energy', name: 'Energy', description: 'Renewable and conventional energy infrastructure components.', icon: Bolt, image: 'https://images.pexels.com/photos/9893727/pexels-photo-9893727.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'manufacturing', name: 'Manufacturing', description: 'Automation, bearings, and precision components for production.', icon: Factory, image: 'https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'chemical', name: 'Chemical', description: 'Process control, valves, and corrosion-resistant equipment.', icon: Beaker, image: 'https://images.pexels.com/photos/6754758/pexels-photo-6754758.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'mining', name: 'Mining', description: 'Heavy-duty components for mineral extraction and processing.', icon: Pickaxe, image: 'https://images.pexels.com/photos/18500079/pexels-photo-18500079.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'aerospace', name: 'Aerospace', description: 'High-precision certified components for aerospace applications.', icon: Plane, image: 'https://images.pexels.com/photos/30210231/pexels-photo-30210231.jpeg?auto=compress&cs=tinysrgb&w=800' },
];



export function IndustriesSection() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Industries
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Industries We Serve
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Comprehensive industrial solutions tailored to the unique demands of each sector
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {industries.map((industry) => (
            <div key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                className={cn(
                  'group block relative overflow-hidden rounded-xl min-h-[260px]',
                  'hover:shadow-xl hover:shadow-navy-900/20',
                  'transition-all duration-500'
                )}
              >
                <img
                  src={industry.image}
                  alt={industry.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/60 to-navy-900/40" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full transition-all duration-500 group-hover:bg-cyan-500/20 group-hover:scale-110" />
                <div className="relative z-10 flex flex-col h-full min-h-[260px] p-6 justify-end">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/30 flex items-center justify-center mb-4 group-hover:bg-cyan-500/40 transition-colors">
                    <industry.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{industry.name}</h4>
                  <p className="text-sm text-steel-300 leading-relaxed flex-1">{industry.description}</p>
                  <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
