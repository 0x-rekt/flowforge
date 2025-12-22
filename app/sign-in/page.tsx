"use client";
import { Chrome } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign in</h1>

        <button
          onClick={() => {
            signIn.social({
              provider: "google",
              callbackURL: "/",
            });
          }}
          className="w-full flex items-center justify-center gap-3 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <Chrome className="h-5 w-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
