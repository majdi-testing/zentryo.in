import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, ExternalLink, Share2, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/repository';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(p => ({ slug: p.slug }));
}

interface BlogPostPageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.seoTitle}`,
    description: post.seoDescription,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: { title: post.seoTitle, description: post.seoDescription, type: 'article', publishedTime: post.publishedAt, authors: [post.author] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);
  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: `${siteConfig.url}/images/og-image.jpg` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${slug}` },
  };

  const shareUrl = `${siteConfig.url}/blog/${slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <section className="relative overflow-hidden gradient-blue">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
            <div className="max-w-3xl animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-steel-300"><Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}</span>
                <span className="flex items-center gap-1 text-sm text-steel-300"><Clock className="h-3.5 w-3.5" /> {post.readTime} min read</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <p className="text-xl text-steel-200">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-6 text-sm text-steel-300">
                <User className="h-4 w-4" /> Written by <span className="font-medium text-white">{post.author}</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none animate-fade-in-up">
                <div className="w-full h-64 md:h-80 rounded-xl gradient-blue mb-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
                  <span className="text-8xl font-bold text-white/10">{post.title.charAt(0)}</span>
                </div>

                <div className="text-steel-700 leading-relaxed space-y-4">
                  <p className="text-lg">{post.content}</p>
                  <p className="text-lg">At ZENTRYO, we understand the critical importance of staying ahead in today&apos;s rapidly evolving industrial landscape. Our team of engineers and industry specialists continuously monitors emerging technologies, regulatory changes, and best practices to bring you the most relevant and actionable insights.</p>
                  <p className="text-lg">Whether you are involved in power generation, oil and gas, manufacturing, or any other industrial sector, the information shared in our blog is designed to help you make informed decisions about your component selection, maintenance strategies, and operational improvements.</p>

                  <h2 className="text-2xl font-bold text-navy-900 mt-8">Key Takeaways</h2>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Understanding the latest trends helps optimize your procurement strategy</li>
                    <li>Proper component selection directly impacts operational reliability</li>
                    <li>Regular maintenance extends equipment life and reduces total cost of ownership</li>
                    <li>Partnering with experienced suppliers ensures access to genuine, certified components</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-navy-50 text-navy-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                    <span className="text-lg font-bold text-cyan-400">{post.author.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{post.author}</p>
                    <p className="text-sm text-steel-500">ZENTRYO Engineering Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-steel-500 mr-2">Share:</span>
                  {[
                    { icon: <ExternalLink className="h-4 w-4" />, label: 'LinkedIn', href: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
                    { icon: <ExternalLink className="h-4 w-4" />, label: 'X (Twitter)', href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}` },
                    { icon: <ExternalLink className="h-4 w-4" />, label: 'Facebook', href: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-navy-50 flex items-center justify-center text-navy-600 hover:bg-navy-100 transition-colors">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                  <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>
              </div>
            </div>

            <aside className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-bold text-navy-900 mb-3">About the Author</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                      <span className="text-lg font-bold text-cyan-400">{post.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{post.author}</p>
                      <p className="text-xs text-steel-500">ZENTRYO Engineering Team</p>
                    </div>
                  </div>
                  <p className="text-sm text-steel-600">Industry expert with deep technical knowledge in industrial components, automation systems, and engineering solutions.</p>
                </CardContent>
              </Card>

              {related.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-4">Related Articles</h3>
                  <div className="space-y-3">
                    {related.map((rel) => (
                      <Link key={rel.slug} href={`/blog/${rel.slug}`} className="flex gap-3 group">
                        <div className="w-14 h-14 rounded-lg gradient-blue flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-white/40">{rel.title.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-900 group-hover:text-cyan-600 transition-colors line-clamp-2">{rel.title}</p>
                          <p className="text-xs text-steel-400 mt-1">{formatDate(rel.publishedAt)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
