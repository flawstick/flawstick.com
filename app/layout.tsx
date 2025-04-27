import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AnimeNavBar } from "@/components/anime-nav-bar"

const inter = Inter({ subsets: ["latin"] })

// Metadata for the site
export const metadata = {
  title: "flawstick",
  description: "Building createvid.ai to solve video making with vibeproducing",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "flawstick",
    description: "Building createvid.ai to solve video making with vibeproducing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "flawstick",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "flawstick",
    description: "Building createvid.ai to solve video making with vibeproducing",
    images: ["/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <AnimeNavBar />
        <div className="page-transition-wrapper">{children}</div>
      </body>
    </html>
  )
}
