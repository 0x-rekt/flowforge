import Link from "next/link";
import { AuthFadeIn } from "./auth-fade-in";
import CustomBtn from "./custom-btn";
import { ArrowRight, Sparkles, Command } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Hero = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <AuthFadeIn>
        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
          <div className="mb-8 flex justify-center animate-bounce-subtle">
            <div className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-white/10">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-blue-200">
                Engine v2.0 is live
              </span>
            </div>
          </div>

          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6">
              Design{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
                Fast.
              </span>{" "}
              <br />
              Ship <span className="text-blue-500 italic">Faster.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-zinc-400 font-medium leading-relaxed mb-10">
              The AI-native whiteboard that understands engineering workflows.
              Draft your system architecture and watch FlowForge generate
              production-ready{" "}
              <span className="text-white">React & Node.js</span> code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link
              href={session?.user ? "/dashboard" : "/sign-in"}
              className="w-full sm:w-auto"
            >
              <CustomBtn
                text="Start Architecting"
                className="group px-8 py-5 bg-white text-black hover:bg-zinc-200 border-none rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </CustomBtn>
            </Link>

            <Link href="/#features" className="w-full sm:w-auto">
              <CustomBtn
                text="See How it Works"
                className="px-8 py-5 bg-transparent border-white/10 hover:bg-white/5 rounded-2xl backdrop-blur-sm"
              >
                <Command className="h-4 w-4 text-zinc-500" />
              </CustomBtn>
            </Link>
          </div>

          <div className="mt-24 w-full max-w-4xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-24 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-3xl flex items-center justify-center">
              <div className="flex items-center gap-12 overflow-hidden opacity-40">
                <span className="text-xs font-mono text-zinc-500 animate-pulse">
                  # SYNCING_REALTIME...
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  # ANALYZING_SHAPES...
                </span>
                <span className="text-xs font-mono text-zinc-500 animate-pulse">
                  # EXPORTING_BOILERPLATE...
                </span>
              </div>
            </div>
          </div>
        </div>
      </AuthFadeIn>
    </section>
  );
};

export default Hero;
