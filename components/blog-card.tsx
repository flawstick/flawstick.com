"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card } from "./card"
import { formatDate } from "@/lib/utils"

export function BlogCard({ blog, index, isLoaded }) {
  // Staggered animation delay based on index
  const animationDelay = `${100 + index * 100}ms`

  if (!isLoaded) {
    return (
      <div className="space-y-3" style={{ animationDelay }}>
        <div className="h-[180px] w-full bg-gray-800 rounded-xl animate-pulse"></div>
      </div>
    )
  }

  return (
    <Link href={`/blog/${blog.slug}`}>
      <Card>
        <div className="p-6 relative z-20">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-2 transition-transform duration-300 group-hover:translate-x-2">
              {blog.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">{blog.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{formatDate(blog.date)}</span>
            <span>{blog.author}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
