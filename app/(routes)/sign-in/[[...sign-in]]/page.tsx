import React from "react";
import { SignIn } from "@clerk/nextjs";
import WelcomeSection from "./_components/WelcomeSection";
import { headers } from "next/headers";

const SignInPage = () => {
  const head = headers();
  // for (let [key, value] of head) {
  //   console.log(key + " :=: " + value);
  // }
  // head.forEach((i) => {
  //   console.log("-----");
  //   console.log(i);
  // });
  let redirectUrl = "";
  try {
    const url = new URL(head.get("referer") ?? "");
    redirectUrl = url.searchParams.get("redirect_url");
  } catch (e) {}

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-row">
        <WelcomeSection />
        <div>
          <SignIn redirectUrl={redirectUrl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
