"use client";

import CustomBtn from "@/components/custom-btn";
import { signOut } from "@/lib/auth-client";

const LogoutButton = () => {
  return (
    <CustomBtn
      text="log out"
      onClick={() => {
        signOut();
      }}
    />
  );
};

export default LogoutButton;
