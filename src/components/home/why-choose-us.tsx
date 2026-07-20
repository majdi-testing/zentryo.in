'use client';


import { Globe, ShieldCheck, BrainCircuit, Truck, Cpu, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const reasons = [
  { icon: Globe, title: 'Global Sourcing Network', description: 'Access to 500+ premium manufacturers worldwide ensuring competitive pricing and quality.' },
  { icon: ShieldCheck, title: 'Quality Certified Products', description: 'ISO 9001:2024 certified with full traceability and compliance documentation.' },
  { icon: BrainCircuit, title: 'Technical Expertise', description: 'Engineers with decades of industry experience providing expert technical support.' },
  { icon: Truck, title: 'Fast Delivery', description: 'Strategic distribution centers ensuring 99.7% on-time delivery across 80+ countries.' },
  { icon: Cpu, title: 'OEM Compatible', description: 'Components engineered to meet or exceed OEM specifications for seamless integration.' },
  { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock technical support and customer service in multiple languages.' },
];



export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-in-up">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Why ZENTRYO
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-tight mb-6">
              Why Choose{' '}
              <span className="gradient-text">ZENTRYO</span>
            </h3>
            <p className="text-steel-600 leading-relaxed mb-8">
              With decades of industrial expertise, we deliver comprehensive solutions
              that keep your operations running at peak performance. Our commitment to
              quality, reliability, and innovation sets us apart as a trusted partner
              for the world&apos;s leading industrial enterprises.
            </p>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8">
              <img
                src="https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Advanced manufacturing facility with robotic automation"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <Cpu className="h-8 w-8 text-cyan-400" />
                  <div>
                    <h4 className="text-lg font-bold text-white">Trusted by Industry Leaders</h4>
                    <p className="text-sm text-steel-300">Fortune 500 companies across power, oil & gas, marine, and manufacturing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 animate-fade-in-up">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className={cn(
                  'group p-6 rounded-xl border border-steel-100 bg-white',
                  'hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5',
                  'transition-all duration-300'
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                  <reason.icon className="h-5 w-5 text-cyan-600" />
                </div>
                <h4 className="text-base font-bold text-navy-800 mb-2">{reason.title}</h4>
                <p className="text-sm text-steel-500 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
