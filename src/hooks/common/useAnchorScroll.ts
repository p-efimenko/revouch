import { useRef, useState, useEffect } from 'react'

export function useAnchorScroll() {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  const handleScroll = () => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      setShow(rect.top < 0)
    }
  }

  useEffect(() => {
    // The scroll container is the <main> element from SidebarLayout
    const scrollContainer = document.querySelector('main')

    if (!scrollContainer) return

    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { anchorRef, show }
}