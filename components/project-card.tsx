"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card } from "./card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCard({ project, index, isLoaded }) {
  // Staggered animation delay based on index
  const animationDelay = `${100 + index * 100}ms`

  if (!isLoaded) {
    return (
      <div className="space-y-3" style={{ animationDelay }}>
        <Skeleton className="h-[180px] w-full rounded-xl" />
      </div>
    )
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card image={project.imageUri}>
        <div className="p-6 relative z-20">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-2 transition-transform duration-300 group-hover:translate-x-2">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              {new Date(project.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>
            {project.repository && (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                {project.repository.split("/")[1]}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
