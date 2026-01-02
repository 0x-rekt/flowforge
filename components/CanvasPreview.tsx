"use client";

import { motion } from "framer-motion";

export const CanvasPreview = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/50 p-4 backdrop-blur-xl shadow-2xl overflow-hidden group">
        <div className="flex items-center justify-between mb-4 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            flowforge_engine_v1.0.exe
          </div>
        </div>

        <div className="aspect-video relative rounded-lg border border-white/5 bg-black/40 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center gap-6"
          >
            \{" "}
            <div className="flex items-center gap-8">
              <div className="p-4 rounded-xl border border-blue-500/50 bg-blue-500/10 text-blue-400 text-xs font-mono">
                [ User_Service ]
              </div>
              <div className="h-px w-12 bg-zinc-700 relative">
                <div className="absolute -right-1 -top-1 border-4 border-transparent border-l-zinc-700" />
              </div>
              <div className="p-4 rounded-xl border border-purple-500/50 bg-purple-500/10 text-purple-400 text-xs font-mono">
                {"Auth_Gateway"}
              </div>
            </div>
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] text-zinc-400 animate-pulse">
              AI is generating boilerplate code...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
