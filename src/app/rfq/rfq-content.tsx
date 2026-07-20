'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Send, CheckCircle, Clock, Phone, Mail, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

export function RFQContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { icon: <FileText className="h-5 w-5" />, title: '1. Submit Request', description: 'Fill out the RFQ form with your requirements.' },
    { icon: <CheckCircle className="h-5 w-5" />, title: '2. Review & Quote', description: 'Our team reviews and responds within 4 hours.' },
    { icon: <Phone className="h-5 w-5" />, title: '3. Technical Consultation', description: 'We discuss specifications and confirm availability.' },
    { icon: <Clock className="h-5 w-5" />, title: '4. Order Processing', description: 'Once approved, your order enters processing.' },
  ];

  return (
    <>
      <section className="relative overflow-hidden gradient-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-steel-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="text-white font-medium" aria-current="page">Request for Quote</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Request for Quote</h1>
            <p className="text-xl text-steel-200 leading-relaxed">
              Submit your requirements and our team will provide a competitive quote within 4 hours during business hours.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">RFQ Form</h2>
              {submitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">RFQ Submitted Successfully!</h3>
                    <p className="text-green-600 mb-2">Your quote request has been received. Our sales team will respond within 4 hours.</p>
                    <p className="text-green-500 text-sm mb-6">Reference number: ZEN-RFQ-{Date.now().toString(36).toUpperCase()}</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-300 text-green-700">
                        Submit Another RFQ
                      </Button>
                      <Link href="/products">
                        <Button className="bg-green-600 hover:bg-green-700 text-white">Continue Browsing</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required placeholder="+1 (800) 555-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" required placeholder="Your Company Ltd." />
                    </div>
                  </div>
                  <div className="border-t border-steel-100 pt-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">Product Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name *</Label>
                        <Input id="productName" required placeholder="e.g., Industrial Bearing" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU / Part Number</Label>
                        <Input id="sku" placeholder="e.g., ZEN-BRG-00123" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input id="quantity" type="number" min="1" required placeholder="10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urgent" className="flex items-center gap-2 cursor-pointer">
                          <Checkbox id="urgent" />
                          <span>Urgent Request</span>
                        </Label>
                        <p className="text-xs text-steel-400 mt-1">Check if you need expedited processing</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Detailed Requirements *</Label>
                    <textarea
                      id="requirements" required rows={6}
                      placeholder="Please provide detailed specifications, application details, delivery timeline, and any special requirements..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-steel-500">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span>Our team typically responds within 4 hours during business hours</span>
                  </div>
                  <Button type="submit" size="lg" className="bg-navy-800 hover:bg-navy-900 text-white gap-2">
                    <Send className="h-4 w-4" /> Submit RFQ
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-navy-900">What Happens Next?</h2>
              <div className="space-y-4">
                {steps.map((step) => (
                  <Card key={step.title} className="border border-steel-100">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 text-sm">{step.title}</h3>
                        <p className="text-steel-500 text-xs mt-0.5">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-navy-50 border-navy-100">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-navy-900 mb-3">Need Faster Assistance?</h3>
                  <div className="space-y-3">
                    <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-sm text-steel-600 hover:text-cyan-600 transition-colors">
                      <Phone className="h-4 w-4 text-cyan-600" /> {siteConfig.contact.phone}
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-sm text-steel-600 hover:text-cyan-600 transition-colors">
                      <Mail className="h-4 w-4 text-cyan-600" /> {siteConfig.contact.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Link href="/contact">
                <Button variant="outline" className="w-full border-navy-200 text-navy-700 gap-2">
                  Contact Us Directly <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
