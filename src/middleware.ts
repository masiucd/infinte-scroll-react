import {type NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    let authCookie = request.cookies.get("auth");
    if (authCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    let authCookie = request.cookies.get("auth");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
