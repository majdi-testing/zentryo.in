import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { ColorProvider } from '@/providers/color-provider';
import { QuickContact } from '@/components/layout/quick-contact';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { siteConfig } from '@/config/site';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Industrial Engineering & Automation Solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    site: '@zentryo',
    creator: '@zentryo',
  },
  icons: {
    icon: { url: '/images/favicon-icon-main.png', type: 'image/png', sizes: '32x32' },
    shortcut: '/images/favicon-icon-main.png',
    apple: '/images/favicon-icon-main.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'Industrial Automation & Engineering',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased transition-colors duration-300">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-navy-900 focus:rounded-lg focus:shadow-xl focus:outline-none">
          Skip to content
        </a>
        <ThemeProvider>
          <ColorProvider>
            <Header />
            <main id="main-content" className="flex-1 pt-16 lg:pt-24 pb-8 lg:pb-12">{children}</main>
            <Footer />
            <QuickContact />
            <WhatsAppButton />
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}