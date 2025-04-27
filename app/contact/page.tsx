"use client"
import { useEffect, useState } from "react"
import { Github, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/card"

const socials = [
  {
    icon: <Twitter size={24} />,
    href: "https://twitter.com/flawebeinsane",
    label: "X",
    handle: "@flawebeinsane",
  },
  {
    icon: <Mail size={24} />,
    href: "mailto:dev@flawstick.com",
    label: "Email",
    handle: "dev@flawstick.com",
  },
  {
    icon: <Github size={24} />,
    href: "https://github.com/flawstick",
    label: "Github",
    handle: "flawstick",
  },
]

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Set isLoaded immediately to ensure backdrop blur loads right away
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      {/* Blurred placeholder image (always visible) */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <Image
          src="/images/mountain-meadow-blur.png"
          alt="Mountain meadow placeholder"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Main background image (loads on top of placeholder) */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/images/mountain-meadow.png"
          alt="Mountain valley with wildflowers"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto max-w-5xl pt-24 sm:pt-32 md:pt-16 pb-16 px-4 relative z-10">
        <h1 className="text-3xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text">
          Contact
        </h1>
        <div
          className={`grid w-full grid-cols-1 gap-6 mx-auto sm:grid-cols-3 lg:gap-10 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {socials.map((s, index) => (
            <Card key={s.label}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 relative flex flex-col items-center gap-6 duration-700 group md:gap-8 md:py-12 md:px-10 h-full"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-16 h-16 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200">
                  {s.icon}
                </span>
                <div className="z-10 flex flex-col items-center">
                  <span className="text-xl font-medium duration-150 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-2 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
