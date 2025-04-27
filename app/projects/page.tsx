import { getAllProjectsMetadata } from "@/lib/project";
import { ProjectsPageClient } from "@/components/blocks/projects"; // Import the new client component

export default async function ProjectsPage() {
  // Fetch all project metadata (includes initial views) on the server
  const allProjects = await getAllProjectsMetadata();

  // Filter only published projects before sending to client
  const publishedProjects = allProjects.filter((project) => project.published);

  return (
    // Render the client component, passing the fetched & published project data
    <ProjectsPageClient initialProjects={publishedProjects} />
  );
}
