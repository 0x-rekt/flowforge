"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Code, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI Idea-to-Diagram",
    description:
      "Convert natural language prompts into complex system architectures instantly.",
    icon: <Sparkles className="h-6 w-6 text-zinc-100" />,
    className: "md:col-span-2",
  },
  {
    title: "Real-time Sync",
    description: "Multi-user editing with low-latency CRDT synchronization.",
    icon: <Users className="h-6 w-6 text-zinc-100" />,
    className: "md:col-span-1",
  },
  {
    title: "Diagram-to-Code",
    description:
      "Generate production-ready React or Node.js boilerplate from your visuals.",
    icon: <Code className="h-6 w-6 text-zinc-100" />,
    className: "md:col-span-1",
  },
  {
    title: "Contextual AI Chat",
    description:
      "An AI assistant that lives inside your board and understands your diagram's context.",
    icon: <Zap className="h-6 w-6 text-zinc-100" />,
    className: "md:col-span-2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Engineered for <span className="text-zinc-500">Speed.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Everything you need to go from a rough concept to a technical
            specification in minutes.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/8 hover:border-white/20",
                feature.className
              )}
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10 space-y-4">
                <div className="h-12 w-12 rounded-lg border border-white/10 bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
