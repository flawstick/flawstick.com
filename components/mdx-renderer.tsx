"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import Image from "next/image"
import Link from "next/link"

interface MDXRendererProps {
  source: MDXRemoteSerializeResult
}

const components = {
  img: ({ src, alt }: { src: string; alt?: string }) => {
    return (
      <div className="my-8 overflow-hidden rounded-lg animate-fadeIn">
        {src && (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt || "Project image"}
            width={1200}
            height={630}
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
    )
  },
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    if (!href) return <span>{children}</span>

    return (
      <Link
        href={href}
        className="text-white hover:text-gray-300 underline underline-offset-4 transition-all duration-300 hover:translate-x-1"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    )
  },
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mt-12 mb-6 animate-slideIn">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mt-10 mb-4 animate-slideIn">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mt-8 mb-4 animate-slideIn">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 text-gray-300 leading-relaxed animate-fadeIn">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 my-4 text-gray-300 animate-fadeIn">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-6 my-4 text-gray-300 animate-fadeIn">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => <li className="my-2 animate-fadeIn">{children}</li>,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 my-4 italic text-gray-400 animate-fadeIn">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-900 px-1 py-0.5 rounded text-sm font-mono animate-fadeIn">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm animate-fadeIn">{children}</pre>
  ),
}

export function MDXRenderer({ source }: MDXRendererProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="animate-pulse bg-gray-900 h-96 rounded-lg"></div>
  }

  if (!source) {
    return <div className="animate-pulse bg-gray-900 h-96 rounded-lg"></div>
  }

  try {
    return (
      <div className="mdx-content">
        <MDXRemote {...source} components={components} />
      </div>
    )
  } catch (error) {
    console.error("Error rendering MDX:", error)
    return (
      <div className="p-4 border border-red-500 rounded-lg text-red-500">
        <h3 className="font-bold mb-2">Error rendering content</h3>
        <p>There was an error rendering this content. Please try again later.</p>
      </div>
    )
  }
}
