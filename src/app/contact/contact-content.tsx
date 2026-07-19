'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <MapPin className="h-5 w-5" />, title: 'Visit Us', content: siteConfig.contact.address },
    { icon: <Phone className="h-5 w-5" />, title: 'Call Us', content: siteConfig.contact.phone, link: `tel:${siteConfig.contact.phone}` },
    { icon: <Mail className="h-5 w-5" />, title: 'Email Us', content: siteConfig.contact.email, link: `mailto:${siteConfig.contact.email}` },
    { icon: <Clock className="h-5 w-5" />, title: 'Business Hours', content: 'Mon - Fri: 8:00 AM - 6:00 PM CST' },
  ];

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Contact</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Have a question about our products or services? Our team of industrial experts is ready to assist you.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Send Us a Message</h2>
              {submitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-600 mb-6">Thank you for contacting ZENTRYO. Our team will respond within 24 hours.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-300 text-green-700">
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder="+1 (800) 555-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Your Company Ltd." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" required value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="How can we help you?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message" required rows={6}
                      value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your requirements..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <Button type="submit" size="lg" className="bg-navy-800 hover:bg-navy-900 text-white gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-navy-900">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border border-steel-100">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 text-sm">{info.title}</h3>
                        {info.link ? (
                          <a href={info.link} className="text-steel-600 hover:text-cyan-600 transition-colors text-sm">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-steel-600 text-sm">{info.content}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border border-steel-100">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-navy-900 mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Submit an RFQ', href: '/rfq' },
                      { label: 'Browse Products', href: '/products' },
                      { label: 'Request Quote', href: '/rfq' },
                      { label: 'Technical Support', href: '/services' },
                    ].map((link) => (
                      <Link key={link.label} href={link.href} className="flex items-center gap-2 text-sm text-steel-600 hover:text-cyan-600 transition-colors">
                        <ArrowRight className="h-3.5 w-3.5" /> {link.label}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="rounded-xl gradient-blue overflow-hidden relative h-48">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-white/70 text-sm">Houston, TX - Global Headquarters</p>
                    <p className="text-white/50 text-xs mt-1">Interactive map loading...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
