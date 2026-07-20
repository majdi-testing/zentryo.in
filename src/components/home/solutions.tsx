'use client';

import Link from 'next/link';

import { Cpu, Zap, Gauge, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    slug: 'automation-systems',
    icon: Cpu,
    title: 'Automation Systems',
    description: 'End-to-end industrial automation solutions for improved productivity and operational excellence.',
    features: ['PLC Programming', 'SCADA Systems', 'Robotics Integration', 'Process Control'],
  },
  {
    slug: 'power-generation',
    icon: Zap,
    title: 'Power Generation',
    description: 'Comprehensive solutions for power generation including gas turbine components and auxiliaries.',
    features: ['Turbine Parts', 'Generator Components', 'Control Systems', 'Balance of Plant'],
  },
  {
    slug: 'process-control',
    icon: Gauge,
    title: 'Process Control',
    description: 'State-of-the-art process control solutions for precise industrial process management.',
    features: ['DCS Systems', 'Instrumentation', 'Valve Automation', 'Safety Systems'],
  },
  {
    slug: 'fluid-power',
    icon: Droplets,
    title: 'Fluid Power Systems',
    description: 'Complete fluid power solutions including hydraulic and pneumatic systems for industrial applications.',
    features: ['Hydraulic Systems', 'Pneumatic Systems', 'Filtration', 'Power Units'],
  },
];



export function SolutionsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Solutions
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Engineering Solutions
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Integrated engineering solutions designed to optimize your industrial operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
          {solutions.map((sol) => (
            <div
              key={sol.slug}
              className={cn(
                'group relative p-8 rounded-xl border border-steel-100 bg-white',
                'hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/5',
                'transition-all duration-500'
              )}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                  <sol.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-bold text-navy-800 mb-2">{sol.title}</h4>
                  <p className="text-sm text-steel-500 leading-relaxed mb-4">{sol.description}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
                    {sol.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-steel-600">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
