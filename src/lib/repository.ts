import type { Service, Solution, BlogPost, Testimonial, Certificate, DownloadResource, FAQ, TeamMember, Statistic } from '@/types';

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find(s => s.slug === slug) || null;
}

export async function getServices(): Promise<Service[]> {
  return [
    { id: 'engineering-consulting', slug: 'engineering-consulting', name: 'Engineering Consulting', shortDescription: 'Expert engineering consultation for complex industrial challenges.', description: 'End-to-end engineering consulting services covering design, analysis, and optimization of industrial systems.', icon: 'BrainCircuit', image: '', features: ['Technical Assessment', 'Feasibility Studies', 'System Design', 'Performance Optimization'], benefits: ['Reduced downtime', 'Improved efficiency', 'Cost savings'] },
    { id: 'supply-chain', slug: 'supply-chain', name: 'Supply Chain Management', shortDescription: 'End-to-end industrial supply chain solutions.', description: 'Comprehensive supply chain management ensuring timely delivery of critical industrial components.', icon: 'Truck', image: '', features: ['Global Sourcing', 'Inventory Management', 'Logistics', 'Vendor Management'], benefits: ['Reliable delivery', 'Reduced lead times', 'Cost optimization'] },
    { id: 'maintenance-repair', slug: 'maintenance-repair', name: 'Maintenance & Repair', shortDescription: 'Professional maintenance and repair services.', description: 'Industrial maintenance and repair services to maximize equipment lifespan and reliability.', icon: 'Wrench', image: '', features: ['Preventive Maintenance', 'Repair Services', 'Overhaul', 'Field Service'], benefits: ['Extended equipment life', 'Reduced failures', 'Operational reliability'] },
    { id: 'technical-training', slug: 'technical-training', name: 'Technical Training', shortDescription: 'Comprehensive technical training programs.', description: 'Industry-specific technical training programs for engineering teams and operators.', icon: 'GraduationCap', image: '', features: ['Hands-on Training', 'Online Courses', 'Certification', 'Workshops'], benefits: ['Skilled workforce', 'Safety compliance', 'Operational excellence'] },
    { id: 'quality-inspection', slug: 'quality-inspection', name: 'Quality Inspection', shortDescription: 'Rigorous quality inspection and testing services.', description: 'Advanced quality inspection services ensuring components meet the highest industry standards.', icon: 'SearchCheck', image: '', features: ['NDT Testing', 'Dimensional Inspection', 'Material Analysis', 'Certification'], benefits: ['Quality assurance', 'Compliance', 'Peace of mind'] },
    { id: 'custom-fabrication', slug: 'custom-fabrication', name: 'Custom Fabrication', shortDescription: 'Custom fabrication for specialized industrial components.', description: 'Custom engineering and fabrication of specialized components to exact specifications.', icon: 'Hammer', image: '', features: ['Design & Build', 'Prototyping', 'CNC Machining', 'Welding'], benefits: ['Custom solutions', 'Precision engineering', 'Fast turnaround'] },
  ];
}

