import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeHero } from '@/components/home/hero';
import { TrustedBrands } from '@/components/home/trusted-brands';
import { Statistics } from '@/components/home/statistics';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { IndustriesSection } from '@/components/home/industries';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoriesSection } from '@/components/home/categories';
import { SolutionsSection } from '@/components/home/solutions';
import { EngineeringServices } from '@/components/home/engineering-services';
import { CertificatesSection } from '@/components/home/certificates';
import { GlobalPresence } from '@/components/home/global-presence';
import { LatestBlogs } from '@/components/home/latest-blogs';
import { TestimonialsSection } from '@/components/home/testimonials';
import { FAQSection } from '@/components/home/faq';
import { ContactCTA } from '@/components/home/contact-cta';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustedBrands />
      <Statistics />
      <WhyChooseUs />
      <IndustriesSection />
      <FeaturedProducts />
      <CategoriesSection />
      <SolutionsSection />
      <EngineeringServices />
      <CertificatesSection />
      <GlobalPresence />
      <LatestBlogs />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
