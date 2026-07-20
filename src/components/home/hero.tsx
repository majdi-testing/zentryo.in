'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statsCards = [
  { icon: CheckCircle, value: '50,000+', label: 'Products' },
  { icon: Shield, value: 'ISO 9001', label: 'Certified' },
  { icon: TrendingUp, value: '99.7%', label: 'Delivery Rate' },
];

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=1920"
            fill
            className="object-cover"
            loading="eager"
            priority
            alt="Advanced manufacturing and automation facility"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/65 to-navy-900/90" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

      <div className="absolute inset-0">
        <svg className="absolute top-40 right-20 w-64 h-64 text-white/[0.02]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-40 left-20 w-48 h-48 text-white/[0.02]" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" />
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-8">
              Global Industrial Excellence
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight animate-fade-in-up">
            <span className="text-white">Engineering</span>{' '}
            <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400">
              Industrial
            </span>{' '}
            <span className="text-white">Excellence</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-steel-300 max-w-2xl leading-relaxed animate-fade-in-up">
            ZENTRYO delivers premium industrial engineering components, automation systems,
            and technical solutions to power plants, oil & gas, marine, and manufacturing
            industries across 80+ countries worldwide.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-cyan-500/25"
            >
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent px-8 py-6 text-base"
            >
              <Link href="/contact">
                Request Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-8 lg:right-16 flex flex-col gap-3 animate-fade-in-up">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10',
              'hover:bg-white/20 transition-colors cursor-default'
            )}
          >
            <stat.icon className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-sm font-semibold text-white">{stat.value}</span>
            <span className="text-xs text-steel-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
