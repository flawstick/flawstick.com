import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const runtime = "edge"; // Use edge runtime for speed

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // 1. Validate slug from path parameter
  if (!slug) {
    return new NextResponse("Slug parameter is required", { status: 400 });
  }

  // 2. Get collection from query parameter, default to 'blogs'
  const searchParams = request.nextUrl.searchParams;
  const collectionParam = searchParams.get("col"); // Get 'col' query param
  // Use provided collection if it's a non-empty string, otherwise default to 'blogs'
  const collection =
    collectionParam &&
    typeof collectionParam === "string" &&
    collectionParam.trim()
      ? collectionParam.trim()
      : "blogs";

  // Optional: Validate collection name if needed (e.g., allow only 'blogs' or 'projects')
  // const allowedCollections = ['blogs', 'projects'];
  // if (!allowedCollections.includes(collection)) {
  //    return new NextResponse(`Invalid collection specified: ${collection}`, { status: 400 });
  // }

  // 3. Construct Redis key using the determined collection
  const redisKey = ["pageviews", collection, slug].join(":");

  // 4. Fetch views from Redis
  try {
    const views = await redis.get<number>(redisKey);

    // Return views, defaulting to 0 if the key doesn't exist (null)
    return NextResponse.json({ views: views ?? 0 });
  } catch (error) {
    console.error(
      `Error fetching views for slug "${slug}" (collection: "${collection}") from Redis:`,
      error,
    );
    // Return 0 views on error, but indicate server error status
    return NextResponse.json(
      { views: 0, error: "Failed to fetch views" },
      { status: 500 },
    );
  }
}
