'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    slug: 'industrial-automation-trends-2026',
    category: 'Automation',
    title: 'Top Industrial Automation Trends Shaping 2026',
    excerpt: 'Explore the cutting-edge automation technologies transforming industrial operations.',
    publishedAt: '2026-06-15',
    readTime: 8,
    image: 'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'gas-turbine-maintenance-guide',
    category: 'Maintenance',
    title: 'Complete Guide to Gas Turbine Maintenance',
    excerpt: 'Essential maintenance practices for optimal gas turbine performance and longevity.',
    publishedAt: '2026-05-20',
    readTime: 12,
    image: 'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'industrial-bearing-selection',
    category: 'Engineering',
    title: 'How to Select the Right Industrial Bearing',
    excerpt: 'A comprehensive guide to choosing bearings for your specific application.',
    publishedAt: '2026-04-10',
    readTime: 10,
    image: 'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function LatestBlogs() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Insights
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
              Industry Insights
            </h3>
          </div>
          <Button asChild variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50 shrink-0">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className={cn(
                  'group block rounded-xl bg-white border border-steel-100 overflow-hidden',
                  'hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10',
                  'transition-all duration-300'
                )}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs bg-white/95">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-navy-800 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-steel-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-steel-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime} min read
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
