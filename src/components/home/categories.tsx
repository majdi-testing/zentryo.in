'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cog, Gauge, Cpu, Activity, Fan, Droplets, Wind, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const categories = [
  { slug: 'bearings', name: 'Industrial Bearings', icon: Cog, count: '12,000+', image: 'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'valves', name: 'Valves', icon: Gauge, count: '8,500+', image: 'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'automation', name: 'Automation', icon: Cpu, count: '6,200+', image: 'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'sensors', name: 'Sensors', icon: Activity, count: '4,800+', image: 'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'turbine-parts', name: 'Turbine Parts', icon: Fan, count: '3,100+', image: 'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'hydraulics', name: 'Hydraulics', icon: Droplets, count: '5,400+', image: 'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'pneumatics', name: 'Pneumatics', icon: Wind, count: '4,200+', image: 'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'electrical', name: 'Electrical', icon: Zap, count: '6,800+', image: 'https://images.pexels.com/photos/18471537/pexels-photo-18471537.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function CategoriesSection() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Categories
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Product Categories
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Extensive inventory of industrial components across all major categories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <Link
                href={`/categories/${cat.slug}`}
                className={cn(
                  'group relative block rounded-xl overflow-hidden min-h-[260px]',
                  'hover:shadow-xl transition-all duration-300'
                )}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-navy-900/30 group-hover:from-navy-900/95 transition-colors" />
                <div className="relative z-10 flex flex-col h-full min-h-[260px] p-6 justify-end">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/30 flex items-center justify-center mb-4 group-hover:bg-cyan-500/40 transition-colors">
                    <cat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-sm text-steel-300 mb-4">{cat.count} products</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
