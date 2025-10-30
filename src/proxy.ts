import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const PUBLIC_PAGES = [
  '/',
  '/login',
  '/sign_up',
  '/reset_password',
  '/policy',
  '/terms',
  '/profile',
  // remove after auth is implemented
  '/settings',
  '/settings/bio',
  '/settings/friends',
  '/settings/interests',
  '/settings/notifications',
  '/settings/collections',
  '/settings/activities',
  '/settings/social-messengers',
]

const intlMiddleware = createMiddleware(routing)

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
    },
  },
)

export default function proxy(req: NextRequest) {
  // Public pages
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${PUBLIC_PAGES.flatMap((p) =>
      p === '/' ? ['', '/'] : p,
    ).join('|')})/?$`,
    'i',
  )

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
