'use client';

import { SearchCheck, ShieldCheck, FileCheck, Beaker, Award, Clock } from 'lucide-react';

const items = [
  {
    icon: SearchCheck,
    title: 'Incoming Inspection',
    description: 'Every incoming component undergoes dimensional verification, material certification review, and visual inspection per applicable standards.',
  },
  {
    icon: ShieldCheck,
    title: 'OEM Authentication',
    description: 'Products are verified against manufacturer databases to ensure authentic sourcing and counterfeit-free supply chain.',
  },
  {
    icon: FileCheck,
    title: 'Documentation & Traceability',
    description: 'Full traceability with batch numbers, mill test reports, certificates of conformance, and detailed inspection records.',
  },
  {
    icon: Beaker,
    title: 'Testing & Validation',
    description: 'Pressure testing, NDT, hardness testing, and functional validation performed in accordance with industry specifications.',
  },
  {
    icon: Award,
    title: 'Certified Compliance',
    description: 'All products meet ISO 9001, API, ASME, and other applicable standards with complete certification documentation.',
  },
  {
    icon: Clock,
    title: 'Packaging & Preservation',
    description: 'Industry-grade packaging with corrosion protection, shock-proofing, and proper labeling for global shipments.',
  },
];

export function QualityAssurance() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            Quality
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Quality Assurance
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Every product passes through rigorous quality checks before reaching your facility
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative p-6 rounded-xl bg-white border border-steel-100 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h4>
              <p className="text-sm text-steel-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-steel-400">
            Certified to ISO 9001:2024, AS9100D, API Q1, and other industry standards
          </p>
        </div>
      </div>
    </section>
  );
}
