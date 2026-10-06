import Skeleton from '../ui/Skeleton';

export default function BioLinksSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Glow Placeholder */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#df2531]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header Bar Skeleton */}
      <header className="w-full max-w-xl flex items-center justify-between pt-2 pb-6 z-10">
        <Skeleton className="w-28 h-8 rounded-lg" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </header>

      {/* Main Profile & Links Skeleton */}
      <main className="w-full max-w-xl flex-1 flex flex-col items-center justify-center py-4 z-10 space-y-6">
        {/* Profile Avatar & Info Skeleton */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Skeleton variant="circular" className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-white/10" />
          <Skeleton className="w-48 h-7 rounded-lg mt-2" />
          <Skeleton className="w-64 h-4 rounded-md" />
          <Skeleton className="w-32 h-6 rounded-full" />
        </div>

        {/* Action Button Skeleton */}
        <Skeleton className="w-full h-14 rounded-2xl border border-red-500/20" />

        {/* Links Cards Skeletons */}
        <div className="w-full space-y-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full p-4 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5 w-full">
                <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/2 h-3 rounded" />
                </div>
              </div>
              <Skeleton className="w-5 h-5 rounded-full shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="w-full max-w-xl pt-6 pb-2 text-center z-10">
        <Skeleton className="w-40 h-4 mx-auto rounded" />
      </footer>
    </div>
  );
}
