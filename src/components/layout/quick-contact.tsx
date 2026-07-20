'use client';

import { useState } from 'react';
import { X, Send, Phone, Mail, User, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuickContact() {
  const [open, setOpen] = useState(false);
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
      const subject = encodeURIComponent(`Quick Contact: ${form.name}`);
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
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-4 rounded-l-lg shadow-lg transition-all hover:pr-4 group"
        aria-label="Quick Contact"
      >
        <HelpCircle className="h-5 w-5" />
        <span className="text-xs font-semibold whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[80px] transition-all duration-300">
          Quick Contact
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:pr-6">
          <div className="fixed inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className={cn(
            'relative z-10 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-96 overflow-hidden',
            'animate-fade-in-up'
          )}>
            <div className="flex items-center justify-between p-4 border-b border-steel-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 text-sm">Quick Contact</h3>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-steel-50 text-steel-400 hover:text-navy-900 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-navy-900 font-semibold mb-1">Message Sent!</p>
                <p className="text-steel-500 text-sm">We&apos;ll get back to you shortly.</p>
                <button
                  onClick={() => { setOpen(false); setSent(false); }}
                  className="mt-4 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
                  <input
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-steel-200 bg-steel-50 text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-steel-200 bg-steel-50 text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-400" />
                  <input
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-steel-200 bg-steel-50 text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-steel-200 bg-steel-50 text-navy-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : <><Send className="h-4 w-4" /> Send Message</>}
                </button>
              </form>
            )}

            <div className="px-4 pb-3 text-center">
              <a href="mailto:support@zentryo.in" className="text-xs text-steel-400 hover:text-cyan-600 transition-colors">support@zentryo.in</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
