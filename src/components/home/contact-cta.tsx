'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 gradient-blue" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />

      <svg className="absolute top-1/2 left-10 w-32 h-32 text-white/[0.03]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute top-1/4 right-16 w-24 h-24 text-white/[0.03]" viewBox="0 0 100 100" fill="none">
        <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" />
        <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Ready to Discuss Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
              Industrial Requirements
            </span>
            ?
          </h2>
          <p className="text-lg text-steel-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our team of engineering experts is ready to help you find the right solutions
            for your specific industrial needs. Get in touch today for a consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-cyan-500/25"
            >
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent px-8 py-6 text-base"
            >
              <Link href="/rfq">
                <FileText className="mr-2 h-5 w-5" />
                Submit RFQ
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
