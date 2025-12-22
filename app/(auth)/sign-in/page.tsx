import { Chrome, Github } from "lucide-react";
import SignInButton from "@/components/signin-button";
import { AuthFadeIn } from "@/components/auth-fade-in";

export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-100 space-y-8">
      <AuthFadeIn>
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-400">
            Choose your preferred sign-in method
          </p>
        </div>

        <div className="space-y-3">
          <SignInButton social="Google">
            <Chrome className="h-5 w-5 text-zinc-100" />
          </SignInButton>

          <SignInButton social="GitHub">
            <Github className="h-5 w-5 text-zinc-100" />
          </SignInButton>
        </div>

        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] px-2 text-zinc-500">
              Secure Authentication
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </AuthFadeIn>
    </div>
  );
}
