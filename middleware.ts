import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  // "/organization(.*)",
  "/",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  if (auth().userId) {
    if (auth().orgId && isProtectedRoute(req)) {
      return NextResponse.redirect(
        new URL(`/organization/${auth().orgId}`, req.url)
      );
    }

    if (!auth().orgId && isProtectedRoute(req)) {
      return NextResponse.redirect(new URL("/select-org", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
