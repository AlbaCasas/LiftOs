import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const signedIn =
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token");
  const next = signedIn ? "/athletes" : "/sign-in";
  return NextResponse.redirect(new URL(next, request.url));
}

export const config = {
  matcher: ["/", "/home"],
};
