import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "fr";
const cookieName = "i18nlang";

// Get the preferred locale from headers or cookies
function getLocale(request: NextRequest): string {
    // 1️⃣ Try to get locale from the user's cookies
    const cookieLocale = request.cookies.get(cookieName)?.value;
    if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

    // 2️⃣ Fallback to browser's "Accept-Language" header
    const acceptLang = request.headers.get("Accept-Language");
    if (!acceptLang) return defaultLocale;

    const headers = { "accept-language": acceptLang };
    const languages = new Negotiator({ headers }).languages();
    
    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1️⃣ Skip requests that should not be processed
    if (
        pathname.startsWith("/_next") || // Static files, chunks, assets
        pathname.startsWith("/api") || // API routes
        pathname === "/favicon.ico" // Favicon
    ) {
        return NextResponse.next();
    }

    // 2️⃣ Check if the URL already contains a valid locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next(); // Allow request to proceed
    }

    // 3️⃣ If no locale is in the URL, determine the user's preferred locale
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // 4️⃣ Create a response that redirects the user to the localized page
    const response = NextResponse.redirect(newUrl);

    // 5️⃣ Save the user's locale preference in a cookie (optional: set expiration)
    response.cookies.set(cookieName, locale, { path: "/" });

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|image|public|favicon.ico).*)'
    ]
};
