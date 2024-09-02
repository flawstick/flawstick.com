"use client";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

type Props = {
  blog: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
  };

  views: number;
};
export const Header: React.FC<Props> = ({ blog, views }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => {
      return {
        pathLength: 1.05,
        opacity: 1,
        scale: 1.2,
        transition: {
          pathLength: { type: "spring", duration: 0.5, bounce: 0 },
          opacity: { duration: 0.25 },
        },
      };
    },
  };

  const links: { label: string; href: string }[] = [];
  if (blog.repository) {
    links.push({
      label: "GitHub",
      href: `https://github.com/${blog.repository}`,
    });
  }
  if (blog.url) {
    links.push({
      label: "Website",
      href: blog.url,
    });
  }
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative w-full overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black, transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100  via-zinc-100/10  transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>

      <div
        className={`fixed inset-x-0 top-0 z-50 -blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/10  border-zinc-200 lg:border-transparent"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <span
              title="View counter for this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${
                isIntersecting
                  ? " text-zinc-400 hover:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900"
              } `}
            >
              <Eye className="w-5 h-5" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views,
              )}
            </span>
            <Link
              className="group inline-block duration-500 hover:scale-110"
              target="_blank"
              href="https://twitter.com/0xaionarete"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                initial="hidden"
                whileHover="visible"
                transition={{ stiffness: 100, damping: 30 }}
                width="48"
                height="48"
              >
                <motion.circle
                  cx="24"
                  cy="24"
                  r="18"
                  stroke={`${isIntersecting ? "#F4F4F5" : "#18181B"}`}
                  strokeWidth="1"
                  fill="none"
                  variants={draw}
                />
                <Twitter
                  className={`w-6 h-6 duration-200 group-hover:font-medium ${
                    isIntersecting
                      ? " text-zinc-400 group-hover:text-zinc-100"
                      : "text-zinc-600 group-hover:text-zinc-900"
                  } `}
                  x="12"
                  y="12"
                />
              </motion.svg>
            </Link>
            <Link
              className="group inline-block duration-500 hover:scale-110"
              target="_blank"
              href="https://github.com/flawstick"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                initial="hidden"
                whileHover="visible"
                transition={{ stiffness: 100, damping: 30 }}
                width="48"
                height="48"
              >
                <motion.circle
                  cx="24"
                  cy="24"
                  r="18"
                  stroke={`${isIntersecting ? "#F4F4F5" : "#18181B"}`}
                  strokeWidth="1"
                  fill="none"
                  variants={draw}
                />
                <Github
                  className={`w-6 h-6 duration-200 group-hover:font-medium ${
                    isIntersecting
                      ? " text-zinc-400 group-hover:text-zinc-100"
                      : "text-zinc-600 group-hover:text-zinc-900"
                  } `}
                  x="12"
                  y="12"
                />
              </motion.svg>
            </Link>
          </div>

          <Link
            href="/blog"
            className="group duration-200 hover:scale-110 hover:font-medium"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              initial="hidden"
              whileHover="visible"
              transition={{ stiffness: 100, damping: 30 }}
              width="48"
              height="48"
            >
              <motion.circle
                cx="24"
                cy="24"
                r="16"
                stroke={`${isIntersecting ? "#F4F4F5" : "#18181B"}`}
                strokeWidth="1"
                fill="none"
                variants={draw}
              />
              <ArrowLeft
                className={`w-6 h-6 duration-200 group-hover:font-medium ${
                  isIntersecting
                    ? " text-zinc-400 group-hover:text-zinc-100"
                    : "text-zinc-600 group-hover:text-zinc-900"
                } `}
                x="12"
                y="12"
              />
            </motion.svg>
          </Link>
        </div>
      </div>
      <div className="container z-20  mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {blog.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {blog.description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link
                  className="group"
                  target="_blank"
                  key={link.label}
                  href={link.href}
                >
                  {link.label} <span aria-hidden="true">&rarr;</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-zinc-200 group-hover:bg-zinc-50"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
