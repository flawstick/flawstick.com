// File: lib/blog.ts (Updated)

import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

// --- Interface Update ---
export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  published: boolean;
  views?: number; // Add optional views field
  githubUrl?: string;
  websiteUrl?: string;
}

const contentDirectory = path.join(process.cwd(), "content", "blogs");

// --- Main Function Update ---
/**
 * Reads all .mdx files, imports metadata, fetches initial view counts,
 * and returns an array of combined blog metadata including views.
 */
export async function getAllBlogsMetadata(): Promise<BlogMetadata[]> {
  noStore(); // Ensure fresh data on dynamic renders/dev

  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(contentDirectory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`Blog content directory not found: ${contentDirectory}`);
    } else {
      console.error(
        `Error reading content directory: ${contentDirectory}`,
        error,
      );
    }
    return [];
  }

  const mdxFiles = fileNames.filter((file) => /\.mdx?$/.test(file));

  // 1. Get metadata from all files first
  const blogsDataPromises = mdxFiles.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    try {
      const module = await import(`@/content/blogs/${fileName}`);
      if (!module.frontmatter) {
        console.warn(`Skipping ${fileName}: Missing 'frontmatter' export.`);
        return null;
      }
      const fm = module.frontmatter;
      if (typeof fm.published !== "boolean" || !fm.title || !fm.date) {
        console.warn(
          `Skipping ${fileName}: Frontmatter missing required fields.`,
        );
        return null;
      }
      // Return metadata without views initially
      return { slug, ...fm } as Omit<BlogMetadata, "views">;
    } catch (error) {
      console.error(
        `Error importing or processing MDX file ${fileName}:`,
        error,
      );
      return null;
    }
  });

  const initialBlogsData = (await Promise.all(blogsDataPromises)).filter(
    (blog): blog is Omit<BlogMetadata, "views"> => blog !== null,
  );

  // 2. If no valid blog metadata found, return early
  if (initialBlogsData.length === 0) {
    return [];
  }

  // 3. Extract slugs from the valid metadata
  const slugsToFetchViews = initialBlogsData.map((blog) => blog.slug);

  // 4. Fetch all views concurrently using the existing function
  //    (Defaults to 'blogs' collection, change if needed: getMultipleBlogViews(slugsToFetchViews, 'your_collection'))
  const viewsRecord = await getMultipleBlogViews(slugsToFetchViews);

  // 5. Combine metadata with fetched views
  const blogsWithViews = initialBlogsData.map((blog) => ({
    ...blog,
    views: viewsRecord[blog.slug] ?? 0, // Add views count, default to 0
  }));

  return blogsWithViews;
}

// --- getBlogViews function remains the same ---
/**
 * Fetches the view count for a given slug from the API endpoint.
 * @param slug - The slug of the page (e.g., blog post).
 * @returns The view count, or 0 if fetching fails.
 */
export async function getBlogViews(slug: string): Promise<number> {
  // (Keep your existing implementation for getBlogViews)
  // Example placeholder:
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000";
    const apiUrl = `${siteUrl}/api/views/${slug}`; // Assuming single view endpoint exists
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      return 0;
    }
    const data = await res.json();
    return Number(data.views ?? 0);
  } catch (error) {
    return 0;
  }
}

// --- getMultipleBlogViews function remains the same ---
/**
 * Fetches view counts for multiple slugs efficiently using a single API call.
 * Allows specifying the collection (e.g., 'blogs', 'projects').
 * @param slugs - An array of page slugs.
 * @param collection - The collection name (defaults to 'blogs').
 * @returns A Promise resolving to a Record mapping slugs to their view counts.
 */
export async function getMultipleBlogViews(
  slugs: string[],
  collection: string = "blogs",
): Promise<Record<string, number>> {
  // (Keep your existing implementation for getMultipleBlogViews using POST /api/views)
  if (!slugs || slugs.length === 0) {
    return {};
  }
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000";
    const apiUrl = `${siteUrl}/api/views`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs, collection }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed fetch: ${res.status}`);
    }
    const data = await res.json();
    return data as Record<string, number>;
  } catch (error) {
    console.error(
      `Error in getMultipleBlogViews fetch for collection "${collection}":`,
      error,
    );
    return slugs.reduce<Record<string, number>>((acc, slug) => {
      acc[slug] = 0;
      return acc;
    }, {}); // Fallback
  }
}
