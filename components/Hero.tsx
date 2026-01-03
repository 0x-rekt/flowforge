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
    <section className="relative min-h-[85vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-blue-600/10 blur-[110px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-purple-600/10 blur-[90px] rounded-full" />
      </div>

      <AuthFadeIn>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <div className="mt-12 mb-6 sm:mt-0 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Engine v1.0 is live
              </span>
            </div>
          </div>

          <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-5">
            <span className="block text-zinc-300 font-semibold">
              Design fast.
            </span>
            <span className="block text-blue-500 italic">Ship faster.</span>
          </h1>

          <p className="mx-auto max-w-md sm:max-w-xl text-sm sm:text-lg text-zinc-400 leading-relaxed mb-8">
            The AI-native whiteboard that understands engineering workflows.
            Draft architecture and generate production-ready{" "}
            <span className="text-white">React & Node.js</span> code.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Link href={session?.user ? "/dashboard" : "/sign-in"}>
              <CustomBtn
                text="Start Architecting"
                className="
                  group
                  w-full
                  px-6
                  py-3.5
                  bg-white
                  text-black
                  rounded-xl
                  shadow-sm
                  hover:bg-zinc-200
                  active:scale-95
                "
              >
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </CustomBtn>
            </Link>

            <Link href="/#features">
              <CustomBtn
                text="See How it Works"
                className="
                  group
                  w-full
                  px-6
                  py-3
                  bg-transparent
                  text-zinc-300
                  border border-white/10
                  rounded-xl
                  hover:bg-white/5
                "
              >
                <Command className="h-4 w-4 text-zinc-500" />
              </CustomBtn>
            </Link>
          </div>

          <div className="mt-14 sm:mt-20 w-full max-w-md sm:max-w-3xl">
            <div className="h-14 sm:h-20 rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl flex items-center justify-center">
              <div className="flex gap-6 text-[10px] sm:text-xs font-mono text-zinc-500 opacity-50">
                <span># SYNCING_REALTIME...</span>
                <span># ANALYZING_SHAPES...</span>
                <span className="hidden sm:block">
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
