export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="h-10 w-[150px] bg-gray-200 rounded animate-pulse" />
            <div className="hidden md:flex items-center space-x-8">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* QuoteGenerator skeleton */}
      <div className="pt-20 md:pt-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-screen">
            {/* Lottie placeholder */}
            <div className="hidden md:flex items-center justify-center p-12">
              <div className="w-full max-w-2xl aspect-square bg-blue-50/60 rounded-lg animate-pulse" />
            </div>
            {/* CTA placeholder */}
            <div className="flex items-center justify-center md:py-12">
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-[#4492AC] rounded-2xl p-5 md:p-12 shadow-xl">
                  <div className="h-8 w-3/4 mx-auto bg-white/20 rounded animate-pulse mb-4" />
                  <div className="hidden md:block h-4 w-2/3 mx-auto bg-white/20 rounded animate-pulse mb-8" />
                  <div className="h-12 w-48 mx-auto bg-white/30 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
