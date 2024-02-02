import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getOrganization } from "./convex/query";
import { api } from "@/convex/_generated/api";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && auth.isPublicRoute) {
      return NextResponse.next();
    }
    if (auth.userId) {
      const organization = "";

      if (organization && req.url === "/dashboard") {
        const dashBoard = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashBoard);
      }

      if (!organization && req.nextUrl.pathname !== "/getting-started") {
        const gettingStarted = new URL("/getting-started", req.url);
        return NextResponse.redirect(gettingStarted);
      }
    }

    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
