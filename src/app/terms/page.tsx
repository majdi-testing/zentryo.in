import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms of service for ${siteConfig.name}. Read our terms and conditions for using our website and services.`,
    alternates: { canonical: `${siteConfig.url}/terms` },
  };
}

export default function TermsPage() {
  const lastUpdated = 'January 1, 2026';

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-steel-300">Last updated: {lastUpdated}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="prose prose-lg max-w-none text-steel-700 space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-navy-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ZENTRYO website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">2. Description of Services</h2>
            <p>
              ZENTRYO provides industrial engineering components, automation systems, gas turbine spare parts, OEM components, and related services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">3. User Responsibilities</h2>
            <p>As a user of our website and services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services in compliance with all applicable laws</li>
              <li>Not engage in any activity that disrupts or interferes with our systems</li>
              <li>Not attempt to gain unauthorized access to any part of our platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900">4. Product Information and Pricing</h2>
            <p>
              We strive to provide accurate product descriptions, specifications, and pricing. However, we do not warrant that product descriptions, specifications, or pricing are error-free. We reserve the right to correct any errors and update information without prior notice.
            </p>
            <p>
              All prices are in US Dollars (USD) unless otherwise stated. Prices are subject to change without notice. Quoted prices are valid for the period specified in the quotation.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">5. Orders and Payment</h2>
            <p>
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment terms are specified in the invoice or quotation. Title to products passes upon delivery to the carrier.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">6. Shipping and Delivery</h2>
            <p>
              Shipping costs and delivery times are estimates and may vary. Risk of loss passes to the buyer upon delivery to the carrier. We are not responsible for delays caused by circumstances beyond our reasonable control.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">7. Returns and Warranties</h2>
            <p>
              Our return policy and product warranties are outlined in separate documents available upon request. Standard return window is 30 days from receipt for eligible items. Custom and made-to-order items are subject to specific terms.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">8. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of ZENTRYO or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">9. Limitation of Liability</h2>
            <p>
              ZENTRYO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid by you for the specific product or service giving rise to the claim.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Harris County, Texas.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">11. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <p>
              Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-cyan-600 hover:underline">{siteConfig.contact.email}</a><br />
              Phone: <a href={`tel:${siteConfig.contact.phone}`} className="text-cyan-600 hover:underline">{siteConfig.contact.phone}</a><br />
              Address: {siteConfig.contact.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
