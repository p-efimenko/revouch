// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Please double-check the browser address bar or use the navigation to go to a known page.
      </p>
    </div>
  )
}
