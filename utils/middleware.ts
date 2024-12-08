
// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { createClient } from "../utils/supabase/server";

// // export async function middleware(req: NextRequest) {
// //   const supabase = await createClient();

// //   // セッション情報を取得
// //   const {
// //     data: { session },
// //     error,
// //   } = await supabase.auth.getSession();

// //   if (!session || error) {
// //     const redirectUrl = req.nextUrl.clone();
// //     redirectUrl.pathname = "/signin";

// //     redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

// //     return NextResponse.redirect(redirectUrl);
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/", "/todos", "/todos/:path*"],
// // };

// import { type NextRequest } from "next/server";
// import { updateSession } from "../utils/supabase/middleware";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };