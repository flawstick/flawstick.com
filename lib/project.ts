import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

// --- Interface for Project Metadata (Updated) ---
export interface ProjectMetadata {
  slug: string;
  title: string;
  description: string;
  date: string; // Date of project completion or last update
  published: boolean; // Use to show/hide projects
  views?: number; // Initial views fetched server-side
  url?: string; // Link to the live project website (replaces websiteUrl)
  repository?: string; // Link to the code repository (replaces githubUrl)
  // Add other project-specific fields if needed
}

// --- Path to Project Content ---
const contentDirectory = path.join(process.cwd(), "content", "projects");

// --- Function to Get All Project Metadata + Views ---
/**
 * Reads all project .mdx files, imports metadata, fetches initial view counts,
 * and returns an array of combined project metadata including views.
 */
export async function getAllProjectsMetadata(): Promise<ProjectMetadata[]> {
  noStore(); // Ensure fresh data on dynamic renders/dev

  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(contentDirectory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`Project content directory not found: ${contentDirectory}`);
    } else {
      console.error(
        `Error reading content directory: ${contentDirectory}`,
        error,
      );
    }
    return [];
  }

  const mdxFiles = fileNames.filter((file) => /\.mdx?$/.test(file));

  // 1. Get metadata from all project files first
  const projectsDataPromises = mdxFiles.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    try {
      const module = await import(`@/content/projects/${fileName}`);
      if (!module.frontmatter) {
        console.warn(`Skipping ${fileName}: Missing 'frontmatter' export.`);
        return null;
      }
      const fm = module.frontmatter;

      // Validate required project fields (published, title, date)
      if (typeof fm.published !== "boolean" || !fm.title || !fm.date) {
        console.warn(
          `Skipping ${fileName}: Project frontmatter missing required fields (published, title, date).`,
        );
        return null;
      }

      // Map frontmatter fields to the interface, including renames
      const metadata: Omit<ProjectMetadata, "views"> = {
        slug: slug,
        title: fm.title,
        description: fm.description,
        date: fm.date,
        published: fm.published,
        url: fm.url, // Map 'url' from frontmatter
        repository: fm.repository, // Map 'repository' from frontmatter
      };

      return metadata;
    } catch (error) {
      console.error(
        `Error importing or processing project MDX file ${fileName}:`,
        error,
      );
      return null;
    }
  });

  const initialProjectsData = (await Promise.all(projectsDataPromises)).filter(
    (project): project is Omit<ProjectMetadata, "views"> => project !== null,
  );

  // 2. If no valid project metadata found, return early
  if (initialProjectsData.length === 0) {
    return [];
  }

  // 3. Extract slugs from the valid metadata
  const slugsToFetchViews = initialProjectsData.map((project) => project.slug);

  // 4. Fetch all views concurrently for the 'projects' collection
  const viewsRecord = await getMultipleViews(slugsToFetchViews, "projects");

  // 5. Combine metadata with fetched views
  const projectsWithViews = initialProjectsData.map((project) => ({
    ...project,
    views: viewsRecord[project.slug] ?? 0, // Add views count, default to 0
  }));

  return projectsWithViews;
}

// --- Function to fetch multiple views ---
/**
 * Fetches view counts for multiple slugs efficiently using a single API call.
 * @param slugs - An array of page slugs.
 * @param collection - The collection name (e.g., 'blogs', 'projects').
 * @returns A Promise resolving to a Record mapping slugs to their view counts.
 */
export async function getMultipleViews(
  slugs: string[],
  collection: string,
): Promise<Record<string, number>> {
  if (!slugs || slugs.length === 0) {
    return {};
  }
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000";
    const apiUrl = `${siteUrl}/api/views`; // Target the POST endpoint

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs, collection }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Failed to fetch multiple views for collection "${collection}" (${res.status}): ${errorText}`,
      );
      return slugs.reduce<Record<string, number>>((acc, slug) => {
        acc[slug] = 0;
        return acc;
      }, {}); // Fallback
    }
    const data = await res.json();
    return data as Record<string, number>;
  } catch (error) {
    console.error(
      `Error in getMultipleViews fetch for collection "${collection}":`,
      error,
    );
    return slugs.reduce<Record<string, number>>((acc, slug) => {
      acc[slug] = 0;
      return acc;
    }, {}); // Fallback
  }
}

// --- Function for single view (Optional) ---
/**
 * Fetches the view count for a single slug from the API endpoint.
 * @param slug - The slug of the page.
 * @param collection - The collection name (e.g., 'blogs', 'projects').
 * @returns The view count, or 0 if fetching fails.
 */
export async function getSingleView(
  slug: string,
  collection: string,
): Promise<number> {
  // Example placeholder - Adapt if you have a GET endpoint for single views
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000";
    // Adapt this URL if your single-view endpoint structure is different
    const apiUrl = `${siteUrl}/api/views/${slug}?col=projects`; // Hypothetical endpoint
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
