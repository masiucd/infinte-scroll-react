import {type NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    let authCookie = request.cookies.get("auth");
    if (authCookie) {
      console.log("authCookie", authCookie);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}
