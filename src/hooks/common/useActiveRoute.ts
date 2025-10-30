import { usePathname } from 'next/navigation'

export function useActiveRoute(href: string) {

  const pathname = usePathname()
  const decodedPathname = decodeURIComponent(pathname)

  function isActiveBySegment(path: string, href: string): boolean {
    if (!href) return false

    // Normalize by removing trailing slashes except for root
    const normalize = (str: string) =>
      str === '/' ? '/' : str.replace(/\/+$/, '')

    const normPath = normalize(path)
    const normHref = normalize(href)

    // Exact match
    if (normPath === normHref) return true

    // Split into segments
    const pathSegments = normPath.split('/').filter(Boolean)
    const hrefSegments = normHref.split('/').filter(Boolean)

    // Not enough segments to match
    if (pathSegments.length < hrefSegments.length) return false

    // Check if path starts with href segments and is followed by "/" or end
    for (let i = 0; i < hrefSegments.length; i++) {
      if (pathSegments[i] !== hrefSegments[i]) return false
    }

    // The next segment, if any, must only exist if href doesn't end the path
    if (pathSegments.length === hrefSegments.length) {
      return true
    } else {
      // Must check the next char in pathname after href is "/"
      const nextCharIndex = normHref === '/' ? 1 : normHref.length
      return normPath.charAt(nextCharIndex) === '/'
    }
  }

  const isActiveRoute = isActiveBySegment(decodedPathname, href)

  return { isActiveRoute }
}
