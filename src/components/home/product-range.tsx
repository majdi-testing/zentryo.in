'use client';

import Link from 'next/link';

import { Cog, Gauge, Cpu, Activity, Fan, Droplets, Wind, Zap, Wrench, Thermometer, Filter, Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const productRanges = [
  {
    icon: Cog,
    title: 'Bearings & Power Transmission',
    description: 'High-precision bearings and driveline components for rotating equipment across all industries.',
    items: ['Ball & Roller Bearings', 'Plain Bearings', 'Gearboxes & Drives', 'Couplings & Clutches', 'Belt & Chain Drives', 'Linear Motion Systems'],
    industries: ['Power', 'Manufacturing', 'Marine'],
    slug: 'bearings',
  },
  {
    icon: Gauge,
    title: 'Valves & Flow Control',
    description: 'Industrial valves for process control, isolation, and safety in demanding environments.',
    items: ['Gate & Globe Valves', 'Ball & Butterfly Valves', 'Control Valves', 'Safety Relief Valves', 'Actuators & Positioners', 'Valve Accessories'],
    industries: ['Oil & Gas', 'Chemical', 'Power'],
    slug: 'valves',
  },
  {
    icon: Cpu,
    title: 'Automation & Controls',
    description: 'Industrial automation systems for process optimization and operational efficiency.',
    items: ['PLC & DCS Systems', 'HMIs & SCADA', 'Variable Frequency Drives', 'Industrial Robots', 'Motion Controllers', 'Industrial PCs'],
    industries: ['Manufacturing', 'Energy', 'Aerospace'],
    slug: 'automation',
  },
  {
    icon: Activity,
    title: 'Sensors & Instrumentation',
    description: 'Precision measurement and monitoring instruments for critical process parameters.',
    items: ['Pressure Transmitters', 'Temperature Sensors', 'Level Sensors', 'Flow Meters', 'Proximity Sensors', 'Analytical Instruments'],
    industries: ['Process', 'Oil & Gas', 'Chemical'],
    slug: 'sensors',
  },
  {
    icon: Fan,
    title: 'Turbine & Power Parts',
    description: 'Gas and steam turbine components for power generation and mechanical drive applications.',
    items: ['Gas Turbine Blades', 'Combustion Components', 'Generator Parts', 'Heat Recovery Parts', 'Steam Turbine Parts', 'Exhaust Systems'],
    industries: ['Power', 'Oil & Gas', 'Energy'],
    slug: 'turbine-parts',
  },
  {
    icon: Droplets,
    title: 'Hydraulic Systems',
    description: 'Complete hydraulic solutions for heavy-duty industrial and mobile applications.',
    items: ['Hydraulic Pumps & Motors', 'Cylinders & Actuators', 'Directional Control Valves', 'Filters & Accumulators', 'Hose & Fittings', 'Power Units'],
    industries: ['Manufacturing', 'Mining', 'Marine'],
    slug: 'hydraulics',
  },
  {
    icon: Wind,
    title: 'Pneumatic Systems',
    description: 'Compressed air and pneumatic components for factory automation and material handling.',
    items: ['Air Compressors', 'Pneumatic Cylinders', 'Solenoid Valves', 'FRL Units', 'Vacuum Components', 'Air Preparation Units'],
    industries: ['Manufacturing', 'Chemical', 'Food'],
    slug: 'pneumatics',
  },
  {
    icon: Zap,
    title: 'Electrical & Power Equipment',
    description: 'Industrial electrical components for power distribution, motor control, and protection.',
    items: ['Motors & Drives', 'Switchgears & Breakers', 'Transformers', 'Cables & Connectors', 'UPS & Power Supplies', 'Panel Components'],
    industries: ['All Industries', 'Power', 'Manufacturing'],
    slug: 'electrical',
  },
  {
    icon: Wrench,
    title: 'OEM Parts & Spares',
    description: 'Genuine and equivalent OEM replacement parts for critical industrial machinery.',
    items: ['Engine Components', 'Compressor Parts', 'Pump Spares', 'Seals & Gaskets', 'Fasteners & Hardware', 'Custom Machined Parts'],
    industries: ['Power', 'Marine', 'Oil & Gas'],
    slug: 'oem-parts',
  },
  {
    icon: Thermometer,
    title: 'Heat Exchangers & Cooling',
    description: 'Thermal management solutions for process heating, cooling, and heat recovery.',
    items: ['Shell & Tube Exchangers', 'Plate Coolers', 'Cooling Towers', 'Radiators', 'Condensers', 'Thermal Management Systems'],
    industries: ['Chemical', 'Power', 'Oil & Gas'],
    slug: 'heat-exchangers',
  },
  {
    icon: Filter,
    title: 'Filtration & Separation',
    description: 'Industrial filtration systems for fluid, air, and gas purification across all sectors.',
    items: ['Industrial Filters', 'Separators & Strainers', 'Oil Purification Systems', 'Air Filtration Units', 'Water Treatment', 'Gas Filtration Skids'],
    industries: ['All Industries', 'Chemical', 'Power'],
    slug: 'filtration',
  },
  {
    icon: Beaker,
    title: 'Testing & Inspection Equipment',
    description: 'NDT and condition monitoring instruments for asset integrity and quality assurance.',
    items: ['NDT Equipment', 'Test Gauges & Calibrators', 'Inspection Cameras', 'Condition Monitoring Systems', 'Laboratory Instruments', 'Pressure Test Equipment'],
    industries: ['All Industries', 'Aerospace', 'Oil & Gas'],
    slug: 'testing',
  },
];

export function ProductRange() {
  return (
    <section className="py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 animate-fade-in-up">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-cyan-500 mb-4">
              Product Range
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-navy-900">
              Products & Components
            </h3>
            <p className="mt-4 text-steel-600 max-w-2xl">
              Comprehensive range of industrial products — from bearings to automation,
              serving power generation, oil & gas, marine, and manufacturing sectors
            </p>
          </div>
          <Button asChild variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50 shrink-0">
            <Link href="/products">
              Browse Full Catalog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-fade-in-up">
          {productRanges.map((range) => (
            <Link
              key={range.slug}
              href={`/categories/${range.slug}`}
              className={cn(
                'group block p-5 rounded-xl border border-steel-100 bg-white',
                'hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5',
                'transition-all duration-300'
              )}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-4 shadow-md shadow-cyan-500/20">
                <range.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-base font-bold text-navy-800 mb-1.5 group-hover:text-cyan-600 transition-colors">
                {range.title}
              </h4>
              <p className="text-xs text-steel-500 leading-relaxed mb-3 line-clamp-2">
                {range.description}
              </p>
              <ul className="space-y-1.5 mb-3">
                {range.items.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-steel-500">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
                {range.items.length > 4 && (
                  <li className="text-xs text-cyan-500 font-medium">+{range.items.length - 4} more</li>
                )}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {range.industries.map((ind) => (
                  <Badge key={ind} variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">
                    {ind}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
