"use client";

import { useState, useEffect } from "react";
import { NavClientWrapper } from "./nav-wrapper";
import { NavLinks } from "./NavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  if (pathname === "/sign-in" || pathname.startsWith("/board")) return null;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Workflow", href: "/#workflow" },
  ];

  return (
    <NavClientWrapper>
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 z-[51]">
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            FlowForge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="https://github.com/0x-rekt/flowforge"
            target="_blank"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all border-l border-white/10 pl-10"
          >
            <Github size={14} />
            GitHub
          </Link>
        </nav>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <button
          className="md:hidden z-[51] p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-50 md:hidden bg-[#0a0a0a] flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-5xl font-black text-white tracking-tighter uppercase italic"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://github.com/your-repo-link"
                target="_blank"
                className="text-5xl font-black text-zinc-600 tracking-tighter uppercase italic flex items-center gap-4"
              >
                GitHub <Github size={36} />
              </Link>
              <div className="h-px w-full bg-white/5 my-4" />
              <NavLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavClientWrapper>
  );
};

export default Navbar;
