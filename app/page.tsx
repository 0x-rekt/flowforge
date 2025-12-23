import Hero from "@/components/Hero";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
