import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CURRENT_PATH_IN_HEADER } from "@/lib/utils/constants";

export function middleware(request: NextRequest) {
  if (request.method === "GET") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(CURRENT_PATH_IN_HEADER, request.nextUrl.pathname);

    return NextResponse.next({ headers: requestHeaders });
  }
}

export const config = {
  matcher: [
    "/user/content/desert-figures",
    "/user/content/excerpt",
    "/user/content/tags",
  ],
};
