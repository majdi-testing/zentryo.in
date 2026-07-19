'use client';

import { motion } from 'framer-motion';
import {
  BrainCircuit, Truck, Wrench, GraduationCap, SearchCheck, Hammer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { icon: BrainCircuit, title: 'Engineering Consulting', description: 'Expert engineering consultation for complex industrial challenges from design to optimization.', image: 'https://images.pexels.com/photos/32845680/pexels-photo-32845680.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { icon: Truck, title: 'Supply Chain Management', description: 'End-to-end supply chain solutions ensuring timely delivery of critical industrial components.', image: 'https://images.pexels.com/photos/669624/pexels-photo-669624.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { icon: Wrench, title: 'Maintenance & Repair', description: 'Professional maintenance and repair services to maximize equipment lifespan and reliability.', image: 'https://images.pexels.com/photos/257898/pexels-photo-257898.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { icon: GraduationCap, title: 'Technical Training', description: 'Industry-specific technical training programs for engineering teams and operators.', image: 'https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { icon: SearchCheck, title: 'Quality Inspection', description: 'Advanced quality inspection services ensuring components meet the highest industry standards.', image: 'https://images.pexels.com/photos/4494653/pexels-photo-4494653.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { icon: Hammer, title: 'Custom Fabrication', description: 'Custom engineering and fabrication of specialized components to exact specifications.', image: 'https://images.pexels.com/photos/162568/gear-machine-mechanical-device-162568.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function EngineeringServices() {
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
            Services
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Engineering Services
          </h3>
          <p className="mt-4 text-steel-600 max-w-2xl mx-auto">
            Comprehensive engineering support services throughout your project lifecycle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={itemVariants}
              className={cn(
                'group relative overflow-hidden rounded-xl border border-steel-100 bg-white',
                'hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10',
                'transition-all duration-300'
              )}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
              </div>
              <div className="relative z-10 p-6 pt-0 -mt-12">
                <div className="w-12 h-12 rounded-xl bg-cyan-500 border-2 border-white shadow-lg flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
                  <svc.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-navy-800 mb-2 group-hover:text-cyan-600 transition-colors">{svc.title}</h4>
                <p className="text-sm text-steel-500 leading-relaxed">{svc.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
