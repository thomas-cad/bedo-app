import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await getToken({ req: request });

    // 0️⃣ Handle NextAuth.js routes
    const nextAuthPaths = [
        "/api/auth",
        "/login",
    ];
    
    if (nextAuthPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // 1️⃣ Skip requests that should not be processed
    if (
        pathname.startsWith("/_next") || // Static files, chunks, assets
        pathname.startsWith("/api") || // API routes (except NextAuth)
        pathname === "/favicon.ico" // Favicon
    ) {
        return NextResponse.next();
    }

    // 2️⃣ Check if the URL already contains a valid locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // 3️⃣ If no locale is in the URL, determine the user's preferred locale
    const locale = pathnameHasLocale 
        ? pathname.split('/')[1] 
        : getLocale(request);

    // 4️⃣ Handle protected routes
    const protectedPaths = ["en/pole", "en/orders", "en/stock","fr/pole", "fr/orders", "fr/stock", "/shop/cart", "/shop/checkout"];
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));

    if (isProtected && !session) {
        const signInUrl = new URL(`/${locale}/login`, request.url);
        signInUrl.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(signInUrl);
    }

    // If we already have a locale in the URL, proceed
    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // 5️⃣ Redirect to localized version if no locale in URL
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    const response = NextResponse.redirect(newUrl);
    response.cookies.set(cookieName, locale, { path: "/" });

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|image|public|favicon.ico).*)'
    ]
};