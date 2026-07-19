'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileCheck, Globe, Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const certificates = [
  { name: 'ISO 9001:2024', issuer: 'Bureau Veritas', category: 'Quality', icon: ShieldCheck, image: 'https://images.pexels.com/photos/32845680/pexels-photo-32845680.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'ISO 14001:2024', issuer: 'Bureau Veritas', category: 'Environmental', icon: Award, image: 'https://images.pexels.com/photos/9893727/pexels-photo-9893727.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'AS9100D', issuer: 'SAE International', category: 'Aerospace', icon: FileCheck, image: 'https://images.pexels.com/photos/30210231/pexels-photo-30210231.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'API Q1', issuer: 'American Petroleum Institute', category: 'Oil & Gas', icon: Globe, image: 'https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'CE Marking', issuer: 'European Commission', category: 'Compliance', icon: Sparkles, image: 'https://images.pexels.com/photos/4494653/pexels-photo-4494653.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'ATEX', issuer: 'INERIS', category: 'Safety', icon: Flame, image: 'https://images.pexels.com/photos/35792100/pexels-photo-35792100.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export function CertificatesSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Certifications
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Certifications & Compliance
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Our commitment to quality is validated by leading international certification bodies
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-scroll-right" style={{ width: 'max-content' }}>
          {[...certificates, ...certificates].map((cert, i) => (
            <div
              key={`${cert.name}-${i}`}
              className={cn(
                'group relative flex items-center gap-5 p-5 rounded-xl border border-steel-100 bg-white overflow-hidden min-w-[300px]',
                'hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300'
              )}
            >
              <img
                src={cert.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/95" />
              <div className="relative z-10 w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0 group-hover:bg-cyan-100 transition-colors">
                <cert.icon className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="relative z-10 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-bold text-navy-800 whitespace-nowrap">{cert.name}</h4>
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 whitespace-nowrap">{cert.category}</Badge>
                </div>
                <p className="text-xs text-steel-500">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-right {
          animation: scroll-right 45s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
