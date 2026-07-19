export interface Product {
  id: string;
  slug: string;
  sku: string;
  mpn: string;
  name: string;
  brand: string;
  manufacturer: string;
  category: string;
  subcategory: string;
  industry: string[];
  series: string;
  model: string;
  description: string;
  shortDescription: string;
  technicalDescription: string;
  applications: string[];
  features: string[];
  benefits: string[];
  technicalSpecifications: Record<string, string>;
  dimensions: string;
  weight: string;
  material: string;
  countryOfOrigin: string;
  certifications: string[];
  compatibleModels: string[];
  downloads: Download[];
  datasheets: string[];
  images: ProductImage[];
  videos: string[];
  documents: Document[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  canonical: string;
  ogImage: string;
  faq: FAQItem[];
  relatedProducts: string[];
  availability: AvailabilityStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type AvailabilityStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'made-to-order';

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface Download {
  name: string;
  url: string;
  type: 'datasheet' | 'manual' | 'certificate' | 'catalog' | 'drawing';
  size: string;
}

export interface Document {
  name: string;
  url: string;
  type: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  parentId: string | null;
  children: Category[];
  productCount: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  country: string;
  productCount: number;
  categories: string[];
  industries: string[];
  certifications: string[];
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  solutions: string[];
  productCount: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
}

export interface Solution {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  industries: string[];
  products: string[];
  benefits: string[];
  features: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string;
  image: string;
  file: string;
  issueDate: string;
  expiryDate: string;
  category: string;
}

export interface DownloadResource {
  id: string;
  title: string;
  description: string;
  file: string;
  type: 'catalog' | 'datasheet' | 'manual' | 'whitepaper' | 'brochure' | 'drawing';
  category: string;
  size: string;
  downloadCount: number;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  department: string;
}

export interface Statistic {
  value: string;
  label: string;
  suffix?: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  industry?: string;
  availability?: AvailabilityStatus;
  search?: string;
  sort?: 'alphabetical' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export interface RFQFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  productName: string;
  productSKU: string;
  quantity: number;
  requirements: string;
  urgent: boolean;
}
