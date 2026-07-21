'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { siteInfo, footerQuickLinks, footerProductLinks } from '@/constants/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-steel-200">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center mb-5">
              <Image src="/images/logo.png" alt="ZENTRYO" width={180} height={52} className="object-contain" />
            </Link>
            <p className="text-sm text-steel-400 leading-relaxed mb-6">
              {siteInfo.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-800 text-steel-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={siteInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-800 text-steel-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-800 text-steel-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.slug}
                    className="flex items-center gap-1.5 text-sm text-steel-400 hover:text-cyan-400 transition-colors group"
                  >
                    <ChevronRight className="h-3 w-3 text-cyan-500 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Products
            </h3>
            <ul className="space-y-2.5">
              {footerProductLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.slug}
                    className="flex items-center gap-1.5 text-sm text-steel-400 hover:text-cyan-400 transition-colors group"
                  >
                    <ChevronRight className="h-3 w-3 text-cyan-500 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <span className="text-sm text-steel-400 leading-relaxed">
                  {siteInfo.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteInfo.phone}`}
                  className="flex items-center gap-3 text-sm text-steel-400 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="h-5 w-5 text-cyan-500 shrink-0" />
                  <span>{siteInfo.phone} | {siteInfo.secondaryPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex items-center gap-3 text-sm text-steel-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="h-5 w-5 text-cyan-500 shrink-0" />
                  <span>{siteInfo.email} | {siteInfo.contactEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel-500">
            &copy; {currentYear} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-steel-500 hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-steel-500 hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
