"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import CustomBtn from "@/components/custom-btn";
import LogoutButton from "./logout-button";

export function NavLinks() {
  const { data: session, isPending } = useSession();

  if (isPending)
    return <div className="h-10 w-24 animate-pulse bg-white/5 rounded-xl" />;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4">
      {!session ? (
        <Link href="/sign-in" className="w-full md:w-auto">
          <CustomBtn
            text="Sign in"
            className="w-full md:px-6 py-2 bg-white text-black border-none"
          />
        </Link>
      ) : (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 w-full">
          <Link href="/dashboard" className="w-full md:w-auto">
            <CustomBtn
              text="Dashboard"
              className="w-full md:w-auto border-white/10 bg-white/5 hover:bg-white/10"
            />
          </Link>

          <LogoutButton />

          {session.user.image && (
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 hidden md:block shrink-0">
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
