import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminMatch = pathname.match(/^\/(pt|en)\/admin(\/.*)?$/);
  const isPublicAdminPage = pathname.match(
    /^\/(pt|en)\/admin\/(login|cadastro)\/?$/
  );

  if (adminMatch && !isPublicAdminPage) {
    const session = request.cookies.get("admin_session")?.value;

    if (session !== "authenticated") {
      const locale = adminMatch[1];

      return NextResponse.redirect(
        new URL(`/${locale}/admin/login`, request.url)
      );
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
};
