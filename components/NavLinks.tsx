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
    <div className="flex items-center gap-4">
      {!session ? (
        <Link href="/sign-in">
          <CustomBtn text="Sign in" className="px-6 py-2" />
        </Link>
      ) : (
        <div className="flex items-center gap-4 animate-in fade-in duration-300">
          <Link href="/dashboard">
            <CustomBtn
              text="Dashboard"
              className="border-none bg-transparent hover:bg-white/5 px-4 py-2"
            />
          </Link>

          <LogoutButton />

          {session.user.image && (
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 shrink-0">
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
