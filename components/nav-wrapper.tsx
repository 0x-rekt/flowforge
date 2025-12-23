"use client";
import { motion } from "framer-motion";

export function NavClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a] backdrop-blur-md"
    >
      {children}
    </motion.header>
  );
}
