import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// here public and admin routes are defined anything else is a protected route
const isPublicRoute = createRouteMatcher(["/"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isReduxPage = createRouteMatcher(["/redux-graphql(.*)"]);

export default clerkMiddleware((auth, req) => {
  const isAdminUser = !auth().getToken; // implement db check before authorizing user
  if (isAdminRoute(req) && isAdminUser) {
    return NextResponse.redirect(new URL("/admin", req.url));
  } else if (isReduxPage(req) && isAdminUser) {
    return NextResponse.redirect(new URL("/redux-graphql", req.url));
  }
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
