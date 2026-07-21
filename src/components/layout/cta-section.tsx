import Link from 'next/link';
import { ArrowRight, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

interface CTASectionProps {
  heading: string;
  description: string;
  buttons?: CTAButton[];
  variant?: 'gradient' | 'light';
}

const defaultButtons: CTAButton[] = [
  { label: 'Contact Us', href: '/contact', variant: 'primary', icon: <Phone className="mr-2 h-5 w-5" /> },
  { label: 'Submit RFQ', href: '/rfq', variant: 'secondary', icon: <FileText className="mr-2 h-5 w-5" /> },
];

export function CTASection({
  heading,
  description,
  buttons = defaultButtons,
  variant = 'gradient',
}: CTASectionProps) {
  if (variant === 'light') {
    return (
      <section className="py-20 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">{heading}</h2>
          <p className="text-steel-600 text-lg max-w-2xl mx-auto mb-8">{description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((btn, i) => (
              <Link key={i} href={btn.href}>
                <Button
                  size="lg"
                  className={
                    btn.variant === 'primary'
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white gap-2'
                      : 'border-navy-200 text-navy-700 hover:bg-navy-50 gap-2'
                  }
                  variant={btn.variant === 'primary' ? 'default' : 'outline'}
                >
                  {btn.icon}
                  {btn.label}
                  {!btn.icon && <ArrowRight className="h-4 w-4" />}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl gradient-blue p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>
            <p className="text-steel-200 text-lg mb-8">{description}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {buttons.map((btn, i) => (
                <Link key={i} href={btn.href}>
                  <Button
                    size="lg"
                    className={
                      btn.variant === 'primary'
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-cyan-500/25'
                        : 'border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent px-8 py-6 text-base'
                    }
                    variant={btn.variant === 'primary' ? 'default' : 'outline'}
                  >
                    {btn.icon}
                    {btn.label}
                    {!btn.icon && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
