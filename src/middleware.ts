// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "universal-cookie";

export function middleware(request: NextRequest) {
  const cookies = new Cookies();
  const token = request.cookies.get("token"); // Ambil token dari cookie

  // Cek apakah path yang diminta adalah salah satu path yang dilindungi
  const protectedPaths = ["/profile", "/cart"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    // Jika path dilindungi dan tidak ada token, redirect ke halaman login
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Jika ada token atau path tidak dilindungi, lanjutkan permintaan
  return NextResponse.next();
}

// Tentukan path mana saja yang akan menggunakan middleware ini
export const config = {
  matcher: ["/profile/:path*", "/dashboard", "/settings", "/cart/:path*"],
};
