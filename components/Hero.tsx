import Link from "next/link";
import { AuthFadeIn } from "./auth-fade-in";
import CustomBtn from "./custom-btn";
import { ArrowRight, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Hero = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <AuthFadeIn>
        <div className="container mx-auto px-6 text-center space-y-8">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span>AI-Powered Diagramming is here</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Ideas into <span className="text-zinc-500">Diagrams</span> <br />
              Diagrams into <span className="text-blue-500">Code</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-zinc-400 font-medium">
              The real-time collaborative platform that understands your
              architecture. Built for teams who want to move from concept to
              boilerplate in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={session?.user ? "/dashboard" : "/sign-in"}
              className="w-full sm:w-auto"
            >
              <CustomBtn
                text="Start Building"
                className="px-6 py-4 bg-white text-black hover:bg-zinc-200 border-none transition-transform"
              >
                <ArrowRight className="h-5 w-5" />
              </CustomBtn>
            </Link>

            <Link href="/#features" className="w-full sm:w-auto">
              <CustomBtn
                text="View Features"
                className="px-6 py-4 bg-transparent border-white/10 hover:bg-white/5"
              />
            </Link>
          </div>
        </div>
      </AuthFadeIn>
    </section>
  );
};

export default Hero;
