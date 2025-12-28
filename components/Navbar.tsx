"use client";

import { useState } from "react";
import { NavClientWrapper } from "./nav-wrapper";
import { NavLinks } from "./NavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/sign-in" || pathname.startsWith(`/board/`)) return null;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <NavClientWrapper>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 z-50">
          <span className="text-xl font-bold tracking-tight text-white">
            FlowForge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <Button
          className="md:hidden z-50 p-2 text-white/70 hover:text-white cursor-pointer bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0a0a0a] overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/50 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5">
                <NavLinks />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavClientWrapper>
  );
};

export default Navbar;
