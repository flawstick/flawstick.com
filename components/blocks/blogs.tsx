"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Card } from "@/components/card"; // Assuming path is correct
import { formatDate } from "@/lib/utils"; // Assuming path is correct
import { BlogArticle } from "@/components/blog-article"; // Assuming path is correct
import { BlogSkeleton } from "@/components/blocks/blogs-skeleton"; // Using user's path
import type { BlogMetadata } from "@/lib/blog"; // Assuming path is correct

interface BlogPageClientProps {
  initialBlogs: BlogMetadata[]; // Receives blogs with initial views
}

export function BlogPageClient({ initialBlogs }: BlogPageClientProps) {
  // State initialization
  const [isLoaded, setIsLoaded] = useState(false); // Controls skeleton display
  const [blogs, setBlogs] = useState(initialBlogs); // Initialize with server data (includes views)
  const [imageLoaded, setImageLoaded] = useState(false); // Track background image load status

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer); // Cleanup timer
  }, [blogs]); // Effect depends on the blogs list

  // --- Skeleton Loading UI ---
  if (!isLoaded) {
    return <BlogSkeleton />; // Render the dedicated skeleton component
  }

  // --- Data Preparation for Rendering ---
  const featuredSlug = "neovim-vs-cursor";
  const top2Slug = "ai-coding-assistants";
  const top3Slug = "minimalist-web-design";

  // Find the specific featured posts from the current 'blogs' state
  const featured = blogs.find((blog) => blog.slug === featuredSlug);
  const top2 = blogs.find((blog) => blog.slug === top2Slug);
  const top3 = blogs.find((blog) => blog.slug === top3Slug);

  // Check if all required featured posts were successfully found
  const featuredPostsExist = featured && top2 && top3;
  if (!featuredPostsExist) {
    console.error(
      "Warning: One or more required featured posts were not found in the initialBlogs data.",
    );
  }

  // Filter out featured posts and sort the rest by date descending
  const sorted = blogs
    .filter(
      (blog) =>
        blog.slug !== featured?.slug &&
        blog.slug !== top2?.slug &&
        blog.slug !== top3?.slug,
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(), // Sort newest first
    );

  // --- Render Actual Page Content ---
  return (
    <div className="relative min-h-screen pb-20 mt-8 sm:mt-8 mt-12">
      {/* Background Images: Blurred placeholder (-z-20) and Main image (-z-10) */}
      <div className="fixed inset-0 -z-20 h-full w-full">
        <Image
          src="/images/knight-cross-blur.png" // Ensure path is correct
          alt="Background placeholder"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full">
        <Image
          src="/images/knight-cross.png" // Ensure path is correct
          alt="Knight resting in field with cross"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`} // Fade-in effect
          onLoadingComplete={() => setImageLoaded(true)} // Set state when loaded
        />
        <div className="absolute inset-0 bg-black/50"></div>{" "}
        {/* Dark overlay */}
      </div>

      {/* Page Content Area (relative z-10 to appear above backgrounds) */}
      <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 pb-4 pt-20 md:space-y-16 md:pt-24 lg:px-8 lg:pt-28">
        {/* Page Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Blog
          </h2>
          <p className="mt-4 text-zinc-400">
            Thoughts, ideas, and insights on technology and development.
          </p>
        </div>
        <div className="h-px w-full bg-zinc-600" /> {/* Divider */}
        {/* Render blog grid or error message if featured posts missing */}
        {!featuredPostsExist ? (
          <div className="animate-fadeIn py-12 text-center text-red-400">
            Required featured posts could not be loaded. Check content files.
          </div>
        ) : (
          <>
            {/* Featured Posts Grid */}
            <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Featured Post Card (Top Left) */}
              <Card>
                <Link href={`/blog/${featured.slug}`}>
                  <article className="relative h-full w-full p-4 md:p-8">
                    {/* Meta: Date and Views */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-zinc-100">
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {formatDate(featured.date)}
                        </time>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Eye className="h-4 w-4" />{" "}
                        {/* Use views directly from the blog object */}
                        {Intl.NumberFormat("en-US", {
                          notation: "compact",
                        }).format(featured.views ?? 0)}
                        {/* Removed loading pulse span */}
                      </span>
                    </div>
                    {/* Title */}
                    <h2
                      id="featured-post"
                      className="font-display group-hover:text-white mt-4 bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
                    >
                      {featured.title}
                    </h2>
                    {/* Description */}
                    <p className="group-hover:text-zinc-300 mt-4 leading-8 text-zinc-400 duration-150">
                      {featured.description}
                    </p>
                    {/* Read More Indicator */}
                    <div className="absolute bottom-4 md:bottom-8">
                      <p className="group hidden text-zinc-200 duration-500 hover:text-zinc-50 lg:block">
                        Read more <span aria-hidden="true">&rarr;</span>
                        <span className="block h-0.5 max-w-0 bg-zinc-200 transition-all duration-500 group-hover:max-w-full group-hover:bg-zinc-50"></span>
                      </p>
                    </div>
                  </article>
                </Link>
              </Card>

              {/* Top 2 & 3 Column (Top Right) */}
              <div className="mx-auto flex w-full flex-col gap-8 border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
                {[top2, top3].map((blog) => (
                  <Card key={blog.slug}>
                    <Link href={`/blog/${blog.slug}`}>
                      {/* Pass views directly from blog object */}
                      <BlogArticle blog={blog} views={blog.views ?? 0} />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-px w-full md:block bg-zinc-600" />

            {/* Grid for Remaining Posts */}
            {sorted.length > 0 && (
              <div className="mx-auto grid grid-cols-1 gap-4 lg:mx-0 md:grid-cols-3">
                {/* Column 1 */}
                <div className="grid grid-cols-1 gap-4">
                  {sorted
                    .filter((_, i) => i % 3 === 0) // Simple distribution logic
                    .map((blog) => (
                      <Card key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`}>
                          {/* Pass views directly from blog object */}
                          <BlogArticle blog={blog} views={blog.views ?? 0} />
                        </Link>
                      </Card>
                    ))}
                </div>
                {/* Column 2 */}
                <div className="grid grid-cols-1 gap-4">
                  {sorted
                    .filter((_, i) => i % 3 === 1)
                    .map((blog) => (
                      <Card key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`}>
                          <BlogArticle blog={blog} views={blog.views ?? 0} />
                        </Link>
                      </Card>
                    ))}
                </div>
                {/* Column 3 */}
                <div className="grid grid-cols-1 gap-4">
                  {sorted
                    .filter((_, i) => i % 3 === 2)
                    .map((blog) => (
                      <Card key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`}>
                          <BlogArticle blog={blog} views={blog.views ?? 0} />
                        </Link>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
