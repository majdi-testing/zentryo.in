'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Cog, Gauge, Cpu, Activity, Fan, Droplets, Wind, Zap, Package, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface CategoryCard {
  slug: string;
  name: string;
  subcategories: string[];
  productCount: number;
}

const categoryMeta: Record<string, { icon: React.ElementType; image: string; group: string }> = {
  valves: { icon: Gauge, image: 'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Fluid Power & Motion' },
  bearings: { icon: Cog, image: 'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Mechanical Power & Support' },
  automation: { icon: Cpu, image: 'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Electrical & Automation' },
  controllers: { icon: Activity, image: 'https://images.pexels.com/photos/18471537/pexels-photo-18471537.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Electrical & Automation' },
  sensors: { icon: Activity, image: 'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Electrical & Automation' },
  hydraulics: { icon: Droplets, image: 'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Fluid Power & Motion' },
  pneumatics: { icon: Wind, image: 'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Fluid Power & Motion' },
  'turbine-parts': { icon: Fan, image: 'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Specialized Components' },
  electrical: { icon: Zap, image: 'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Electrical & Automation' },
  filters: { icon: Wind, image: 'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Fluid Power & Motion' },
  seals: { icon: Cog, image: 'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Mechanical Power & Support' },
  gears: { icon: Cog, image: 'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Mechanical Power & Support' },
  couplings: { icon: Gauge, image: 'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Mechanical Power & Support' },
  fasteners: { icon: Cog, image: 'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Mechanical Power & Support' },
  manifolds: { icon: Package, image: 'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Fluid Power & Motion' },
  'plc-accessories': { icon: Cpu, image: 'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=800', group: 'Electrical & Automation' },
};

const groupInfo: Record<string, { description: string }> = {
  'Fluid Power & Motion': { description: 'Valves, hydraulics, pneumatics, and filtration systems for fluid control' },
  'Mechanical Power & Support': { description: 'Bearings, gears, couplings, fasteners, and sealing solutions' },
  'Electrical & Automation': { description: 'PLCs, sensors, controllers, drives, and electrical distribution' },
  'Specialized Components': { description: 'Turbine parts, manifolds, and specialized industrial components' },
};

export function CategoriesSection({ categories }: { categories: CategoryCard[] }) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups = [...new Set(categories.map(c => categoryMeta[c.slug]?.group || 'Other'))];
  const filtered = activeGroup
    ? categories.filter(c => categoryMeta[c.slug]?.group === activeGroup)
    : categories;

  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Categories
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Product Categories
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Extensive inventory of industrial components across all major categories
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up">
          <button
            onClick={() => setActiveGroup(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeGroup === null
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-white text-steel-600 hover:bg-steel-100 border border-steel-200'
            )}
          >
            All Categories
          </button>
          {groups.map(group => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeGroup === group
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-white text-steel-600 hover:bg-steel-100 border border-steel-200'
              )}
            >
              {group}
            </button>
          ))}
        </div>

        {activeGroup && (
          <div className="text-center mb-10 animate-fade-in-up">
            <p className="text-steel-500 text-sm max-w-xl mx-auto">
              {groupInfo[activeGroup]?.description}
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {filtered.map((cat) => {
            const meta = categoryMeta[cat.slug];
            const Icon = meta?.icon || Package;
            return (
              <div key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className={cn(
                    'group relative block rounded-xl overflow-hidden min-h-[260px]',
                    'hover:shadow-xl transition-all duration-300'
                  )}
                >
                  <Image
                    src={meta?.image || ''}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-navy-900/30 group-hover:from-navy-900/95 transition-colors" />
                  <div className="relative z-10 flex flex-col h-full min-h-[260px] p-6 justify-end">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/30 flex items-center justify-center mb-4 group-hover:bg-cyan-500/40 transition-colors">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-sm text-steel-300 mb-2">
                      {cat.productCount.toLocaleString()} products
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cat.subcategories?.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-steel-200"
                        >
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories?.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-steel-200">
                          +{cat.subcategories.length - 3}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-steel-300 mx-auto mb-4" />
            <p className="text-steel-500">No categories found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
