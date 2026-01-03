"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import CustomBtn from "@/components/custom-btn";
import LogoutButton from "./logout-button";

export function NavLinks() {
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div className="h-10 w-full md:w-24 animate-pulse bg-white/5 rounded-xl" />
    );

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {!session ? (
        <Link href="/sign-in" className="w-full md:w-auto">
          <CustomBtn
            text="Sign in"
            className="w-full px-6 py-3 bg-white text-black rounded-xl"
          />
        </Link>
      ) : (
        <>
          <Link href="/dashboard" className="w-full md:w-auto">
            <CustomBtn
              text="Dashboard"
              className="w-full md:w-auto px-6 py-3 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl"
            />
          </Link>

          <LogoutButton />

          {session.user.image && (
            <div className="relative h-10 w-24 rounded-xl overflow-hidden border border-white/10 hidden md:block">
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
