import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText, Download, CheckCircle2, Circle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getProductBySlug, getRelatedProducts, getCategories } from '@/lib/repository';
import { cn, getAvailabilityColor, getAvailabilityLabel } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductCard } from '@/components/products/product-card';

const productImages = [
  'https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18471565/pexels-photo-18471565.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20640842/pexels-photo-20640842.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6654764/pexels-photo-6654764.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36237165/pexels-photo-36237165.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4494653/pexels-photo-4494653.jpeg?auto=compress&cs=tinysrgb&w=600',
];

function getImageIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % productImages.length;
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: `Product Not Found | ${siteConfig.name}` };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.seoKeywords,
    alternates: {
      canonical: `${siteConfig.url}/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: product.images.length > 0
        ? [{ url: product.images[0].src, width: 800, height: 800 }]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, categories] = await Promise.all([
    getRelatedProducts(product),
    getCategories(),
  ]);

  const availabilityColor = getAvailabilityColor(product.availability);
  const availabilityLabel = getAvailabilityLabel(product.availability);
  const baseIdx = getImageIndex(product.name);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteConfig.url}/products` },
          { '@type': 'ListItem', position: 3, name: product.category, item: `${siteConfig.url}/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}` },
          { '@type': 'ListItem', position: 4, name: product.name, item: `${siteConfig.url}/products/${product.slug}` },
        ],
      },
      {
        '@type': 'Product',
        name: product.name,
        description: product.shortDescription,
        sku: product.sku,
        mpn: product.mpn,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        manufacturer: {
          '@type': 'Organization',
          name: product.manufacturer,
        },
        category: product.category,
        offers: {
          '@type': 'Offer',
          availability: product.availability === 'in-stock'
            ? 'https://schema.org/InStock'
            : product.availability === 'low-stock'
              ? 'https://schema.org/LimitedAvailability'
              : product.availability === 'out-of-stock'
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/MadeToOrder',
          url: `${siteConfig.url}/products/${product.slug}`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumbs */}
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li>
                <Link
                  href={`/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-primary transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{product.category}</Badge>
                {product.tags.includes('featured') && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-lg text-muted-foreground mt-2">{product.brand}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className={cn('inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full', availabilityColor)}>
                  <Circle className="h-2.5 w-2.5 fill-current" />
                  {availabilityLabel}
                </span>
                <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                <span className="text-sm text-muted-foreground">MPN: {product.mpn}</span>
              </div>
            </div>

            <Separator />

            {/* Image gallery */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Product Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={productImages[baseIdx]}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={productImages[(baseIdx + i) % productImages.length]}
                        alt={`${product.name} view ${i}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Technical Specifications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-5 py-3.5 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Specification</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50">
                    {Object.entries(product.technicalSpecifications).map(([key, value], index) => (
                      <tr key={key} className="transition-colors hover:bg-muted/20">
                        <td className="px-5 py-3.5 font-medium text-muted-foreground w-1/3">{key}</td>
                        <td className="px-5 py-3.5">{value}</td>
                      </tr>
                    ))}
                    <tr className="transition-colors hover:bg-muted/20">
                      <td className="px-5 py-3.5 font-medium text-muted-foreground">Dimensions</td>
                      <td className="px-5 py-3.5">{product.dimensions}</td>
                    </tr>
                    <tr className="transition-colors hover:bg-muted/20">
                      <td className="px-5 py-3.5 font-medium text-muted-foreground">Weight</td>
                      <td className="px-5 py-3.5">{product.weight}</td>
                    </tr>
                    <tr className="transition-colors hover:bg-muted/20">
                      <td className="px-5 py-3.5 font-medium text-muted-foreground">Material</td>
                      <td className="px-5 py-3.5">{product.material}</td>
                    </tr>
                    <tr className="transition-colors hover:bg-muted/20">
                      <td className="px-5 py-3.5 font-medium text-muted-foreground">Country of Origin</td>
                      <td className="px-5 py-3.5">{product.countryOfOrigin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Applications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Applications</h2>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1.5">
                    {app}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Downloads */}
            {product.downloads.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Downloads</h2>
                <div className="space-y-2">
                  {product.downloads.map((dl, index) => (
                    <a
                      key={index}
                      href={dl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                    >
                      <Download className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{dl.name}</p>
                        <p className="text-xs text-muted-foreground">{dl.size}</p>
                      </div>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {product.downloads.length > 0 && <Separator />}

            {/* FAQ */}
            {product.faq.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {product.faq.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {product.faq.length > 0 && <Separator />}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedProducts.map((rp) => (
                    <ProductCard key={rp.id} product={rp} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Sticky RFQ CTA */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-lg font-semibold">Request a Quote</h3>
                <p className="text-sm text-muted-foreground">
                  Interested in this product? Get a competitive quote from our team.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className={cn('font-medium', availabilityColor.split(' ')[0])}>
                      {availabilityLabel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU</span>
                    <span className="font-mono text-xs">{product.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MPN</span>
                    <span className="font-mono text-xs">{product.mpn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Brand</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span>{product.category}</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <a href={`/contact?product=${product.slug}`}>
                    Request Quote (RFQ)
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Response within 4 hours during business hours
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h4 className="font-medium text-sm">Certifications</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h4 className="font-medium text-sm">Industries</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.industry.map((ind) => (
                    <Badge key={ind} variant="outline" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
