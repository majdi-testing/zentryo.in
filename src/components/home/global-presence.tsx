'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin, Building, Ship } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { icon: Globe, value: '80+', label: 'Countries Served' },
  { icon: MapPin, value: '12', label: 'Distribution Centers' },
  { icon: Building, value: '4', label: 'Regional Offices' },
  { icon: Ship, value: '500+', label: 'Logistics Partners' },
];

export function GlobalPresence() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Global Presence
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-tight mb-6">
              Worldwide Reach,<br />Local Expertise
            </h3>
            <p className="text-steel-600 leading-relaxed mb-8">
              Our global network spans 80+ countries with distribution centers across
              North America, Europe, Middle East, and Asia-Pacific. We combine worldwide
              sourcing capabilities with local market knowledge to deliver exceptional service.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className={cn(
                  'flex items-center gap-3 p-4 rounded-xl bg-steel-50 border border-steel-100',
                  'hover:border-cyan-200 hover:shadow-md hover:shadow-cyan-500/5 transition-all duration-300'
                )}>
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0 group-hover:bg-cyan-100 transition-colors">
                    <stat.icon className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-navy-800">{stat.value}</div>
                    <div className="text-xs text-steel-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.pexels.com/photos/12583030/pexels-photo-12583030.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Global shipping and logistics network"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-900/60 to-cyan-900/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />

            <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full opacity-40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="400" cy="250" rx="300" ry="150" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" />
                  <circle cx="400" cy="250" r="200" stroke="currentColor" className="text-cyan-400/50" strokeWidth="0.3" strokeDasharray="4 4" />
                  <circle cx="180" cy="180" r="4" fill="currentColor" className="text-cyan-400" />
                  <circle cx="600" cy="200" r="4" fill="currentColor" className="text-cyan-400" />
                  <circle cx="350" cy="300" r="4" fill="currentColor" className="text-cyan-400" />
                  <circle cx="500" cy="320" r="4" fill="currentColor" className="text-cyan-400" />
                  <circle cx="250" cy="350" r="4" fill="currentColor" className="text-cyan-400" />
                  <line x1="180" y1="180" x2="350" y2="300" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.5" />
                  <line x1="600" y1="200" x2="500" y2="320" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.5" />
                  <line x1="350" y1="300" x2="500" y2="320" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.5" />
                  <line x1="180" y1="180" x2="600" y2="200" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.5" />
                  <line x1="250" y1="350" x2="350" y2="300" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.5" />
                  <line x1="250" y1="350" x2="500" y2="320" stroke="currentColor" className="text-cyan-400/30" strokeWidth="0.5" />
                </svg>

                <div className="absolute top-1/4 left-1/4 text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">NA</div>
                  <div className="text-[10px] text-cyan-300">North America</div>
                </div>
                <div className="absolute top-1/4 right-1/4 text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">EU</div>
                  <div className="text-[10px] text-cyan-300">Europe</div>
                </div>
                <div className="absolute bottom-1/4 left-1/3 text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">ME</div>
                  <div className="text-[10px] text-cyan-300">Middle East</div>
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">AP</div>
                  <div className="text-[10px] text-cyan-300">Asia-Pacific</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
