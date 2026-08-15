'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ShieldCheck, Truck, Package, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Package, value: '50,000+', label: 'Products' },
  { icon: ShieldCheck, value: 'ISO 9001', label: 'Certified' },
  { icon: Truck, value: '99.7%', label: 'Delivery Rate' },
  { icon: CheckCircle, value: '80+', label: 'Countries Served' },
];

const highlights = [
  { label: 'OEM Spare Parts', value: 'Authentic, traceable & certified' },
  { label: 'Automation Systems', value: 'PLC, sensors & controls' },
  { label: 'Gas Turbine Parts', value: 'Hot gas path & combustion' },
];

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-16 lg:-mt-24">
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
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.06),transparent_55%)]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-24 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl dark:blur-xl" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl dark:blur-xl" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-40 right-20 w-64 h-64 text-[#ffffff]/[0.02]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-40 left-20 w-48 h-48 text-[#ffffff]/[0.02]" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" />
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-center">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Global Industrial Excellence
              </span>
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight animate-fade-in-up">
              <span className="text-[#ffffff]">Powering</span>{' '}
              <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400">
                Industry
              </span>
              <br />
              <span className="text-[#ffffff]">with Precision</span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-[#ffffff] max-w-2xl leading-relaxed animate-fade-in-up bg-navy-950/40 backdrop-blur-sm rounded-xl px-5 py-4 border border-[#ffffff]/10">
              ZENTRYO delivers premium industrial engineering components, automation systems,
              and technical solutions to power plants, oil &amp; gas, marine, and manufacturing
              industries across 80+ countries worldwide.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up">
              <Button
                asChild
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-[#ffffff] font-semibold px-8 py-6 text-base shadow-lg shadow-cyan-500/25 group"
              >
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#ffffff]/20 text-[#ffffff] hover:bg-[#ffffff]/10 hover:text-[#ffffff] bg-transparent px-8 py-6 text-base"
              >
                <Link href="/contact">
                  Request Quote
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#ffffff]/20 text-[#ffffff] hover:bg-[#ffffff]/10 hover:text-[#ffffff] bg-transparent px-6 py-6 text-base"
              >
                <Link href="/contact" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-3 animate-fade-in-up">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl bg-[#ffffff]/5 border border-[#ffffff]/10 backdrop-blur-sm px-4 py-3"
                >
                  <div className="text-sm font-semibold text-[#ffffff]">{h.label}</div>
                  <div className="text-xs text-[#829ab1] mt-0.5">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 animate-fade-in-up">
            <div className="rounded-2xl bg-[#ffffff]/5 border border-[#ffffff]/10 backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <ShieldCheck className="h-5 w-5 text-[#ffffff]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#ffffff]">Trusted Worldwide</div>
                  <div className="text-xs text-[#829ab1]">Since 2000</div>
                </div>
              </div>

              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <stat.icon className="h-4 w-4 text-cyan-400 shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#ffffff]">{stat.value}</div>
                      <div className="text-xs text-[#829ab1]">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/20 backdrop-blur-xl p-6">
              <div className="text-sm font-semibold text-[#ffffff] mb-1">Need Engineering Support?</div>
              <p className="text-xs text-[#9fb3c8] leading-relaxed mb-4">
                24/7 technical assistance from our in-house engineering team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors"
              >
                Talk to an Engineer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#ffffff]/10 border border-[#ffffff]/10 rounded-t-xl overflow-hidden backdrop-blur-md">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-5 py-4 bg-navy-950/60"
              >
                <stat.icon className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-base font-bold text-[#ffffff] leading-none">{stat.value}</div>
                  <div className="text-xs text-[#829ab1] mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}