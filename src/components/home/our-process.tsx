'use client';

import { FileText, FileCheck, Cog, Truck, ShieldCheck, Phone } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Submit Inquiry', description: 'Share your requirements through our RFQ form or direct contact. Include specifications, quantities, and target delivery timeline.' },
  { icon: FileCheck, title: 'Technical Review', description: 'Our engineering team reviews your requirements, identifies the right products, and prepares a comprehensive solution proposal.' },
  { icon: Cog, title: 'Quotation & Confirmation', description: 'Receive a detailed quotation with pricing, lead times, and terms. Confirm to initiate procurement and order processing.' },
  { icon: ShieldCheck, title: 'Quality Check', description: 'Every product undergoes rigorous quality inspection, OEM verification, and documentation before dispatch.' },
  { icon: Truck, title: 'Logistics & Delivery', description: 'We handle global shipping, customs clearance, and door-step delivery with real-time tracking available.' },
  { icon: Phone, title: 'After-Sales Support', description: 'Dedicated support team assists with installation guidance, warranty claims, and ongoing technical queries.' },
];

export function OurProcess() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            How It Works
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Our Procurement Process
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            From inquiry to delivery — a streamlined process designed for industrial procurement
          </p>
        </div>

        <div className="relative animate-fade-in-up">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-cyan-200 to-transparent hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.title} className="relative md:flex items-start gap-8 group">
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/20 shrink-0 z-10 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-7 w-7 text-white" />
                </div>

                <div className="flex items-start gap-4 md:hidden mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Step {i + 1}</span>
                    <h4 className="text-lg font-bold text-navy-900">{step.title}</h4>
                  </div>
                </div>

                <div className="hidden md:flex absolute -left-6 top-0 flex-col items-center">
                  <span className="text-xs font-bold text-cyan-500 bg-white px-2 py-0.5 rounded-full border border-cyan-200">0{i + 1}</span>
                </div>

                <div className="md:pt-3 flex-1">
                  <h4 className="text-xl font-bold text-navy-900 mb-2 hidden md:block">{step.title}</h4>
                  <p className="text-steel-600 leading-relaxed md:pl-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
