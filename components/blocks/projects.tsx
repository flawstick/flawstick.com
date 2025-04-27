// File: components/blocks/projects.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Card } from "@/components/card"; // Assuming path is correct
import { formatDate } from "@/lib/utils"; // Assuming path is correct
import { ProjectsSkeleton } from "./projects-skeleton"; // Import the project skeleton
import type { ProjectMetadata } from "@/lib/project"; // Assuming path is correct

// Simple Article component for displaying project info in cards
// (Similar to BlogArticle but adapted for ProjectMetadata)
function ProjectArticle({ project }: { project: ProjectMetadata }) {
  return (
    <article className="p-4 md:p-8">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-zinc-200 drop-shadow-orange duration-1000 group-hover:border-zinc-200 group-hover:text-white">
          {project.date ? (
            <time dateTime={new Date(project.date).toISOString()}>
              {formatDate(project.date)}
            </time>
          ) : (
            <span>SOON</span> // Fallback if date is missing
          )}
        </span>
        {/* Display views directly from the project prop */}
        <span className="flex items-center gap-1 text-xs text-zinc-500">
          <Eye className="h-4 w-4" />{" "}
          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
            project.views ?? 0, // Use views from prop, default 0
          )}
        </span>
      </div>
      <h2 className="font-display z-20 mt-4 bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-xl font-medium text-transparent duration-1000 group-hover:from-white group-hover:to-white lg:text-3xl">
        {project.title}
      </h2>
      <p className="z-20 mt-4 text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
        {project.description}
      </p>
    </article>
  );
}

interface ProjectsPageClientProps {
  initialProjects: ProjectMetadata[]; // Receive projects with initial views
}

export function ProjectsPageClient({
  initialProjects,
}: ProjectsPageClientProps) {
  // State initialization
  const [isLoaded, setIsLoaded] = useState(false); // Skeleton display
  const [projects, setProjects] = useState(initialProjects); // Initialize with server data
  // Removed: filteredProjects state (can be added back if filtering needed)
  // Removed: views and viewsLoaded state
  const [imageLoaded, setImageLoaded] = useState(false); // Background image load

  useEffect(() => {
    // Removed view fetching logic

    // Short delay before removing skeleton
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Run only once on mount

  // --- Skeleton Loading UI ---
  if (!isLoaded) {
    return <ProjectsSkeleton />;
  }

  // --- Data Preparation for Rendering ---
  // Define slugs for featured projects
  const featuredSlug = "henomaly";
  const top2Slug = "nara";
  const top3Slug = "empathai";

  // Find the specific featured projects from the 'projects' state
  const featured = projects.find((p) => p.slug === featuredSlug);
  const top2 = projects.find((p) => p.slug === top2Slug);
  const top3 = projects.find((p) => p.slug === top3Slug);

  // Check if all required featured projects were found
  const featuredPostsExist = featured && top2 && top3;
  if (!featuredPostsExist) {
    console.error(
      "Warning: One or more required featured projects (henomaly, nara, empathai) were not found.",
    );
  }

  // Filter out featured projects and sort the rest by date descending
  const sorted = projects
    .filter(
      (p) =>
        p.slug !== featured?.slug &&
        p.slug !== top2?.slug &&
        p.slug !== top3?.slug,
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // --- Render Actual Page Content ---
  return (
    <div className="relative min-h-screen pb-20 mt-8 sm:mt-8 mt-12">
      {/* Background Images */}
      <div className="fixed inset-0 -z-20 h-full w-full">
        <Image
          src="/images/knight-field-blur.png" // Use field background
          alt="Background placeholder"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full">
        <Image
          src="/images/knight-field.png" // Use field background
          alt="Knight in poppy field"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/50"></div>{" "}
        {/* Dark overlay */}
      </div>

      {/* Page Content Area */}
      <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 pb-4 pt-20 md:space-y-16 md:pt-24 lg:px-8 lg:pt-28">
        {/* Page Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Most of the following are of my own time, others are work related.
          </p>
        </div>
        <div className="h-px w-full bg-zinc-600" /> {/* Divider */}
        {/* Render project grid or error message */}
        {!featuredPostsExist ? (
          <div className="animate-fadeIn py-12 text-center text-red-400">
            Required featured projects could not be loaded. Check content files.
          </div>
        ) : (
          <>
            {/* Featured Projects Grid */}
            <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Featured Project Card (Top Left) */}
              <Card>
                {/* Link using project slug */}
                <Link href={`/projects/${featured.slug}`}>
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
                        {/* Use views directly from project object */}
                        {Intl.NumberFormat("en-US", {
                          notation: "compact",
                        }).format(featured.views ?? 0)}
                      </span>
                    </div>
                    {/* Title */}
                    <h2
                      id="featured-project" // Use a relevant ID if needed
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
                {[top2, top3].map((project) => (
                  <Card key={project.slug}>
                    <Link href={`/projects/${project.slug}`}>
                      {/* Use the ProjectArticle component */}
                      <ProjectArticle project={project} />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-px w-full md:block bg-zinc-600" />

            {/* Grid for Remaining Projects */}
            {sorted.length > 0 && (
              <div className="mx-auto grid grid-cols-1 gap-4 lg:mx-0 md:grid-cols-3">
                {/* Column 1 */}
                <div className="grid grid-cols-1 gap-4">
                  {sorted
                    .filter((_, i) => i % 3 === 0) // Distribute projects
                    .map((project) => (
                      <Card key={project.slug}>
                        <Link href={`/projects/${project.slug}`}>
                          <ProjectArticle project={project} />
                        </Link>
                      </Card>
                    ))}
                </div>
                {/* Column 2 */}
                <div className="grid grid-cols-1 gap-4">
                  {sorted
                    .filter((_, i) => i % 3 === 1)
                    .map((project) => (
                      <Card key={project.slug}>
                        <Link href={`/projects/${project.slug}`}>
                          <ProjectArticle project={project} />
                        </Link>
                      </Card>
                    ))}
                </div>
                {/* Column 3 */}
                <div className="grid grid-cols-1 gap-4">
                  {sorted
                    .filter((_, i) => i % 3 === 2)
                    .map((project) => (
                      <Card key={project.slug}>
                        <Link href={`/projects/${project.slug}`}>
                          <ProjectArticle project={project} />
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