export async function getSolutions(): Promise<Solution[]> {
  return [
    { id: 'automation-systems', slug: 'automation-systems', name: 'Automation Systems', shortDescription: 'Comprehensive industrial automation solutions.', description: 'End-to-end automation systems for improved productivity and operational excellence.', icon: 'Cpu', image: '', industries: ['manufacturing', 'power-plants', 'oil-gas'], products: [], benefits: ['Increased productivity', 'Reduced errors', 'Energy efficiency'], features: ['PLC Programming', 'SCADA Systems', 'Robotics Integration', 'Process Control'] },
    { id: 'power-generation', slug: 'power-generation', name: 'Power Generation Solutions', shortDescription: 'Complete power generation equipment and services.', description: 'Comprehensive solutions for power generation including gas turbine components and auxiliaries.', icon: 'Zap', image: '', industries: ['power-plants', 'energy', 'oil-gas'], products: [], benefits: ['Reliable power', 'High efficiency', 'Low emissions'], features: ['Turbine Parts', 'Generator Components', 'Control Systems', 'Balance of Plant'] },
    { id: 'process-control', slug: 'process-control', name: 'Process Control Solutions', shortDescription: 'Advanced process control and instrumentation.', description: 'State-of-the-art process control solutions for precise industrial process management.', icon: 'Gauge', image: '', industries: ['chemical', 'oil-gas', 'pharmaceutical'], products: [], benefits: ['Precision control', 'Process optimization', 'Safety enhancement'], features: ['DCS Systems', 'Instrumentation', 'Valve Automation', 'Safety Systems'] },
    { id: 'fluid-power', slug: 'fluid-power', name: 'Fluid Power Systems', shortDescription: 'Hydraulic and pneumatic system solutions.', description: 'Complete fluid power solutions including hydraulic and pneumatic systems for industrial applications.', icon: 'Droplets', image: '', industries: ['manufacturing', 'marine', 'mining'], products: [], benefits: ['High power density', 'Precise control', 'Reliability'], features: ['Hydraulic Systems', 'Pneumatic Systems', 'Filtration', 'Power Units'] },
  ];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    { id: '1', slug: 'industrial-automation-trends-2026', title: 'Top Industrial Automation Trends Shaping 2026', excerpt: 'Explore the cutting-edge automation technologies transforming industrial operations.', content: 'The industrial automation landscape continues to evolve rapidly...', author: 'Dr. James Mitchell', category: 'Automation', tags: ['Automation', 'Industry 4.0', 'Digital Transformation'], image: '/images/blog/automation-trends.jpg', publishedAt: '2026-06-15', readTime: 8, seoTitle: 'Industrial Automation Trends 2026 | ZENTRYO', seoDescription: 'Discover the top industrial automation trends for 2026 and how they impact your operations.' },
    { id: '2', slug: 'gas-turbine-maintenance-guide', title: 'Complete Guide to Gas Turbine Maintenance', excerpt: 'Essential maintenance practices for optimal gas turbine performance and longevity.', content: 'Gas turbines are critical assets in power generation...', author: 'Sarah Chen', category: 'Maintenance', tags: ['Gas Turbines', 'Maintenance', 'Power Generation'], image: '/images/blog/gas-turbine-maintenance.jpg', publishedAt: '2026-05-20', readTime: 12, seoTitle: 'Gas Turbine Maintenance Guide | ZENTRYO', seoDescription: 'Comprehensive guide to gas turbine maintenance best practices.' },
    { id: '3', slug: 'industrial-bearing-selection', title: 'How to Select the Right Industrial Bearing', excerpt: 'A comprehensive guide to choosing bearings for your specific application.', content: 'Selecting the right bearing is crucial for equipment reliability...', author: 'Michael Torres', category: 'Engineering', tags: ['Bearings', 'Engineering', 'Selection Guide'], image: '/images/blog/bearing-selection.jpg', publishedAt: '2026-04-10', readTime: 10, seoTitle: 'Industrial Bearing Selection Guide | ZENTRYO', seoDescription: 'Learn how to select the right industrial bearing for your application.' },
    { id: '4', slug: 'oil-gas-industry-components', title: 'Essential Components for Oil & Gas Operations', excerpt: 'Critical components that keep oil and gas operations running safely.', content: 'The oil and gas industry demands the highest quality components...', author: 'Dr. James Mitchell', category: 'Industry Insights', tags: ['Oil & Gas', 'Components', 'Safety'], image: '/images/blog/oil-gas-components.jpg', publishedAt: '2026-03-05', readTime: 7, seoTitle: 'Oil & Gas Industry Components | ZENTRYO', seoDescription: 'Essential components and parts for oil and gas industry operations.' },
    { id: '5', slug: 'plc-programming-best-practices', title: 'PLC Programming Best Practices for Industrial Applications', excerpt: 'Industry-standard PLC programming practices for reliable automation.', content: 'Programmable Logic Controllers (PLCs) form the backbone...', author: 'Alex Rivera', category: 'Automation', tags: ['PLC', 'Programming', 'Automation'], image: '/images/blog/plc-programming.jpg', publishedAt: '2026-02-18', readTime: 9, seoTitle: 'PLC Programming Best Practices | ZENTRYO', seoDescription: 'Best practices for PLC programming in industrial automation applications.' },
    { id: '6', slug: 'industrial-valve-types', title: 'Complete Overview of Industrial Valve Types', excerpt: 'Understanding different valve types and their industrial applications.', content: 'Valves are fundamental components in any industrial process...', author: 'Sarah Chen', category: 'Engineering', tags: ['Valves', 'Engineering', 'Industrial Components'], image: '/images/blog/valve-types.jpg', publishedAt: '2026-01-22', readTime: 11, seoTitle: 'Industrial Valve Types Guide | ZENTRYO', seoDescription: 'Comprehensive overview of industrial valve types and their applications.' },
  ];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(p => p.slug === slug) || null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [
    { id: '1', name: 'Robert K. Johnson', company: 'Gulf Coast Power Solutions', designation: 'Procurement Director', content: 'ZENTRYO has transformed our supply chain. Their quality standards and delivery reliability exceed all expectations.', avatar: '', rating: 5 },
    { id: '2', name: 'Maria Santos', company: 'Atlas Engineering GmbH', designation: 'Senior Engineer', content: 'The technical expertise and product knowledge at ZENTRYO is exceptional. They understand complex engineering requirements.', avatar: '', rating: 5 },
    { id: '3', name: 'David Thompson', company: 'Pacific Marine Industries', designation: 'Operations Manager', content: 'We rely on ZENTRYO for critical marine components. Their global logistics and quality assurance are world-class.', avatar: '', rating: 5 },
    { id: '4', name: 'Dr. Ahmed Al-Rashid', company: 'Middle East Petroleum Corp', designation: 'Technical Director', content: 'Outstanding partner for our oil and gas operations. ZENTRYO delivers premium products with unmatched technical support.', avatar: '', rating: 5 },
  ];
}

