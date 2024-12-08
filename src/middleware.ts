import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Supabaseクライアントを作成
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ログインしていない場合、signin または signup 以外のページにアクセスしようとした場合
  if (!session) {
    // /signin または /signup にリダイレクト
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ログインしている場合、そのままリクエストを進める
  return NextResponse.next();
}

// `middleware.ts`をどのパスに適用するかを指定
export const config = {
  matcher: ["/((?!signin|signup).*)"], // /signin と /signup を除くすべてのページに適用
};
