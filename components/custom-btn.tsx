"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomBtnProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const CustomBtn = ({ text, onClick, children, className }: CustomBtnProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 active:bg-white/15 hover:cursor-pointer",
        className
      )}
    >
      {children}
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/10" />
      </div>
    </motion.button>
  );
};

export default CustomBtn;
