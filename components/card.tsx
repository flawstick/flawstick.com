"use client"

import type React from "react"
import { motion, useMotionTemplate, useSpring } from "framer-motion"

interface PropsWithChildren {
  children: React.ReactNode
  image?: string
  className?: string
}

export const Card: React.FC<PropsWithChildren> = ({ children, image, className }) => {
  const mouseX = useSpring(0, { stiffness: 300, damping: 80 }) // Reduced stiffness for smoother animation
  const mouseY = useSpring(0, { stiffness: 300, damping: 80 }) // Reduced stiffness for smoother animation

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  function onMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Reduced mask size from 240px to 200px for less intense effect
  const maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`overflow-hidden relative duration-200 border rounded-xl hover:bg-zinc-800/20 group md:gap-8 hover:border-zinc-300/50 border-zinc-600 backdrop-blur-md ${className || ""}`}
    >
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="top-0 left-0 right-0 h-1/2 group-hover:h-0 transition-height ease-in-out duration-300 bg-cover bg-center z-0"
        />
      )}
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-200 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-100 transition duration-500 group-hover:opacity-70"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay bg-gradient-radial from-white/40 to-transparent transition duration-500 group-hover:opacity-100"
          style={style}
        />
      </div>
      {children}
    </div>
  )
}
