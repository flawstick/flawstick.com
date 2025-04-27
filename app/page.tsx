"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullText =
    "I'm building createvid.ai to solve video making with vibeproducing";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Blurred placeholder image (always visible) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/fantasy-landscape-blur.png"
          alt="Fantasy landscape placeholder"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Main background image (loads on top of placeholder) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/fantasy-landscape.png"
          alt="Fantasy landscape"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <main className="relative flex h-full w-full flex-col items-center justify-center text-white z-10">
        <div className="flex flex-col items-center justify-center text-center px-4 animate-fadeIn">
          {/* Content without card container */}
          <div className="relative p-12 max-w-2xl">
            {/* Content */}
            <div className="mb-8 w-32 h-32 relative mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <Image
                  src="/og-image.png"
                  alt="flawstick logo"
                  width={128}
                  height={128}
                  className="animate-pulse-subtle rounded-2xl"
                />
              </div>
            </div>

            {/* Title with gradient text - no shadow */}
            <h1 className="font-bold mb-8 animate-pulse-subtle text-7xl md:text-8xl bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text">
              flawstick
            </h1>

            <a
              href="https://createvid.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text text-lg font-medium hover:from-white hover:to-white/90 transition-all duration-300 mb-6 inline-block"
            >
              createvid.ai →
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
            </a>

            {/* Fixed typing container with proper height and flex layout - no cursor */}
            <div className="flex items-center justify-center min-h-[2rem]">
              <p className="group bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text text-lg font-medium inline-flex items-center">
                {typedText}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
