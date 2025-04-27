import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const runtime = "edge";

export async function POST(request: NextRequest) {
  let body: { slugs?: string[]; collection?: string }; // Allow optional 'collection'

  // 1. Parse request body
  try {
    body = await request.json();
  } catch (e) {
    return new NextResponse("Invalid JSON body", { status: 400 });
  }

  const slugs = body.slugs;
  const collection =
    typeof body.collection === "string" && body.collection
      ? body.collection
      : "blogs";

  // 2. Validate input slugs
  if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
    return new NextResponse("Missing or invalid 'slugs' array in body", {
      status: 400,
    });
  }

  // Optional: Basic sanitization/filtering of slugs
  const validSlugs = slugs.filter(
    (s) => typeof s === "string" && s.length > 0 && s.length < 100,
  );

  if (validSlugs.length === 0) {
    return NextResponse.json({}); // Return empty if no valid slugs remain
  }

  // 3. Construct Redis keys using the determined collection
  const keys = validSlugs.map((slug) =>
    ["pageviews", collection, slug].join(":"),
  );

  try {
    // 4. Fetch multiple keys efficiently using MGET
    const viewsArray = await redis.mget<number[]>(...keys);

    // 5. Create the response object { slug: views }
    const viewsRecord = validSlugs.reduce<Record<string, number>>(
      (acc, slug, index) => {
        acc[slug] = viewsArray[index] ?? 0;
        return acc;
      },
      {},
    );

    // 6. Return the combined results
    return NextResponse.json(viewsRecord);
  } catch (error) {
    console.error(
      `Error fetching multiple views for collection "${collection}" from Redis:`,
      error,
    );
    // Fallback: return 0 for all requested slugs on error
    const fallbackRecord = validSlugs.reduce<Record<string, number>>(
      (acc, slug) => {
        acc[slug] = 0;
        return acc;
      },
      {},
    );
    return NextResponse.json(fallbackRecord, { status: 500 });
  }
}
