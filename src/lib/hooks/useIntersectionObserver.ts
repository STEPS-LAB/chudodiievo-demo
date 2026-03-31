'use client';

import { useEffect, useState } from 'react';

export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit & { triggerOnce?: boolean } = { threshold: 0.1, triggerOnce: true }
) {
  const [ref, setRef] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { triggerOnce = true } = options;

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) observer.disconnect();
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, triggerOnce, options.threshold, options.root, options.rootMargin]);

  return { ref: setRef, isVisible };
}
