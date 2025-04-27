import { getAllBlogsMetadata } from "@/lib/blog";
import { BlogPageClient } from "@/components/blocks/blogs";

export default async function BlogPage() {
  // Fetch all blog metadata on the server
  const allBlogs = await getAllBlogsMetadata();

  // Filter only published blogs before sending to client
  const publishedBlogs = allBlogs.filter((blog) => blog.published);

  return <BlogPageClient initialBlogs={publishedBlogs} />;
}
