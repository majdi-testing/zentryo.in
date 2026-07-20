import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
    alternates: { canonical: `${siteConfig.url}/privacy` },
  };
}

export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2026';

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Privacy Policy</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-steel-300">Last updated: {lastUpdated}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="prose prose-lg max-w-none text-steel-700 space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-navy-900">1. Introduction</h2>
            <p>
              ZENTRYO (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our website or services.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-navy-800">Personal Information</h3>
            <p>We may collect personally identifiable information such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name and position</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800">Non-Personal Information</h3>
            <p>We may collect non-personal information such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and time spent</li>
              <li>Referring URLs</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and fulfill orders</li>
              <li>To respond to inquiries and provide customer support</li>
              <li>To send technical documentation and product information</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
              <li>To send marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900">4. Information Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may share information with trusted partners who assist in operating our website, conducting our business, or servicing you, provided they agree to keep your information confidential.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted using industry-standard SSL/TLS protocols.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">6. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings. Essential cookies are required for the website to function properly.
            </p>

            <h2 className="text-2xl font-bold text-navy-900">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (subject to legal requirements)</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <p>
              Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-cyan-600 hover:underline">{siteConfig.contact.email}</a><br />
              Phone: <a href={`tel:${siteConfig.contact.phone}`} className="text-cyan-600 hover:underline">{siteConfig.contact.phone}</a><br />
              Address: {siteConfig.contact.address}
            </p>

            <h2 className="text-2xl font-bold text-navy-900">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
