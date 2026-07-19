export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-72 bg-muted rounded animate-pulse" />
        <div className="h-5 w-96 bg-muted rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-5 bg-muted rounded animate-pulse" />
          ))}
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-48 bg-muted rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-muted rounded animate-pulse" />
              <div className="h-9 w-20 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="h-10 w-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
