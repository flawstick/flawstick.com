import "./mdx.css";
import Image from "next/image";
import { ReportView } from "./view";
import { getBlogViews as getViews } from "@/lib/blog";
import { notFound } from "next/navigation";
import { FaGithub, FaLink, FaEye } from "react-icons/fa";

// Define an interface for your frontmatter structure
interface Frontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  published: boolean;
  githubUrl?: string;
  websiteUrl?: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let BlogComponent;
  let frontmatter: Frontmatter;

  // --- Load MDX Content and Frontmatter ---
  try {
    const blogModule = await import(`@/content/blogs/${slug}.mdx`);
    if (!blogModule || !blogModule.frontmatter) {
      console.error(`MDX module or frontmatter not found for slug "${slug}"`);
      notFound();
    }
    BlogComponent = blogModule.default;
    frontmatter = blogModule.frontmatter as Frontmatter;
  } catch (error) {
    console.error(`Error loading MDX file for slug "${slug}":`, error);
    notFound();
  }

  // --- Fetch View Count Using Util Function ---
  const viewCount = await getViews(slug);
  // --- ---

  // Format the date
  const displayDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* --- Fixed Background Images --- */}
      {/* These divs use `fixed inset-0` to cover the viewport */}
      {/* Negative z-index (`-z-10`, `-z-20`) places them behind other content */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <Image
          src="/images/knight-cross-blur.png" // Make sure path is correct
          alt="Knight with cross placeholder"
          fill // Makes image fill the parent div
          priority // Load image sooner
          className="object-cover" // Cover the area without distortion
        />
      </div>
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/images/knight-cross.png" // Make sure path is correct
          alt="Knight resting in field with cross"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {/* --- End Fixed Background --- */}

      {/* ReportView - Client component to increment views */}
      {/* This component should be making the POST request to /api/incr */}
      <ReportView slug={slug} />

      {/* --- Main Content Area --- */}
      {/* `relative z-10` ensures this content appears ON TOP of the fixed background */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-white mt-20 animate-slide-up-fade">
        {/* Metadata Section */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-neutral-300 mb-4">
            {frontmatter.description}
          </p>
          {/* Author, Date, Views, Links Row */}
          <div className="flex flex-wrap items-center text-sm text-neutral-400 gap-x-4 gap-y-2">
            <span>By {frontmatter.author}</span>
            <span className="hidden sm:inline">&bull;</span>
            <time dateTime={frontmatter.date}>{displayDate}</time>
            <span className="hidden sm:inline">&bull;</span>
            {/* Display View Count */}
            <span className="flex items-center gap-1.5">
              {" "}
              {/* Increased gap slightly */}
              <FaEye aria-hidden="true" />
              {viewCount.toLocaleString()} views
            </span>

            {/* Conditional Links */}
            {frontmatter.githubUrl && (
              <>
                <span className="hidden sm:inline">&bull;</span>
                <a
                  href={frontmatter.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <FaGithub aria-hidden="true" />
                  <span>GitHub</span> {/* Added span for potential styling */}
                </a>
              </>
            )}
            {frontmatter.websiteUrl && (
              <>
                <span className="hidden sm:inline">&bull;</span>
                <a
                  href={frontmatter.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
                  aria-label="Project Website"
                >
                  <FaLink aria-hidden="true" />
                  <span>Website</span> {/* Added span for potential styling */}
                </a>
              </>
            )}
          </div>
        </div>

        <hr className="my-8 border-neutral-700" />

        {/* Render the MDX Content */}
        <article className="prose prose-invert lg:prose-xl max-w-none">
          <BlogComponent />
        </article>
      </main>
    </>
  );
}

export const dynamicParams = false;
