'use client';

import dynamic from 'next/dynamic';

const AIConcierge = dynamic(() => import('@/features/ai-concierge/AIConcierge'), { ssr: false });
const MobileBookingBar = dynamic(() => import('@/features/booking/MobileBookingBar'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <AIConcierge />
      <MobileBookingBar />
    </>
  );
}
