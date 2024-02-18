"use client";
import React, { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";
import Loading from "@/components/ui/app/Loading/Loading";
import { usePathname } from "next/navigation";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const ConvexProviderWithClerkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const public_urls = ["/sign-in", "/", "/sign-in/sso-callback"];
  const pathname = usePathname();

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {public_urls.includes(pathname) ? (
          children
        ) : (
          <Authenticated>{children}</Authenticated>
        )}
        <AuthLoading>
          <Loading />
        </AuthLoading>
        {/* <Loading /> */}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexProviderWithClerkProvider;
