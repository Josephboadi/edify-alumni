import authConfig from "@/auth.config";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";
import NextAuth from "next-auth";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

const { auth } = NextAuth(authConfig);

// export const mutiplelang = () =>
//   createMiddleware({
//     // A list of all locales that are supported
//     locales: ["en", "de"],

//     // Used when no locale matches
//     defaultLocale: "en",
//   });

export default auth(async (req) => {
  // createMiddleware({
  //   // A list of all locales that are supported
  //   locales: ["en", "de"],

  //   // Used when no locale matches
  //   defaultLocale: "en",
  // });
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const fallbacklanguage = "/";
  const fallbacklanguage1 = "/de";

  let locale = (await req.cookies.get("NEXT_LOCALE")?.value)?.toString();
  let language =
    (await req.cookies.get("NEXT_LOCALE")?.value)?.toString() || "";

  if (!language) {
    language = fallbacklanguage;
  }

  if (language) {
    switch (language) {
      case "de":
        language = fallbacklanguage1;
        break;

      default:
        language = fallbacklanguage;
        break;
    }
    // if (language.toString() === "de") {
    //   language = fallbacklanguage1;
    // } else {
    //   language = fallbacklanguage;
    // }
  }
  const publicRoutes = [
    `${language}`,
    "/",
    "/en",
    `/auth/new-verification`,
    `${language}/auth/new-verification`,
    `/api/uploadthing`,
    `${language}/api/uploadthing`,
  ];
  const authRoutes = [
    `/auth/login`,
    `/auth/register`,
    `/auth/error`,
    `/auth/reset`,
    `/auth/new-password`,
    `${language}/auth/login`,
    `${language}/auth/register`,
    `${language}/auth/error`,
    `${language}/auth/reset`,
    `${language}/auth/new-password`,
  ];

  // const apiAuthPrefix = `${language}/api/auth`;
  const DEFAULT_LOGIN_REDIRECT = locale === "en" ? "/" : `${language}/`;

  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if (isApiAuthRoute) {
  //   // return null;
  //   return i18nRouter(req, i18nConfig);
  // }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // return null;
    return i18nRouter(req, i18nConfig);
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(
        // `${language}auth/login?callbackUrl=${encodedCallbackUrl}`,
        // `${language}auth/login`,
        `${language}`,
        nextUrl
      )
    );
  }

  // return null;
  return i18nRouter(req, i18nConfig);
});

// export default auth(async (req) => {
//   // createMiddleware({
//   //   // A list of all locales that are supported
//   //   locales: ["en", "de"],

//   //   // Used when no locale matches
//   //   defaultLocale: "en",
//   // });
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;
//   // const fallbacklanguage = "/en";
//   // const fallbacklanguage1 = "/de";

//   // let language = (await req.cookies.get("lang")?.value)?.toString() || "";

//   // if (!language) {
//   //   language = fallbacklanguage;
//   // }

//   // if (language) {
//   //   switch (language) {
//   //     case "de":
//   //       language = fallbacklanguage1;
//   //       break;

//   //     default:
//   //       language = fallbacklanguage;
//   //       break;
//   //   }
//   //   // if (language.toString() === "de") {
//   //   //   language = fallbacklanguage1;
//   //   // } else {
//   //   //   language = fallbacklanguage;
//   //   // }
//   // }
//   const publicRoutes = [
//     `/`,
//     // `/api/changelang`,
//     `/auth/new-verification`,
//   ];
//   const authRoutes = [
//     `/auth/login`,
//     `/auth/register`,
//     `/auth/error`,
//     `/auth/reset`,
//     `/auth/new-password`,
//   ];

//   // const apiAuthPrefix = `${language}/api/auth`;
//   const DEFAULT_LOGIN_REDIRECT = `/settings`;

//   // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   // if (isApiAuthRoute) {
//   //   // return null;
//   //   return i18nRouter(req, i18nConfig);
//   // }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     // return null;
//     return i18nRouter(req, i18nConfig);
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return Response.redirect(
//       new URL(
//         `/auth/login?callbackUrl=${encodedCallbackUrl}`,
//         // `${language}`,
//         nextUrl
//       )
//     );
//   }

//   // return null;
//   return i18nRouter(req, i18nConfig);
// });

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: "/((?!api|static|.*\\..*|_next).*)",
};
