"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Database, Globe, Lock, Cpu } from "lucide-react";

export const CanvasPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="py-24 relative" id="canvas-preview">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-3 px-5 py-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-zinc-500" />
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              flowforge_live_session.sh
            </span>
          </div>
          <div className="w-12" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-125">
          <div className="lg:col-span-8 relative rounded-2xl border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center p-10">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[24px_24px]" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-10 flex flex-col items-center gap-12 w-full"
            >
              <div className="flex items-center gap-16">
                <motion.div
                  variants={itemVariants}
                  className="relative group/node"
                >
                  <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-xl opacity-0 group-hover/node:opacity-100 transition-opacity" />
                  <div className="relative p-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-md flex flex-col items-center gap-2 min-w-30">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span className="text-[10px] font-mono text-blue-300">
                      Next.js App
                    </span>
                  </div>
                </motion.div>

                <div className="h-px w-20 bg-zinc-800 relative">
                  <motion.div
                    animate={{ left: ["0%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-0.5 w-1 h-1 bg-blue-400 shadow-[0_0_8px_#60a5fa] rounded-full"
                  />
                </div>

                <motion.div
                  variants={itemVariants}
                  className="p-5 rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur-md flex flex-col items-center gap-2 min-w-30"
                >
                  <Lock className="w-5 h-5 text-zinc-400" />
                  <span className="text-[10px] font-mono text-zinc-300">
                    Auth Guard
                  </span>
                </motion.div>
              </div>

              <div className="flex items-center gap-20">
                <motion.div
                  variants={itemVariants}
                  className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-md flex flex-col items-center gap-2 min-w-35"
                >
                  <Database className="w-5 h-5 text-purple-400" />
                  <span className="text-[10px] font-mono text-purple-300">
                    Prisma / PG
                  </span>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md flex flex-col items-center gap-2 min-w-35"
                >
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-300">
                    Gemini SDK
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 animate-pulse delay-150" />
              </div>
              <span className="text-[10px] font-medium text-zinc-400">
                AI is architecting...
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/5 bg-black/60 p-5 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 text-zinc-400 border-b border-white/5 pb-3">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Output.tsx
              </span>
            </div>
            <div className="font-mono text-[11px] leading-relaxed text-zinc-500 space-y-2">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-purple-400">export const</span>{" "}
                <span className="text-blue-400">App</span> = () =&gt; {"{"}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pl-4"
              >
                <span className="text-zinc-600 italic">
                  // Initializing secure gateway
                </span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="pl-4"
              >
                <span className="text-purple-400">const</span> {"{ user }"} ={" "}
                <span className="text-yellow-400">useAuth</span>();
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="pl-4"
              >
                <span className="text-purple-400">return</span> (
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="pl-8 text-blue-300"
              >
                &lt;Dashboard user={"{user}"} /&gt;
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pl-4"
              >
                );
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                {"}"};
              </motion.p>
              <div className="w-full h-px bg-zinc-800 my-4" />
              <div className="space-y-1">
                <div className="h-2 w-full bg-zinc-800/50 rounded animate-pulse" />
                <div className="h-2 w-3/4 bg-zinc-800/50 rounded animate-pulse delay-75" />
                <div className="h-2 w-1/2 bg-zinc-800/50 rounded animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
