import React from "react";
import { SignIn } from "@clerk/nextjs";
import Logo from "@/components/ui/app/Logo";
import WelcomeSection from "./_components/WelcomeSection";

const SignInPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-row">
        <WelcomeSection />
        <div>
          <SignIn appearance={{}} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