export async function getCertificates(): Promise<Certificate[]> {
  return [
    { id: '1', name: 'ISO 9001:2024 Quality Management', issuer: 'Bureau Veritas', description: 'Certified quality management system for industrial component supply.', image: '/images/certificates/iso-9001.jpg', file: '/certificates/iso-9001.pdf', issueDate: '2024-01-15', expiryDate: '2027-01-15', category: 'Quality' },
    { id: '2', name: 'ISO 14001:2024 Environmental Management', issuer: 'Bureau Veritas', description: 'Environmental management system certification.', image: '/images/certificates/iso-14001.jpg', file: '/certificates/iso-14001.pdf', issueDate: '2024-02-01', expiryDate: '2027-02-01', category: 'Environmental' },
    { id: '3', name: 'AS9100D Aerospace Certification', issuer: 'SAE International', description: 'Quality management for aerospace industry.', image: '/images/certificates/as9100d.jpg', file: '/certificates/as9100d.pdf', issueDate: '2024-03-10', expiryDate: '2027-03-10', category: 'Aerospace' },
    { id: '4', name: 'API Q1 Certification', issuer: 'American Petroleum Institute', description: 'Quality management for petroleum industry.', image: '/images/certificates/api-q1.jpg', file: '/certificates/api-q1.pdf', issueDate: '2024-04-20', expiryDate: '2027-04-20', category: 'Oil & Gas' },
    { id: '5', name: 'CE Marking Compliance', issuer: 'European Commission', description: 'CE marking for European market compliance.', image: '/images/certificates/ce-marking.jpg', file: '/certificates/ce-marking.pdf', issueDate: '2024-05-01', expiryDate: '2027-05-01', category: 'Compliance' },
    { id: '6', name: 'ATEX Certification', issuer: 'INERIS', description: 'Explosive atmosphere equipment certification.', image: '/images/certificates/atex.jpg', file: '/certificates/atex.pdf', issueDate: '2024-06-15', expiryDate: '2027-06-15', category: 'Safety' },
  ];
}

export async function getDownloads(): Promise<DownloadResource[]> {
  return [
    { id: '1', title: 'ZENTRYO Product Catalog 2026', description: 'Complete product catalog with specifications.', file: '/downloads/catalog-2026.pdf', type: 'catalog', category: 'General', size: '24 MB', downloadCount: 1542, createdAt: '2026-01-01' },
    { id: '2', title: 'Industrial Bearings Technical Manual', description: 'Comprehensive bearing selection and application guide.', file: '/downloads/bearings-manual.pdf', type: 'manual', category: 'Bearings', size: '18 MB', downloadCount: 892, createdAt: '2026-02-15' },
    { id: '3', title: 'Automation Systems Brochure', description: 'Overview of automation solutions and products.', file: '/downloads/automation-brochure.pdf', type: 'brochure', category: 'Automation', size: '12 MB', downloadCount: 673, createdAt: '2026-03-01' },
    { id: '4', title: 'Gas Turbine Parts Catalog', description: 'Complete catalog of gas turbine spare parts.', file: '/downloads/turbine-parts.pdf', type: 'catalog', category: 'Turbines', size: '32 MB', downloadCount: 1245, createdAt: '2026-01-20' },
    { id: '5', title: 'Valve Selection Guide', description: 'Engineering guide for valve selection.', file: '/downloads/valve-guide.pdf', type: 'datasheet', category: 'Valves', size: '8 MB', downloadCount: 567, createdAt: '2026-04-10' },
    { id: '6', title: 'Quality Certifications Overview', description: 'Overview of all quality certifications.', file: '/downloads/certifications.pdf', type: 'brochure', category: 'Quality', size: '5 MB', downloadCount: 456, createdAt: '2026-03-15' },
    { id: '7', title: 'Hydraulic Systems Engineering Guide', description: 'Engineering guide for hydraulic system design.', file: '/downloads/hydraulic-guide.pdf', type: 'manual', category: 'Hydraulics', size: '15 MB', downloadCount: 789, createdAt: '2026-02-28' },
    { id: '8', title: 'Industry Solutions Whitepaper', description: 'Industry-specific solutions and case studies.', file: '/downloads/industry-solutions.pdf', type: 'whitepaper', category: 'Solutions', size: '20 MB', downloadCount: 345, createdAt: '2026-04-01' },
  ];
}

