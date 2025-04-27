"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, Home, BookOpen, FolderDot, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items?: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({
  items,
  className,
  defaultActive = "Home",
}: NavBarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultActive);
  const [isMobile, setIsMobile] = useState(false);

  const defaultItems: NavItem[] = [
    { name: "Home", url: "/", icon: Home },
    { name: "Blog", url: "/blog", icon: BookOpen },
    { name: "Projects", url: "/projects", icon: FolderDot },
    { name: "Contact", url: "/contact", icon: Mail },
  ];

  const navItems = items || defaultItems;

  useEffect(() => {
    setMounted(true);

    // Set active tab based on current pathname
    const currentPath = pathname || "/";
    const matchingItem = navItems.find(
      (item) =>
        item.url === currentPath ||
        (item.url !== "/" && currentPath.startsWith(item.url)),
    );

    if (matchingItem) {
      setActiveTab(matchingItem.name);
    }
  }, [pathname, navItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-2 md:top-6 left-0 right-0 z-[9999]">
      <div className="flex justify-center pt-6">
        <motion.div
          className={cn(
            "flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative",
            className,
          )}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const isHovered = hoveredTab === item.name;

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => {
                  setActiveTab(item.name);
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white",
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-white/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-white/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-white/5 rounded-full blur-3xl" />

                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse-slow" />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="md:hidden relative z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>

                {isActive && !isMobile && (
                  <motion.div
                    layoutId="anime-mascot"
                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="relative w-12 h-12">
                      <motion.div
                        className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                        animate={
                          hoveredTab
                            ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, -5, 5, 0],
                                transition: {
                                  duration: 0.5,
                                  ease: "easeInOut",
                                },
                              }
                            : {
                                y: [0, -3, 0],
                                transition: {
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                },
                              }
                        }
                      >
                        <motion.div
                          className="absolute w-2 h-2 bg-black rounded-full"
                          animate={
                            hoveredTab
                              ? {
                                  scaleY: [1, 0.2, 1],
                                  transition: {
                                    duration: 0.2,
                                    times: [0, 0.5, 1],
                                  },
                                }
                              : {}
                          }
                          style={{ left: "25%", top: "40%" }}
                        />
                        <motion.div
                          className="absolute w-2 h-2 bg-black rounded-full"
                          animate={
                            hoveredTab
                              ? {
                                  scaleY: [1, 0.2, 1],
                                  transition: {
                                    duration: 0.2,
                                    times: [0, 0.5, 1],
                                  },
                                }
                              : {}
                          }
                          style={{ right: "25%", top: "40%" }}
                        />
                        <motion.div
                          className="absolute w-2 h-1.5 bg-gray-300 rounded-full"
                          animate={{
                            opacity: hoveredTab ? 0.8 : 0.6,
                          }}
                          style={{ left: "15%", top: "55%" }}
                        />
                        <motion.div
                          className="absolute w-2 h-1.5 bg-gray-300 rounded-full"
                          animate={{
                            opacity: hoveredTab ? 0.8 : 0.6,
                          }}
                          style={{ right: "15%", top: "55%" }}
                        />

                        <motion.div
                          className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                          animate={
                            hoveredTab
                              ? {
                                  scaleY: 1.5,
                                  y: -1,
                                }
                              : {
                                  scaleY: 1,
                                  y: 0,
                                }
                          }
                          style={{ left: "30%", top: "60%" }}
                        />
                        <AnimatePresence>
                          {hoveredTab && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -top-1 -right-1 w-2 h-2 text-white"
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute -top-2 left-0 w-2 h-2 text-white"
                              >
                                ✨
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                        animate={
                          hoveredTab
                            ? {
                                y: [0, -4, 0],
                                transition: {
                                  duration: 0.3,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                },
                              }
                            : {
                                y: [0, 2, 0],
                                transition: {
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                  delay: 0.5,
                                },
                              }
                        }
                      >
                        <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
