"use client";
import { motion } from "framer-motion";
import { Database, Layout, Globe, Cpu, Shield, Cloud } from "lucide-react";

const icons = [
  { component: Database, name: "Prisma" },
  { component: Layout, name: "Tldraw" },
  { component: Globe, name: "Next.js" },
  { component: Cpu, name: "Gemini AI" },
  { component: Shield, name: "Better Auth" },
  { component: Cloud, name: "Vercel" },
];

export const TechMarquee = () => {
  return (
    <div className="py-12 border-y border-white/5 bg-white/1 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex whitespace-nowrap gap-16"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center">
            {icons.map((icon) => (
              <div
                key={icon.name}
                className="flex items-center gap-3 text-zinc-500 grayscale hover:grayscale-0 transition-all"
              >
                <icon.component className="h-6 w-6" />
                <span className="text-sm font-semibold tracking-widest uppercase">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
