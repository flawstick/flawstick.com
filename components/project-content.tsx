"use client"
import ReactMarkdown from "react-markdown"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectContent({ project, isLoaded }) {
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <div className="prose prose-invert max-w-none animate-fadeIn">
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => {
            if (!src) return null
            return (
              <div className="my-8 overflow-hidden rounded-lg animate-fadeIn">
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || "Project image"}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
            )
          },
          h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 animate-slideIn">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 animate-slideIn">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 animate-slideIn">{children}</h3>,
          p: ({ children }) => <p className="my-4 text-gray-300 leading-relaxed animate-fadeIn">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 my-4 text-gray-300 animate-fadeIn">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 my-4 text-gray-300 animate-fadeIn">{children}</ol>,
          li: ({ children }) => <li className="my-2 animate-fadeIn">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-500 pl-4 my-4 italic text-gray-400 animate-fadeIn">
              {children}
            </blockquote>
          ),
        }}
      >
        {project.content}
      </ReactMarkdown>
    </div>
  )
}
