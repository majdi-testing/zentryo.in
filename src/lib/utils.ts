import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateSKU(category: string, brand: string, index: number): string {
  const cat = category.slice(0, 3).toUpperCase();
  const br = brand.slice(0, 3).toUpperCase();
  return `ZEN-${cat}-${br}-${String(index).padStart(5, '0')}`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getAvailabilityColor(status: string): string {
  switch (status) {
    case 'in-stock': return 'text-emerald-600 bg-emerald-50';
    case 'low-stock': return 'text-amber-600 bg-amber-50';
    case 'out-of-stock': return 'text-red-600 bg-red-50';
    case 'made-to-order': return 'text-blue-600 bg-blue-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getAvailabilityLabel(status: string): string {
  switch (status) {
    case 'in-stock': return 'In Stock';
    case 'low-stock': return 'Low Stock';
    case 'out-of-stock': return 'Out of Stock';
    case 'made-to-order': return 'Made to Order';
    default: return status;
  }
}

export const productImages = [
  'https://cdn.pixabay.com/photo/2019/06/19/10/44/industrial-4284329_640.jpg',
  'https://cdn.pixabay.com/photo/2020/04/29/09/14/valve-5107810_640.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/15/59/valves-1729045_640.jpg',
  'https://cdn.pixabay.com/photo/2018/07/17/10/19/industrial-3544509_640.jpg',
  'https://cdn.pixabay.com/photo/2017/07/10/14/49/gear-2490614_640.jpg',
  'https://cdn.pixabay.com/photo/2014/09/19/20/05/pressure-gauge-453427_640.jpg',
  'https://cdn.pixabay.com/photo/2016/11/19/15/17/automation-1839548_640.jpg',
  'https://cdn.pixabay.com/photo/2021/08/26/04/51/industry-6575623_640.jpg',
  'https://cdn.pixabay.com/photo/2016/11/01/12/42/motor-1788422_640.jpg',
  'https://cdn.pixabay.com/photo/2018/02/26/18/20/gears-3183582_640.jpg',
  'https://cdn.pixabay.com/photo/2018/07/17/10/19/industrial-3544506_640.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/05/48/automation-1867754_640.jpg',
];

export const heroImages = [
  'https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/12270481/pexels-photo-12270481.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/12583030/pexels-photo-12583030.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

export function getImageIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % productImages.length;
}

export function getHeroIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % heroImages.length;
}

export function paginate<T>(items: T[], page: number, limit: number) {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: items.slice(start, end),
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
