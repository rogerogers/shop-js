import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { locales } from './navigation';

const publicPages = [
  '/signin',
  // (/secret requires auth)
];

const intlMiddleware = createMiddleware(routing);

// const authMiddleware = async (req: NextRequest) => {
//   return (
//     withAuth(
//       // Note that this callback is only invoked if
//       // the `authorized` callback has returned `true`
//       // and not for pages listed in `pages`.
//       (req) => intlMiddleware(req),
//       {
//         callbacks: {
//           authorized: ({ token }) => token != null,
//         },
//         pages: {
//           signIn: `/signin`,
//         },
//       },
//     ) as any
//   )(req);
// };

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  return intlMiddleware(req);
  // if (isPublicPage) {
  // } else {
  //   return (authMiddleware as any)(req);
  // }
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
