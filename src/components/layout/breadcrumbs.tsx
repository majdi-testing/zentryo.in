import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'hero' | 'default';
}

export function Breadcrumbs({ items, variant = 'hero' }: BreadcrumbsProps) {
  if (variant === 'default') {
    return (
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-steel-300">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
