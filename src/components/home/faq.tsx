'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    id: 'lead-time',
    question: 'What is the typical lead time for industrial components?',
    answer: 'Lead times vary by product category. Standard in-stock items ship within 24-48 hours. Made-to-order components typically require 4-8 weeks. Contact our sales team for specific lead time information.',
  },
  {
    id: 'shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes, ZENTRYO ships to over 80 countries worldwide. We have established logistics partnerships ensuring reliable delivery across all major industrial markets, including North America, Europe, Middle East, and Asia-Pacific.',
  },
  {
    id: 'certifications',
    question: 'What quality certifications do your products carry?',
    answer: 'ZENTRYO is ISO 9001:2024 and ISO 14001:2024 certified. Our products carry relevant industry certifications including API, CE, ATEX, and AS9100D where applicable, ensuring compliance with global standards.',
  },
  {
    id: 'sourcing',
    question: 'Can you source non-stock or obsolete components?',
    answer: 'Yes, our global sourcing network can locate hard-to-find and obsolete components. Contact our sourcing team with your requirements and we will leverage our extensive manufacturer network to find solutions.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for standard components in original condition. Custom and made-to-order items are subject to our manufacturing return policy. All returns require prior authorization.',
  },
  {
    id: 'quote',
    question: 'How can I request a quote (RFQ)?',
    answer: 'You can submit an RFQ through our website, email us at quotes@zentryo.com, or call our sales team. We typically respond within 4 hours during business hours with competitive pricing.',
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
            FAQ
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
            Frequently Asked Questions
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-steel-100 rounded-lg mb-3 px-6 data-[state=open]:border-cyan-200 transition-colors">
                <AccordionTrigger className="text-left text-base font-semibold text-navy-800 hover:text-cyan-600 hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-steel-500 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 p-4 rounded-xl bg-white border border-steel-100">
            <HelpCircle className="h-5 w-5 text-cyan-500" />
            <span className="text-sm text-steel-600">Have more questions?</span>
            <Button asChild variant="link" className="text-cyan-600 font-semibold p-0 h-auto">
              <Link href="/contact">
                Visit our contact page
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
