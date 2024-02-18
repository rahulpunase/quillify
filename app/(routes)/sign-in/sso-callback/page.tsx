import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import React from "react";

const SSOCallback = () => {
  return <AuthenticateWithRedirectCallback redirectUrl="/sign-in" />;
};

export default SSOCallback;
