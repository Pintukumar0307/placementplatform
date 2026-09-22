import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isPlatformRoute = req.nextUrl.pathname.startsWith("/platform-manager");

    if (isAuthPage) {
      if (isAuth) {
        if (token.role === "PLATFORM_MANAGER") return NextResponse.redirect(new URL("/platform-manager", req.url));
        if (token.role === "COLLEGE_ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        return NextResponse.redirect(new URL("/", req.url));
      }
      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isPlatformRoute && token.role !== "PLATFORM_MANAGER") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAdminRoute && token.role !== "COLLEGE_ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If a PLATFORM_MANAGER or COLLEGE_ADMIN tries to go to student route (/)
    if (req.nextUrl.pathname === "/") {
      if (token.role === "PLATFORM_MANAGER") return NextResponse.redirect(new URL("/platform-manager", req.url));
      if (token.role === "COLLEGE_ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true, // We handle authorization in the middleware function
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
