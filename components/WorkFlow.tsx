"use client";

import { motion } from "framer-motion";
import { MessageSquare, Layout, FileCode } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Step 01",
    title: "Prompt",
    desc: "Describe your system architecture in plain English through the AI Architect panel.",
    color: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    icon: <Layout className="w-5 h-5" />,
    label: "Step 02",
    title: "Visualize",
    desc: "AI instantly generates an editable tldraw diagram of your architecture.",
    color: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    icon: <FileCode className="w-5 h-5" />,
    label: "Step 03",
    title: "Synthesize",
    desc: "Generate production-ready boilerplate code directly from your visual components.",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
  },
];

export const Workflow = () => {
  return (
    <section className="py-24 relative" id="workflow">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight italic">
            How it <span className="text-blue-500">Works.</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm">
            A seamless bridge from conceptual design to technical
            implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-colors group flex flex-col items-center text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6 block">
                {step.label}
              </span>
              <div
                className={`h-14 w-14 rounded-2xl border ${step.border} bg-zinc-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <div className={step.color}>{step.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 italic uppercase tracking-tighter">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
