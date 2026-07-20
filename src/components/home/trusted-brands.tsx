'use client';



import { cn } from '@/lib/utils';

const brands = [
  'GE', 'Siemens', 'ABB', 'Honeywell', 'Rolls-Royce',
  'SKF', 'Parker', 'Bosch Rexroth', 'Emerson', 'Schneider',
];

export function TrustedBrands() {
  return (
    <section className="py-16 bg-white border-y border-steel-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-steel-500">
            Trusted Manufacturers & Partners
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll-left" style={{ width: 'max-content' }}>
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className={cn(
                  'flex items-center justify-center h-16 px-8 rounded-lg border border-steel-100',
                  'bg-white hover:border-cyan-200 hover:bg-cyan-50/50 transition-colors'
                )}
              >
                <span className="text-lg font-bold text-navy-700 tracking-wide whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
