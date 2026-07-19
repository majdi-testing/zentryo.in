'use client';

import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: '1',
    name: 'Robert K. Johnson',
    company: 'Gulf Coast Power Solutions',
    designation: 'Procurement Director',
    content: 'ZENTRYO has transformed our supply chain. Their quality standards and delivery reliability exceed all expectations. A true partner in every sense.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/32845680/pexels-photo-32845680.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Maria Santos',
    company: 'Atlas Engineering GmbH',
    designation: 'Senior Engineer',
    content: 'The technical expertise and product knowledge at ZENTRYO is exceptional. They understand complex engineering requirements and deliver precise solutions.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    name: 'David Thompson',
    company: 'Pacific Marine Industries',
    designation: 'Operations Manager',
    content: 'We rely on ZENTRYO for critical marine components. Their global logistics and quality assurance are world-class, ensuring our operations never skip a beat.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '4',
    name: 'Dr. Ahmed Al-Rashid',
    company: 'Middle East Petroleum Corp',
    designation: 'Technical Director',
    content: 'Outstanding partner for our oil and gas operations. ZENTRYO delivers premium products with unmatched technical support and rapid response times.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  function scrollPrev() { emblaApi?.scrollPrev(); }
  function scrollNext() { emblaApi?.scrollNext(); }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Testimonials
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
              Trusted by Industry Leaders
            </h3>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-steel-200 flex items-center justify-center hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4 text-steel-600" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-steel-200 flex items-center justify-center hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4 text-steel-600" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-4 sm:px-8 lg:px-16" style={{ backfaceVisibility: 'hidden' }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="min-w-[400px] sm:min-w-[500px] lg:min-w-[600px]"
            >
              <div className={cn(
                'relative p-8 rounded-xl border border-steel-100 bg-white h-full',
                'hover:border-cyan-200 hover:shadow-lg transition-all duration-300'
              )}>
                <Quote className="h-8 w-8 text-cyan-200 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-steel-600 leading-relaxed mb-6 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-100 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-navy-800">{t.name}</div>
                    <div className="text-xs text-steel-500">{t.designation}, {t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
