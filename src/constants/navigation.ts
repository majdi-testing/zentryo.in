import { siteConfig } from '@/config/site';

export interface NavCategory {
  name: string;
  slug: string;
  items?: { name: string; slug: string }[];
}

export interface NavItem {
  name: string;
  slug: string;
  children?: NavCategory[];
}

export const mainNavItems: NavItem[] = [
  { name: 'Home', slug: '/' },
  { name: 'About', slug: '/about' },
  {
    name: 'Products',
    slug: '/products',
    children: [
      {
        name: 'Industrial Bearings',
        slug: '/products/bearings',
        items: [
          { name: 'Ball Bearings', slug: '/products/bearings/ball-bearings' },
          { name: 'Roller Bearings', slug: '/products/bearings/roller-bearings' },
          { name: 'Plain Bearings', slug: '/products/bearings/plain-bearings' },
          { name: 'Mounted Bearings', slug: '/products/bearings/mounted-bearings' },
        ],
      },
      {
        name: 'Industrial Valves',
        slug: '/products/valves',
        items: [
          { name: 'Gate Valves', slug: '/products/valves/gate-valves' },
          { name: 'Globe Valves', slug: '/products/valves/globe-valves' },
          { name: 'Ball Valves', slug: '/products/valves/ball-valves' },
          { name: 'Butterfly Valves', slug: '/products/valves/butterfly-valves' },
          { name: 'Check Valves', slug: '/products/valves/check-valves' },
        ],
      },
      {
        name: 'Automation',
        slug: '/products/automation',
        items: [
          { name: 'PLC & Controllers', slug: '/products/automation/plc-controllers' },
          { name: 'Industrial Sensors', slug: '/products/automation/sensors' },
          { name: 'Drives & Motors', slug: '/products/automation/drives-motors' },
          { name: 'HMI & Displays', slug: '/products/automation/hmi-displays' },
        ],
      },
      {
        name: 'Gas Turbine Parts',
        slug: '/products/gas-turbine-parts',
        items: [
          { name: 'Turbine Blades', slug: '/products/gas-turbine-parts/blades' },
          { name: 'Combustion Parts', slug: '/products/gas-turbine-parts/combustion' },
          { name: 'Seals & Gaskets', slug: '/products/gas-turbine-parts/seals-gaskets' },
          { name: 'Fuel Nozzles', slug: '/products/gas-turbine-parts/fuel-nozzles' },
        ],
      },
      {
        name: 'Hydraulics & Pneumatics',
        slug: '/products/hydraulics-pneumatics',
        items: [
          { name: 'Cylinders', slug: '/products/hydraulics-pneumatics/cylinders' },
          { name: 'Pumps', slug: '/products/hydraulics-pneumatics/pumps' },
          { name: 'Manifolds', slug: '/products/hydraulics-pneumatics/manifolds' },
        ],
      },
      {
        name: 'Electrical Components',
        slug: '/products/electrical',
        items: [
          { name: 'Switchgear', slug: '/products/electrical/switchgear' },
          { name: 'Transformers', slug: '/products/electrical/transformers' },
          { name: 'Cables & Connectors', slug: '/products/electrical/cables-connectors' },
        ],
      },
    ],
  },
  {
    name: 'Industries',
    slug: '/industries',
    children: [
      {
        name: 'By Sector',
        slug: '/industries',
        items: [
          { name: 'Oil & Gas', slug: '/industries/oil-gas' },
          { name: 'Power Generation', slug: '/industries/power-generation' },
          { name: 'Marine', slug: '/industries/marine' },
          { name: 'Manufacturing', slug: '/industries/manufacturing' },
          { name: 'Chemical', slug: '/industries/chemical' },
          { name: 'Mining', slug: '/industries/mining' },
        ],
      },
    ],
  },
  { name: 'Solutions', slug: '/solutions' },
  { name: 'Services', slug: '/services' },
  { name: 'Blog', slug: '/blog' },
  { name: 'Contact', slug: '/contact' },
];

export const footerQuickLinks = [
  { name: 'Products', slug: '/products' },
  { name: 'Industries', slug: '/industries' },
  { name: 'Solutions', slug: '/solutions' },
  { name: 'Services', slug: '/services' },
  { name: 'Blog', slug: '/blog' },
  { name: 'Contact', slug: '/contact' },
];

export const footerProductLinks = [
  { name: 'Industrial Bearings', slug: '/products/bearings' },
  { name: 'Industrial Valves', slug: '/products/valves' },
  { name: 'Automation & Controls', slug: '/products/automation' },
  { name: 'Gas Turbine Parts', slug: '/products/gas-turbine-parts' },
  { name: 'Hydraulics & Pneumatics', slug: '/products/hydraulics-pneumatics' },
  { name: 'Electrical Components', slug: '/products/electrical' },
];

export const siteInfo = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  contactEmail: siteConfig.contact.contactEmail,
  phone: siteConfig.contact.phone,
  secondaryPhone: siteConfig.contact.secondaryPhone,
  address: siteConfig.contact.address,
  social: siteConfig.social,
};
