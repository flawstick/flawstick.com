"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";

interface PropsWithChildren {
  children: React.ReactNode;
  image?: string;
}

export const BlogCard: React.FC<PropsWithChildren> = ({ children, image }) => {
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="overflow-hidden relative duration-500 border-[1px] rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 hover:shadow-lg hover:shadow-emerald-200/20 hover:-translate-y-5"
    >
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="top-0 left-0 right-0 h-1/2 group-hover:h-0 transition-height transition-all ease-in-out duration-500  bg-cover bg-center z-0"
        >
          <div className="absolute z-10 bottom-0 left-0 right-0 h-1/2 group-hover:opacity-0 group-hover:h-0 duration-500 transition transition-all ease-in-out bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      )}
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
      {children}
    </div>
  );
};
