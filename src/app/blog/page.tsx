import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getBlogPosts } from '@/lib/repository';
import { formatDate } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Blog | ${siteConfig.name}`,
    description: `Industry insights, technical guides, and engineering articles from ${siteConfig.name}. Stay updated on industrial automation, maintenance best practices, and component selection.`,
    alternates: { canonical: `${siteConfig.url}/blog` },
  };
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const categories = [...new Set(posts.map((p) => p.category))];
  const recentPosts = posts.slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    description: 'Industry insights and technical resources',
    url: `${siteConfig.url}/blog`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Industry Insights</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Technical guides, engineering best practices, and industry analysis from the ZENTRYO team of experts.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <Card className="h-full border border-steel-100 hover:border-cyan-300 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
                      <div className="h-48 gradient-blue relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
                        <span className="text-6xl font-bold text-white/10">{post.title.charAt(0)}</span>
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h2 className="text-lg font-bold text-navy-900 group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-steel-600 line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-steel-400">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}</span>
                          </div>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime} min</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-steel-100">
                <p className="text-sm text-steel-500">Page 1 of 1</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled className="opacity-50">Previous</Button>
                  <Button variant="outline" size="sm" disabled className="opacity-50">Next</Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link key={cat} href={`/blog?category=${cat.toLowerCase()}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-steel-600 hover:bg-navy-50 hover:text-navy-900 transition-colors">
                      <span>{cat}</span>
                      <span className="text-xs text-steel-400">{posts.filter((p) => p.category === cat).length}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-4">Recent Posts</h3>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                      <div className="w-14 h-14 rounded-lg gradient-blue flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-white/40">{post.title.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-900 group-hover:text-cyan-600 transition-colors line-clamp-2">{post.title}</p>
                        <p className="text-xs text-steel-400 mt-1">{formatDate(post.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag.toLowerCase()}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-navy-50 text-navy-700 hover:bg-navy-100 transition-colors">
                      <Tag className="h-3 w-3" /> {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
