"use client";
import React, { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";
import Loading from "@/components/ui/app/Loading/Loading";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const ConvexProviderWithClerkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <ClerkProvider>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
      <AuthLoading>
        <Loading />
      </AuthLoading>
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ConvexProviderWithClerkProvider;
