"use client";
import CustomBtn from "@/components/custom-btn";
import { signIn } from "@/lib/auth-client";

type SocialProvider = "Google" | "GitHub";

const providerMap: Record<SocialProvider, string> = {
  Google: "google",
  GitHub: "github",
};

const SignInButton = ({
  social,
  children,
}: {
  social: SocialProvider;
  children?: React.ReactNode;
}) => {
  return (
    <CustomBtn
      text={`Continue with ${social}`}
      onClick={() => {
        signIn.social({ provider: providerMap[social], callbackURL: "/" });
      }}
      className="mt-1"
    >
      {children}
    </CustomBtn>
  );
};

export default SignInButton;
