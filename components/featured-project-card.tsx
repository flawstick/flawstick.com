"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card } from "./card"
import { Skeleton } from "@/components/ui/skeleton"

interface FeaturedProjectProps {
  project: any
  isLoaded: boolean
  isPrimary?: boolean
}

export function FeaturedProjectCard({ project, isLoaded, isPrimary = false }: FeaturedProjectProps) {
  if (!isLoaded) {
    return (
      <div className="space-y-3 w-full">
        <Skeleton className={`${isPrimary ? "h-[400px]" : "h-[190px]"} w-full rounded-xl`} />
      </div>
    )
  }

  return (
    <Link href={`/projects/${project.slug}`} className="h-full">
      <Card image={project.imageUri} className="h-full">
        <div className={`${isPrimary ? "p-8" : "p-6"} relative z-20`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">Featured</span>
                <span className="w-2 h-2 rounded-full bg-white/60"></span>
                <span className="text-xs text-white/60">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <h3
                className={`${
                  isPrimary ? "text-2xl" : "text-xl"
                } font-bold mb-2 transition-transform duration-300 group-hover:translate-x-2`}
              >
                {project.title}
              </h3>
            </div>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>

          <p className={`text-gray-400 ${isPrimary ? "mb-6" : "mb-4"} ${isPrimary ? "" : "line-clamp-2"}`}>
            {project.description}
          </p>

          {isPrimary && (
            <div className="flex justify-between items-center text-sm text-gray-500">
              {project.repository && (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                  {project.repository.split("/")[1]}
                </span>
              )}
              {project.url && (
                <span className="text-white/60 text-sm hover:text-white transition-colors">
                  {project.url.replace(/(^\w+:|^)\/\//, "")}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
