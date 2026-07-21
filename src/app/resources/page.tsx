import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, Award, HelpCircle, BookOpen, Download, Calendar } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getBlogPosts, getDownloads } from '@/lib/repository';
import { formatDate } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Resources | ${siteConfig.name}`,
    description: `Technical resources from ${siteConfig.name}: blog articles, product downloads, quality certificates, and frequently asked questions.`,
    alternates: { canonical: `${siteConfig.url}/resources` },
  };
}

export default async function ResourcesPage() {
  const [blogPosts, downloads] = await Promise.all([getBlogPosts(), getDownloads()]);
  const latestPosts = blogPosts.slice(0, 3);
  const featuredDownloads = downloads.slice(0, 4);

  const resourceLinks = [
    { icon: <BookOpen className="h-6 w-6" />, title: 'Industry Blog', description: 'Technical articles, guides, and industry insights from our engineering team.', href: '/blog', count: `${blogPosts.length} Articles` },
    { icon: <Download className="h-6 w-6" />, title: 'Downloads', description: 'Product catalogs, technical manuals, datasheets, and engineering guides.', href: '/downloads', count: `${downloads.length} Resources` },
    { icon: <Award className="h-6 w-6" />, title: 'Certifications', description: 'Quality certifications and compliance documentation.', href: '/certificates', count: '6 Certificates' },
    { icon: <HelpCircle className="h-6 w-6" />, title: 'FAQ', description: 'Answers to common questions about products, ordering, and services.', href: '/faq', count: '10 FAQs' },
  ];

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Resource Center</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Your central hub for technical knowledge, product documentation, certifications, and industry expertise from ZENTRYO.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {resourceLinks.map((resource, index) => (
              <Link key={resource.title} href={resource.href} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center mb-4 text-cyan-400">
                      {resource.icon}
                    </div>
                    <h2 className="text-lg font-bold text-navy-900 group-hover:text-cyan-600 transition-colors mb-2">{resource.title}</h2>
                    <p className="text-sm text-steel-500 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-cyan-600">{resource.count}</span>
                      <ArrowRight className="h-4 w-4 text-cyan-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Featured Downloads</h2>
              <div className="space-y-4">
                {featuredDownloads.map((dl) => (
                  <Card key={dl.id} className="border border-steel-100 hover:border-cyan-300 transition-all">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-900 truncate">{dl.title}</p>
                          <p className="text-xs text-steel-400">{dl.size} | {dl.downloadCount} downloads</p>
                        </div>
                      </div>
                      <a href={dl.file} download className="shrink-0 text-cyan-600 hover:text-cyan-700">
                        <Download className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/downloads">
                  <Button variant="outline" className="border-navy-200 text-navy-700 gap-2">
                    View All Downloads <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Latest Blog Posts</h2>
              <div className="space-y-4">
                {latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <Card className="border border-steel-100 hover:border-cyan-300 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-xs text-steel-400 mb-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-navy-50 text-navy-600 font-medium">{post.category}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}</span>
                        </div>
                        <h3 className="font-semibold text-navy-900 group-hover:text-cyan-600 transition-colors">{post.title}</h3>
                        <p className="text-sm text-steel-500 mt-1 line-clamp-2">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/blog">
                  <Button variant="outline" className="border-navy-200 text-navy-700 gap-2">
                    View All Articles <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
