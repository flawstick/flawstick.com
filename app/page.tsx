import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-[#191D32] via-[#282F44]/20 to-[#191D32]">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm group duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
              <span className="block mt-1 rounded-full max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-zinc-500 group-hover:bg-[#6D3B47]"></span>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={500}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-[#6D3B47] cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        flawstick
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I'm building{" "}
          <Link
            target="_blank"
            href="https://grubapp.co"
            className="underline duration-500 hover:text-zinc-300 hover:decoration-[#6D3B47]"
          >
            Grub
          </Link>{" "}
          to solve meal ordering with co-worders
        </h2>
      </div>
    </div>
  );
}
