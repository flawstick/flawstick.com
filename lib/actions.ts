"use server"

import { Redis } from "@upstash/redis"

// Initialize Redis client using environment variables
const redis = Redis.fromEnv()

/**
 * Increments the view count for a specific project and returns the new count
 */
export async function incrementProjectView(slug: string): Promise<number> {
  try {
    const key = `pageviews:projects:${slug}`
    const newCount = await redis.incr(key)
    return newCount
  } catch (error) {
    console.error("Error incrementing view count:", error)
    return 0
  }
}

/**
 * Gets the view count for a specific project
 */
export async function getProjectViews(slug: string): Promise<number> {
  try {
    const key = `pageviews:projects:${slug}`
    const views = await redis.get<number>(key)
    return views ?? 0
  } catch (error) {
    console.error("Error getting view count:", error)
    return 0
  }
}

/**
 * Gets view counts for multiple projects at once
 */
export async function getMultipleProjectViews(slugs: string[]): Promise<Record<string, number>> {
  try {
    const keys = slugs.map((slug) => `pageviews:projects:${slug}`)
    const views = await redis.mget<number[]>(...keys)

    return slugs.reduce(
      (acc, slug, index) => {
        acc[slug] = views[index] ?? 0
        return acc
      },
      {} as Record<string, number>,
    )
  } catch (error) {
    console.error("Error getting multiple view counts:", error)
    return slugs.reduce(
      (acc, slug) => {
        acc[slug] = 0
        return acc
      },
      {} as Record<string, number>,
    )
  }
}

/**
 * Increments the view count for a specific blog post and returns the new count
 */
export async function incrementBlogView(slug: string): Promise<number> {
  try {
    const key = `pageviews:blogs:${slug}`
    const newCount = await redis.incr(key)
    return newCount
  } catch (error) {
    console.error("Error incrementing blog view count:", error)
    return 0
  }
}

/**
 * Gets the view count for a specific blog post
 */
export async function getBlogViews(slug: string): Promise<number> {
  try {
    const key = `pageviews:blogs:${slug}`
    const views = await redis.get<number>(key)
    return views ?? 0
  } catch (error) {
    console.error("Error getting blog view count:", error)
    return 0
  }
}

/**
 * Gets view counts for multiple blog posts at once
 */
export async function getMultipleBlogViews(slugs: string[]): Promise<Record<string, number>> {
  try {
    const keys = slugs.map((slug) => `pageviews:blogs:${slug}`)
    const views = await redis.mget<number[]>(...keys)

    return slugs.reduce(
      (acc, slug, index) => {
        acc[slug] = views[index] ?? 0
        return acc
      },
      {} as Record<string, number>,
    )
  } catch (error) {
    console.error("Error getting multiple blog view counts:", error)
    return slugs.reduce(
      (acc, slug) => {
        acc[slug] = 0
        return acc
      },
      {} as Record<string, number>,
    )
  }
}
