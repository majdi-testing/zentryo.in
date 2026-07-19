'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Users, Globe, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { value: '50,000+', label: 'Products Available', suffix: '+', icon: Package },
  { value: '2,500+', label: 'Global Clients', suffix: '+', icon: Users },
  { value: '80+', label: 'Countries Served', suffix: '+', icon: Globe },
  { value: '99.7%', label: 'Delivery Accuracy', suffix: '%', icon: Target },
];

function CountUp({ target, suffix = '+', duration = 2000 }: { target: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/,/g, '').replace(/[^0-9]/g, ''));
    if (isNaN(num)) { setDisplayed(target); return; }

    const startTime = performance.now();
    let rafId: number;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * num);

      if (target.includes(',')) {
        setDisplayed(current.toLocaleString() + suffix);
      } else {
        setDisplayed(current + suffix);
      }

      if (progress < 1) rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, suffix, duration]);

  return <span ref={ref}>{displayed}</span>;
}

export function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <stat.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-steel-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
