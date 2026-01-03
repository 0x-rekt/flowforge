"use client";
import { motion } from "framer-motion";

export function NavClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[5000] w-full bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
    >
      {children}
    </motion.header>
  );
}
