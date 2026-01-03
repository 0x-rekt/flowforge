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
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 transition-all ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link href="/" className="z-[51]">
          <span className="text-lg font-black tracking-tight text-white italic uppercase">
            FlowForge
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="https://github.com/0x-rekt/flowforge"
            target="_blank"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white border-l border-white/10 pl-10"
          >
            <Github size={14} />
            GitHub
          </Link>
        </nav>

        <div className="hidden lg:block">
          <NavLinks />
        </div>

        <button
          className="lg:hidden z-[51] p-2 text-white/70 hover:text-white"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-14 z-40 lg:hidden bg-[#0a0a0a] border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-semibold text-white tracking-tight"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="https://github.com/0x-rekt/flowforge"
                target="_blank"
                className="flex items-center gap-3 text-lg font-medium text-zinc-400"
              >
                <Github size={18} /> GitHub
              </Link>

              <div className="h-px w-full bg-white/10 my-4" />

              <NavLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavClientWrapper>
  );
};

export default Navbar;
