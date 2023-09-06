import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshTokenServerOnly } from "./pages/api/serverFunctions/refreshToken";

export async function middleware(req: NextRequest) {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = "/login";

  const authCookie = req.cookies.get("refresh-cookie");

  if(!authCookie) 
    return NextResponse.redirect(newUrl);
  
  const headers = new Headers(req.headers);

  return await refreshTokenServerOnly({
    cookie: `refresh-cookie=${encodeURIComponent(authCookie.value)}`,
    headers
  })
    .then((data) => {
      const tokenData = data.access_token;
      headers.set("authorization", `Bearer ${tokenData}`)

      return NextResponse.next({
        request: { headers }
      });
    })
    .catch(() => {
      return NextResponse.redirect(newUrl)
    })
}

export const config = {
  matcher: [
    "/editor/:postId*",
    "/config"
  ]
}
