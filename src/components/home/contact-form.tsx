'use client';

import { useState } from 'react';
import { Send, User, Mail, Phone, HelpCircle } from 'lucide-react';

export function HomeContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.mailto) {
        window.location.href = data.mailto;
      }
      setSent(true);
    } catch {
      const subject = encodeURIComponent(`Website Contact: ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:support@zentryo.in?subject=${subject}&body=${body}`;
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 gradient-blue" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />

      <svg className="absolute top-1/2 left-10 w-32 h-32 text-white/[0.03]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute top-1/4 right-16 w-24 h-24 text-white/[0.03]" viewBox="0 0 100 100" fill="none">
        <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" />
        <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Get in Touch
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
              We&apos;re Here to Help
            </span>
          </h2>
          <p className="text-lg text-steel-300 max-w-2xl mx-auto leading-relaxed">
            Have a question or need a quote? Send us a message and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="bg-white/10 backdrop-blur rounded-2xl p-12 text-center border border-white/10">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-steel-300">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
                  <input
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 backdrop-blur transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 backdrop-blur transition-all"
                  />
                </div>
              </div>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
                <input
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 backdrop-blur transition-all"
                />
              </div>
              <div className="relative">
                <HelpCircle className="absolute left-3.5 top-3.5 h-4 w-4 text-steel-400" />
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  value={form.message}
                  onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 backdrop-blur transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-cyan-500/25"
              >
                {loading ? 'Sending...' : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
