import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming path is correct

export function BlogSkeleton() {
  return (
    <div className="relative min-h-screen pb-20 mt-8 sm:mt-8 mt-12">
      {/* Only blurred background during skeleton load */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/images/knight-cross-blur.png" // Ensure path is correct
          alt="Loading background"
          fill
          priority // Load blur quickly
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        {/* Header Skeleton */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="w-full h-px bg-zinc-800" /> {/* Divider */}
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {/* Featured post skeleton */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-600 backdrop-blur-md">
            <div className="p-4 md:p-8 h-[400px] flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-8 w-3/4 mt-4" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-full mt-2" />
              <div className="absolute bottom-4 md:bottom-8">
                <Skeleton className="h-4 w-32" />
              </div>
              {/* Show hardcoded featured slugs in skeleton for layout reference */}
              <div className="absolute bottom-2 right-2 text-xs text-zinc-500 opacity-50">
                slug: neovim-vs-cursor
              </div>
            </div>
          </div>
          {/* Top 2/3 skeletons */}
          <div className="flex flex-col w-full gap-8 mx-auto">
            <div className="relative overflow-hidden rounded-xl border border-zinc-600 backdrop-blur-md">
              <div className="p-4 md:p-8 h-[180px] flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-4 w-full mt-4" />
                <div className="absolute bottom-2 right-2 text-xs text-zinc-500 opacity-50">
                  slug: ai-coding-assistants
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-zinc-600 backdrop-blur-md">
              <div className="p-4 md:p-8 h-[180px] flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-4 w-full mt-4" />
                <div className="absolute bottom-2 right-2 text-xs text-zinc-500 opacity-50">
                  slug: minimalist-web-design
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
