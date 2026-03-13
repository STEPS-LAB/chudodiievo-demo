import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, isIntersecting]
}
