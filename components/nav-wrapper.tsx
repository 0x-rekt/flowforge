"use client";
import { motion } from "framer-motion";

export function NavClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[5000] w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl"
    >
      {children}
    </motion.header>
  );
}
