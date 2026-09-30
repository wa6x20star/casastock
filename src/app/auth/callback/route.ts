import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (url.searchParams.get("error")) {
    return NextResponse.redirect(new URL("/entrar?mensagem=link-expirado", url.origin));
  }

  if (code) {
    const store = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => store.getAll(),
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options));
          },
        },
      },
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL("/entrar?mensagem=link-expirado", url.origin));
    }
  }

  return NextResponse.redirect(new URL("/criar-casa", url.origin));
}
