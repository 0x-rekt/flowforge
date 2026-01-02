import Hero from "@/components/Hero";
import { Features } from "@/components/Features";
import { TechMarquee } from "@/components/TechMarquee";
import { CanvasPreview } from "@/components/CanvasPreview";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col">
        <Hero />

        <TechMarquee />

        <Features />

        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-white tracking-tight italic">
            Experience the <span className="text-blue-500">Workspace</span>
          </h2>
        </div>
        <CanvasPreview />

        <footer className="py-20 border-t border-white/5 text-center">
          <p className="text-zinc-600 text-xs">
            © 2026 FlowForge. Built for the Next Generation of Architects.
          </p>
        </footer>
      </main>
    </div>
  );
}