export async function getFAQs(): Promise<FAQ[]> {
  return [
    { id: '1', question: 'What is the typical lead time for industrial components?', answer: 'Lead times vary by product category. Standard in-stock items ship within 24-48 hours. Made-to-order components typically require 4-8 weeks. Contact our sales team for specific lead time information.', category: 'Orders', order: 1 },
    { id: '2', question: 'Do you offer international shipping?', answer: 'Yes, ZENTRYO ships to over 80 countries worldwide. We have established logistics partnerships ensuring reliable delivery across all major industrial markets.', category: 'Shipping', order: 1 },
    { id: '3', question: 'What quality certifications do your products carry?', answer: 'ZENTRYO is ISO 9001:2024 and ISO 14001:2024 certified. Our products carry relevant industry certifications including API, CE, ATEX, and AS9100D where applicable.', category: 'Quality', order: 1 },
    { id: '4', question: 'Can you source non-stock or obsolete components?', answer: 'Yes, our global sourcing network can locate hard-to-find and obsolete components. Contact our sourcing team with your requirements.', category: 'Sourcing', order: 1 },
    { id: '5', question: 'What is your return policy?', answer: 'We offer a 30-day return policy for standard components in original condition. Custom and made-to-order items are subject to our manufacturing return policy.', category: 'Orders', order: 2 },
    { id: '6', question: 'Do you provide technical documentation with products?', answer: 'Yes, all products include relevant technical documentation including datasheets, installation manuals, and certification documents.', category: 'Technical', order: 1 },
    { id: '7', question: 'How can I request a quote (RFQ)?', answer: 'You can submit an RFQ through our website, email us at quotes@zentryo.com, or call our sales team. We typically respond within 4 hours during business hours.', category: 'Orders', order: 3 },
    { id: '8', question: 'Do you offer OEM-compatible components?', answer: 'Yes, we supply OEM-compatible components from leading manufacturers including GE, Siemens, ABB, Honeywell, and many others.', category: 'Products', order: 1 },
    { id: '9', question: 'What industries do you serve?', answer: 'We serve power generation, oil & gas, marine, manufacturing, aerospace, chemical processing, mining, pharmaceutical, and energy industries.', category: 'Company', order: 1 },
    { id: '10', question: 'Do you offer warranty on products?', answer: 'Yes, all products come with manufacturer warranty. Standard warranty periods range from 12 to 24 months depending on the product category.', category: 'Quality', order: 2 },
  ];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return [
    { id: '1', name: 'Dr. James Mitchell', designation: 'Chief Executive Officer', bio: '30+ years in industrial engineering and global supply chain.', image: '', department: 'Executive' },
    { id: '2', name: 'Sarah Chen', designation: 'Chief Operations Officer', bio: 'Expert in industrial operations and logistics management.', image: '', department: 'Executive' },
    { id: '3', name: 'Michael Torres', designation: 'VP of Engineering', bio: 'Leading engineering teams with deep technical expertise.', image: '', department: 'Engineering' },
    { id: '4', name: 'Dr. Emily Watson', designation: 'Director of Quality', bio: 'Ensuring the highest quality standards across all products.', image: '', department: 'Quality' },
    { id: '5', name: 'Alex Rivera', designation: 'Head of Automation', bio: 'Specialist in industrial automation and control systems.', image: '', department: 'Engineering' },
    { id: '6', name: 'Lisa Park', designation: 'Supply Chain Director', bio: 'Managing global supply chain and vendor relationships.', image: '', department: 'Operations' },
  ];
}

export async function getStatistics(): Promise<Statistic[]> {
  return [
    { value: '50,000+', label: 'Products Available', suffix: '+' },
    { value: '2,500+', label: 'Global Clients', suffix: '+' },
    { value: '80+', label: 'Countries Served', suffix: '+' },
    { value: '99.7%', label: 'Delivery Accuracy', suffix: '%' },
    { value: '25+', label: 'Years Experience', suffix: '+' },
    { value: '500+', label: 'Industry Partners', suffix: '+' },
  ];
}
