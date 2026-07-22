import { HomeHero } from '@/components/home/hero';
import { TrustedBrands } from '@/components/home/trusted-brands';
import { Statistics } from '@/components/home/statistics';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { IndustriesSection } from '@/components/home/industries';
import { ProductRange } from '@/components/home/product-range';
import { CategoriesSection, type CategoryCard } from '@/components/home/categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { SolutionsSection } from '@/components/home/solutions';
import { EngineeringServices } from '@/components/home/engineering-services';
import { OurProcess } from '@/components/home/our-process';
import { QualityAssurance } from '@/components/home/quality-assurance';
import { CertificatesSection } from '@/components/home/certificates';
import { GlobalPresence } from '@/components/home/global-presence';
import { TestimonialsSection } from '@/components/home/testimonials';
import { LatestBlogs } from '@/components/home/latest-blogs';
import { FAQSection } from '@/components/home/faq';
import { HomeContactForm } from '@/components/home/contact-form';
import { getCategories, loadAllProducts } from '@/lib/data-service';

async function getCategoriesWithSubcategories(): Promise<CategoryCard[]> {
  const categories = await getCategories();
  const allProducts = await loadAllProducts();
  const subcategoryMap = new Map<string, Set<string>>();
  for (const p of allProducts) {
    const slug = p.category.toLowerCase().replace(/\s+/g, '-');
    if (!subcategoryMap.has(slug)) subcategoryMap.set(slug, new Set());
    subcategoryMap.get(slug)!.add(p.subcategory);
  }
  return categories.map(c => ({
    slug: c.slug,
    name: c.name,
    productCount: c.productCount,
    subcategories: Array.from(subcategoryMap.get(c.slug) || []).slice(0, 6),
  }));
}

export default async function HomePage() {
  const categories = await getCategoriesWithSubcategories();

  return (
    <>
      <HomeHero />
      <TrustedBrands />
      <ProductRange />
      <CategoriesSection categories={categories} />
      <Statistics />
      <WhyChooseUs />
      <IndustriesSection />
      <FeaturedProducts />
      <SolutionsSection />
      <EngineeringServices />
      <OurProcess />
      <QualityAssurance />
      <CertificatesSection />
      <GlobalPresence />
      <TestimonialsSection />
      <LatestBlogs />
      <FAQSection />
      <HomeContactForm />
    </>
  );
}
