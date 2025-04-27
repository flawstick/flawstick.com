import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming path is correct

export function ProjectsSkeleton() {
  return (
    <div className="relative min-h-screen pb-20 mt-8 sm:mt-8 mt-12">
      {/* Only blurred background during skeleton load */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <Image
          src="/images/knight-field-blur.png" // Use the field background
          alt="Loading background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 pt-20 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        {/* Header Skeleton */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Skeleton className="mb-4 h-10 w-48" /> {/* "Projects" title */}
          <Skeleton className="h-4 w-full max-w-md" /> {/* Subtitle */}
        </div>
        <div className="h-px w-full bg-zinc-800" /> {/* Divider */}
        {/* Grid Skeleton */}
        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Featured project skeleton */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-600 backdrop-blur-md">
            <div className="flex h-[400px] flex-col p-4 md:p-8">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-20" /> {/* Date */}
                <Skeleton className="h-4 w-16" /> {/* Views */}
              </div>
              <Skeleton className="mt-4 h-8 w-3/4" /> {/* Title */}
              <Skeleton className="mt-4 h-4 w-full" /> {/* Description */}
              <Skeleton className="mt-2 h-4 w-full" /> {/* Description */}
              <div className="absolute bottom-4 md:bottom-8">
                <Skeleton className="h-4 w-32" /> {/* Read more */}
              </div>
              {/* Show hardcoded featured slugs in skeleton for layout reference */}
              <div className="absolute bottom-2 right-2 text-xs text-zinc-500 opacity-50">
                slug: henomaly
              </div>
            </div>
          </div>
          {/* Top 2/3 skeletons */}
          <div className="mx-auto flex w-full flex-col gap-8">
            <div className="relative overflow-hidden rounded-xl border border-zinc-600 backdrop-blur-md">
              <div className="flex h-[180px] flex-col p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-4 h-4 w-full" />
                <div className="absolute bottom-2 right-2 text-xs text-zinc-500 opacity-50">
                  slug: nara
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-zinc-600 backdrop-blur-md">
              <div className="flex h-[180px] flex-col p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-4 h-4 w-full" />
                <div className="absolute bottom-2 right-2 text-xs text-zinc-500 opacity-50">
                  slug: empathai
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Skeleton for remaining projects grid (optional, can be simple) */}
        <div className="hidden h-px w-full md:block bg-zinc-800" />
        <div className="mx-auto grid grid-cols-1 gap-4 lg:mx-0 md:grid-cols-3">
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
