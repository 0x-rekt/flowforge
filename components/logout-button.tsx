"use client";

import { useState } from "react";
import CustomBtn from "@/components/custom-btn";
import { signOut } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomBtn
      text={isLoading ? "Logging out..." : "Log out"}
      onClick={handleLogout}
      className={isLoading ? "opacity-70 pointer-events-none" : ""}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
    </CustomBtn>
  );
};

export default LogoutButton;
