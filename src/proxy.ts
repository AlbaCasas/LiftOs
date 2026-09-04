import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hasToken =
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token");
  const pathname = request.nextUrl.pathname;
  const isRoot = pathname === "/" || pathname === "/home";
  const isAuthPage = ["/sign-in", "/sign-up"].includes(pathname);

  if (isRoot) {
    return NextResponse.redirect(
      new URL(hasToken ? "/athletes" : "/sign-in", request.url),
    );
  }
  if (!hasToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (hasToken && isAuthPage) {
    return NextResponse.redirect(new URL("/athletes", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api/auth|_next|favicon.ico).*)"],
};
