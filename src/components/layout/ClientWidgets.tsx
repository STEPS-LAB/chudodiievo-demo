'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AIConcierge = dynamic(() => import('@/features/ai-concierge/AIConcierge'), { ssr: false });
const MobileBookingBar = dynamic(() => import('@/features/booking/MobileBookingBar'), { ssr: false });

export default function ClientWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const onFirstInteraction = () => setMounted(true);

    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });

    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => setMounted(true), { timeout: 10000 });
      return () => {
        window.removeEventListener('pointerdown', onFirstInteraction);
        window.removeEventListener('keydown', onFirstInteraction);
        window.removeEventListener('touchstart', onFirstInteraction);
      };
    }

    const t = window.setTimeout(() => setMounted(true), 9000);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <AIConcierge />
      <MobileBookingBar />
    </>
  );
}
