"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500  border-zinc-800 "
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link
              href="/projects"
              className="group duration-300 text-zinc-400 hover:text-zinc-100"
            >
              Projects
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-zinc-400 group-hover:bg-zinc-100"></span>
            </Link>
            <Link
              href="/contact"
              className="group duration-300 text-zinc-400 hover:text-zinc-100"
            >
              Contact
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-zinc-400 group-hover:bg-zinc-100"></span>
            </Link>
          </div>
          <Link
            href="/"
            className="group inline-block duration-500 hover:scale-110"
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
                stroke="#F4F4F5"
                strokeWidth="1"
                fill="none"
                variants={draw}
              />
              <ArrowLeft
                className="w-6 h-6 duration-200 text-zinc-300 group-hover:text-zinc-100"
                x="12"
                y="12"
              />
            </motion.svg>
          </Link>
        </div>
      </div>
    </header>
  );
};
