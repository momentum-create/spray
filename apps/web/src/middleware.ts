import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { isDawnRoute } from "@/lib/inbound/flags";
import { resolveLegacyPath } from "@/lib/legacy-paths";

function preferredLocale(request: NextRequest): (typeof locales)[number] {
  const header = request.headers.get("accept-language") ?? "";
  if (/\ben\b/i.test(header) && !/\bja\b/i.test(header)) return "en";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const legacyTarget = resolveLegacyPath(pathname);
  if (legacyTarget) {
    const locale = preferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${legacyTarget}`;
    return NextResponse.redirect(url, 301);
  }

  const segment = pathname.split("/")[1];
  if (isLocale(segment)) {
    const pathAfterLocale = pathname.slice(`/${segment}`.length) || "/";
    const legacyUnderLocale = resolveLegacyPath(pathAfterLocale);
    if (legacyUnderLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${segment}${legacyUnderLocale}`;
      return NextResponse.redirect(url, 301);
    }

    const requestHeaders = new Headers(request.headers);
    if (isDawnRoute(pathname)) {
      requestHeaders.set("x-dawn-layout", "1");
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
