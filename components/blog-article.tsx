"use client"

import { Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"

export function BlogArticle({ blog, views = 0 }) {
  return (
    <article className="p-4 md:p-8">
      <div className="flex justify-between gap-2 items-center">
        <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
          {blog.date ? (
            <time dateTime={new Date(blog.date).toISOString()}>{formatDate(blog.date)}</time>
          ) : (
            <span>SOON</span>
          )}
        </span>
        <span className="text-zinc-500 text-xs flex items-center gap-1">
          <Eye className="w-4 h-4" /> {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
        </span>
      </div>
      <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text group-hover:from-white group-hover:to-white font-display">
        {blog.title}
      </h2>
      <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">{blog.description}</p>
    </article>
  )
}
