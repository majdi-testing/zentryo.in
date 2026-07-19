import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Package, Wrench, Cpu, Gauge, Settings, Zap, Thermometer, Wind, Droplets, Cog, Hammer, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getCategories } from '@/lib/repository';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Categories | ${siteConfig.name}`,
    description: `Browse industrial product categories at ${siteConfig.name}: bearings, valves, automation, sensors, hydraulics, pneumatics, electrical components, and more.`,
    alternates: { canonical: `${siteConfig.url}/categories` },
  };
}

const categoryIconMap: Record<string, React.ReactNode> = {
  'bearings': <Cog className="h-7 w-7" />,
  'valves': <Wrench className="h-7 w-7" />,
  'automation': <Cpu className="h-7 w-7" />,
  'controllers': <Gauge className="h-7 w-7" />,
  'sensors': <Thermometer className="h-7 w-7" />,
  'manifolds': <Settings className="h-7 w-7" />,
  'turbine-parts': <Zap className="h-7 w-7" />,
  'plc-accessories': <Cpu className="h-7 w-7" />,
  'hydraulics': <Droplets className="h-7 w-7" />,
  'pneumatics': <Wind className="h-7 w-7" />,
  'seals': <Filter className="h-7 w-7" />,
  'filters': <Filter className="h-7 w-7" />,
  'gears': <Cog className="h-7 w-7" />,
  'couplings': <Settings className="h-7 w-7" />,
  'fasteners': <Hammer className="h-7 w-7" />,
  'electrical': <Zap className="h-7 w-7" />,
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((c, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Product', name: c.name, description: c.shortDescription },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Categories</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Product Categories</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Explore our comprehensive range of industrial product categories, from bearings and valves to automation systems and electrical components.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center mb-4 group-hover:from-navy-800 group-hover:to-navy-900 transition-all">
                      <div className="text-navy-700 group-hover:text-cyan-400 transition-colors">
                        {categoryIconMap[category.slug] || <Package className="h-7 w-7" />}
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-navy-900 group-hover:text-cyan-600 transition-colors mb-2">{category.name}</h2>
                    <p className="text-sm text-steel-500 mb-3 line-clamp-2">{category.shortDescription}</p>
                    <div className="flex items-center gap-1.5 text-sm text-cyan-600 font-medium">
                      <Package className="h-3.5 w-3.5" />
                      <span>{category.productCount} products</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
