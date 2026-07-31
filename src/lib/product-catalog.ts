import {
  Cog, Gauge, Cpu, Fan, Droplets, Zap, Package,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export type CatalogIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ProductSubcategoryDef {
  slug: string;
  name: string;
  description: string;
  dataCategories?: string[];
  dataSubcategories?: string[];
}

export interface ProductCategoryDef {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: CatalogIcon;
  dataCategories: string[];
  subcategories: ProductSubcategoryDef[];
}

export const productCatalog: ProductCategoryDef[] = [
  {
    slug: 'bearings',
    name: 'Industrial Bearings',
    shortDescription: 'Precision bearings for every application',
    description: 'Explore our comprehensive range of industrial bearings from leading manufacturers including SKF, FAG, Timken, NSK and more. From deep groove ball bearings to heavy-duty roller bearings, we supply precision-engineered solutions for rotating machinery across all industries.',
    icon: Cog,
    dataCategories: ['Bearings'],
    subcategories: [
      {
        slug: 'ball-bearings',
        name: 'Ball Bearings',
        description: 'Deep groove, angular contact, self-aligning and miniature ball bearings engineered for high-speed and high-precision applications.',
        dataSubcategories: ['Deep Groove Ball Bearings', 'Angular Contact Ball Bearings', 'Self-Aligning Ball Bearings', 'Miniature Bearings'],
      },
      {
        slug: 'roller-bearings',
        name: 'Roller Bearings',
        description: 'Tapered, spherical, cylindrical and needle roller bearings designed for heavy radial and axial loads in demanding industrial environments.',
        dataSubcategories: ['Tapered Roller Bearings', 'Spherical Roller Bearings', 'Cylindrical Roller Bearings', 'Needle Roller Bearings'],
      },
      {
        slug: 'plain-bearings',
        name: 'Plain Bearings',
        description: 'Plain and linear bearings offering reliable low-friction performance for sliding motion and misalignment applications.',
        dataSubcategories: ['Plain Bearings', 'Linear Bearings'],
      },
      {
        slug: 'mounted-bearings',
        name: 'Mounted Bearings',
        description: 'Pre-assembled mounted bearing units including pillow block, flanged and take-up configurations for easy installation.',
        dataSubcategories: ['Mounted Bearings'],
      },
    ],
  },
  {
    slug: 'valves',
    name: 'Industrial Valves',
    shortDescription: 'Flow control solutions',
    description: 'A complete portfolio of industrial valves from gate and globe valves to ball, butterfly and check valves. Sourced from trusted manufacturers like Crane, Flowserve, Kitz, Samson and Velan, our valves deliver reliable flow control for process industries.',
    icon: Gauge,
    dataCategories: ['Valves'],
    subcategories: [
      {
        slug: 'gate-valves',
        name: 'Gate Valves',
        description: 'Gate valves for on-off service providing tight sealing and full-bore flow across oil & gas, water and process applications.',
        dataSubcategories: ['Gate Valves'],
      },
      {
        slug: 'globe-valves',
        name: 'Globe Valves',
        description: 'Globe valves engineered for precise throttling and regulation of flow with superior shut-off capability.',
        dataSubcategories: ['Globe Valves'],
      },
      {
        slug: 'ball-valves',
        name: 'Ball Valves',
        description: 'Quarter-turn ball valves offering reliable shut-off with low torque and high flow capacity for industrial pipelines.',
        dataSubcategories: ['Ball Valves'],
      },
      {
        slug: 'butterfly-valves',
        name: 'Butterfly Valves',
        description: 'Compact and economical butterfly valves for isolation and regulation across water, chemical and HVAC systems.',
        dataSubcategories: ['Butterfly Valves'],
      },
      {
        slug: 'check-valves',
        name: 'Check Valves',
        description: 'Check valves preventing reverse flow and protecting equipment in piping systems across all process industries.',
        dataSubcategories: ['Check Valves'],
      },
    ],
  },
  {
    slug: 'automation',
    name: 'Automation',
    shortDescription: 'PLC, sensors & control systems',
    description: 'End-to-end industrial automation components including PLCs, controllers, sensors, drives, motors and HMI displays. Partnering with ABB, Siemens, Rockwell, Omron and Schneider Electric to keep your plant running at peak efficiency.',
    icon: Cpu,
    dataCategories: ['Automation'],
    subcategories: [
      {
        slug: 'plc-controllers',
        name: 'PLC & Controllers',
        description: 'Programmable logic controllers, PACs, PID and embedded controllers from leading automation manufacturers for reliable machine control.',
        dataSubcategories: ['Programmable Logic Controllers', 'PAC Controllers', 'PID Controllers', 'Embedded Controllers'],
      },
      {
        slug: 'sensors',
        name: 'Industrial Sensors',
        description: 'Pressure, temperature, flow, level, proximity and photoelectric sensors for precise process measurement and automation.',
        dataCategories: ['Sensors'],
      },
      {
        slug: 'drives-motors',
        name: 'Drives & Motors',
        description: 'Variable frequency drives, servo drives and industrial motors delivering precise speed and torque control.',
        dataSubcategories: ['Variable Frequency Drives', 'Servo Drives', 'Motors'],
      },
      {
        slug: 'hmi-displays',
        name: 'HMI & Displays',
        description: 'Human-machine interface panels and displays for intuitive operator control and real-time process visualization.',
        dataSubcategories: ['Human Machine Interfaces'],
      },
    ],
  },
  {
    slug: 'gas-turbine-parts',
    name: 'Gas Turbine Parts',
    shortDescription: 'Turbine blades & combustion parts',
    description: 'High-grade gas turbine spare parts including turbine blades, combustion components, seals, gaskets and fuel nozzles. Supplying replacement parts for GE, Siemens, Solar, Alstom and MAN Energy gas turbines for power generation and oil & gas.',
    icon: Fan,
    dataCategories: ['Turbine Parts'],
    subcategories: [
      {
        slug: 'blades',
        name: 'Turbine Blades',
        description: 'Turbine blades and vanes manufactured from high-temperature alloys for maximum performance and service life.',
        dataSubcategories: ['Turbine Blades'],
      },
      {
        slug: 'combustion',
        name: 'Combustion Parts',
        description: 'Combustors, transition pieces, vane rings and shrouds engineered for the extreme temperatures of gas turbine combustion zones.',
        dataSubcategories: ['Combustors', 'Transition Pieces', 'Vane Rings', 'Shrouds'],
      },
      {
        slug: 'seals-gaskets',
        name: 'Seals & Gaskets',
        description: 'High-temperature seals, gaskets, O-rings and packing materials for gas turbine and rotating equipment sealing applications.',
        dataSubcategories: ['Seals', 'Gaskets', 'O-Rings', 'Packing Rings', 'Molded Packings', 'Mechanical Seals', 'Pneumatic Seals', 'Rod Seals', 'Hydraulic Seals', 'Piston Seals', 'Oil Seals', 'Rotary Seals'],
      },
      {
        slug: 'fuel-nozzles',
        name: 'Fuel Nozzles',
        description: 'Fuel nozzles and atomization components ensuring optimal combustion efficiency and low emissions.',
        dataSubcategories: ['Fuel Nozzles', 'Nozzles'],
      },
    ],
  },
  {
    slug: 'hydraulics-pneumatics',
    name: 'Hydraulics & Pneumatics',
    shortDescription: 'Cylinders, pumps & manifolds',
    description: 'Complete hydraulic and pneumatic components including cylinders, pumps, valves, manifolds and power units. Supplying Bosch Rexroth, Parker, Eaton, Festo, SMC and Danfoss for mobile and industrial fluid power systems.',
    icon: Droplets,
    dataCategories: ['Hydraulics', 'Pneumatics'],
    subcategories: [
      {
        slug: 'cylinders',
        name: 'Cylinders',
        description: 'Hydraulic and pneumatic cylinders engineered for dependable linear motion across industrial and mobile applications.',
        dataSubcategories: ['Cylinders'],
      },
      {
        slug: 'pumps',
        name: 'Pumps',
        description: 'Industrial hydraulic pumps delivering reliable flow and pressure for demanding fluid power systems.',
        dataSubcategories: ['Pumps'],
      },
      {
        slug: 'manifolds',
        name: 'Manifolds',
        description: 'Hydraulic, pneumatic, pilot, modular and cartridge manifolds for compact and efficient fluid distribution.',
        dataSubcategories: ['Hydraulic Manifolds', 'Pneumatic Manifolds', 'Pilot Manifolds', 'Instrument Manifolds', 'Modular Manifolds', 'Cartridge Manifolds', 'Stack Manifolds', 'Flanged Manifolds', 'Distribution Manifolds', 'Block Manifolds', 'Valve Manifolds', 'Subplates'],
      },
    ],
  },
  {
    slug: 'electrical',
    name: 'Electrical Components',
    shortDescription: 'Switchgear, transformers & cables',
    description: 'Industrial electrical components including switchgear, transformers, contactors, circuit breakers, relays and distribution boards. Sourcing from ABB, Schneider Electric, Siemens, Eaton, Phoenix Contact and Legrand.',
    icon: Zap,
    dataCategories: ['Electrical'],
    subcategories: [
      {
        slug: 'switchgear',
        name: 'Switchgear',
        description: 'Low and medium voltage switchgear for safe and reliable power distribution in industrial facilities.',
        dataSubcategories: ['Switchgear'],
      },
      {
        slug: 'transformers',
        name: 'Transformers',
        description: 'Distribution and control transformers for voltage conversion and power quality in industrial networks.',
        dataSubcategories: ['Transformers'],
      },
      {
        slug: 'cables-connectors',
        name: 'Cables & Connectors',
        description: 'Cable trays, busbar systems, terminal blocks and connectors for safe power and signal wiring.',
        dataSubcategories: ['Cable Trays', 'Busbar Systems', 'Terminal Blocks'],
      },
    ],
  },
];

export const catalogIconMap: Record<string, CatalogIcon> = {
  bearings: Cog,
  valves: Gauge,
  automation: Cpu,
  'gas-turbine-parts': Fan,
  'hydraulics-pneumatics': Droplets,
  electrical: Zap,
  bearings_ball: Package,
};

export const fallbackCatalogIcon: CatalogIcon = Package;

export function getCategoryDef(slug: string): ProductCategoryDef | undefined {
  return productCatalog.find((c) => c.slug === slug);
}

export function getSubcategoryDef(categorySlug: string, subcategorySlug: string): ProductSubcategoryDef | undefined {
  const category = getCategoryDef(categorySlug);
  return category?.subcategories.find((s) => s.slug === subcategorySlug);
}
