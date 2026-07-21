'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  BrainCircuit, Truck, Wrench, GraduationCap, SearchCheck, Hammer, ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { slug: 'engineering-consulting', icon: BrainCircuit, title: 'Engineering Consulting', description: 'Expert engineering consultation for complex industrial challenges from design to optimization.', image: 'https://images.pexels.com/photos/3846251/pexels-photo-3846251.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'supply-chain', icon: Truck, title: 'Supply Chain Management', description: 'End-to-end supply chain solutions ensuring timely delivery of critical industrial components.', image: 'https://images.pexels.com/photos/36694994/pexels-photo-36694994.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'maintenance-repair', icon: Wrench, title: 'Maintenance & Repair', description: 'Professional maintenance and repair services to maximize equipment lifespan and reliability.', image: 'https://images.pexels.com/photos/35290678/pexels-photo-35290678.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'technical-training', icon: GraduationCap, title: 'Technical Training', description: 'Industry-specific technical training programs for engineering teams and operators.', image: 'https://images.pexels.com/photos/35216547/pexels-photo-35216547.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'quality-inspection', icon: SearchCheck, title: 'Quality Inspection', description: 'Advanced quality inspection services ensuring components meet the highest industry standards.', image: 'https://images.pexels.com/photos/32845674/pexels-photo-32845674.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'custom-fabrication', icon: Hammer, title: 'Custom Fabrication', description: 'Custom engineering and fabrication of specialized components to exact specifications.', image: 'https://images.pexels.com/photos/30117046/pexels-photo-30117046.jpeg?auto=compress&cs=tinysrgb&w=800' },
];



export function EngineeringServices() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Services
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Engineering Services
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Comprehensive engineering support services throughout your project lifecycle
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {services.map((svc) => (
            <Link
              key={svc.title}
              href={`/services/${svc.slug}`}
              className={cn(
                'group relative overflow-hidden rounded-xl border border-steel-100 bg-white block',
                'hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10',
                'transition-all duration-300'
              )}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="relative z-10 p-6 pt-0 -mt-12">
                <div className="w-12 h-12 rounded-xl bg-cyan-500 border-2 border-white shadow-lg flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
                  <svc.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-navy-800 mb-2 group-hover:text-cyan-600 transition-colors">{svc.title}</h4>
                <p className="text-sm text-steel-500 leading-relaxed mb-3">{svc.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
