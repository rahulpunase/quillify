import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ConvexProviderWithClerkProvider from "@/lib/providers/ConvexProviderWithClerk";
import { Toaster } from "@/components/ui/sonner";
import AuthenticateAndCreateUser from "@/components/ui/app/AuthenticateAndCreateUser";
import { Suspense } from "react";

const inter = Open_Sans({
  preload: false,
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/quillify-logo.png" />
      </head>
      <body className={`${inter.className} bg-neutral-300`}>
        <Suspense>
          <ConvexProviderWithClerkProvider>
            <AuthenticateAndCreateUser />
            <main className="h-full">{children}</main>
            <Toaster />
          </ConvexProviderWithClerkProvider>
        </Suspense>
      </body>
    </html>
  );
}
