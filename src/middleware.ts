import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🔥 Middleware called for:", req.nextUrl.pathname);
  
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup');
  const isProtectedPage = req.nextUrl.pathname.startsWith('/dashboard') ||
                         req.nextUrl.pathname.startsWith('/upload') ||
                         req.nextUrl.pathname.startsWith('/library') ||
                         req.nextUrl.pathname.startsWith('/settings');

  console.log("📍 Page type:", { isAuthPage, isProtectedPage });

  if (req.nextUrl.pathname.startsWith('/test-auth') || 
      req.nextUrl.pathname.startsWith('/auth/callback')) {
    console.log("⏭️ Skipping middleware for test/callback page");
    return response;
  }

  const hasSupabaseConfig = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log("🔧 Supabase config:", { 
    hasSupabaseConfig,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + "...",
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });

  if (!hasSupabaseConfig) {
    console.log("❌ Missing Supabase configuration");
    if (isProtectedPage) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return response;
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = req.cookies.get(name)?.value;
            console.log(`🍪 Getting cookie ${name}:`, cookie ? "exists" : "missing");
            return cookie;
          },
          set(name: string, value: string, options: any) {
            console.log(`🍪 Setting cookie ${name}`);
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            console.log(`🍪 Removing cookie ${name}`);
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    await supabase.auth.getUser();

    const { data: { session }, error } = await supabase.auth.getSession();
 
    if (error) {
      console.error("❌ Supabase session error:", error);
    }

    if (session && isAuthPage) {
      console.log("🔄 Redirecting authenticated user from auth page to dashboard");
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!session && isProtectedPage) {
      console.log("⚠️ No session found for protected page, but allowing client-side to handle");
      console.log("🚫 MIDDLEWARE PROTECTION TEMPORARILY RELAXED FOR DEBUGGING");
      return response;
    }

    console.log("✅ Allowing access to:", req.nextUrl.pathname);
    return response;
  } catch (error) {
    console.error('❌ Middleware error:', error);
    console.log("🔧 Middleware error - letting client-side handle protection");
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 