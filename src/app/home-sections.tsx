'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SectionFallback = () => <div className="section-padding" aria-hidden="true" />;

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false, loading: SectionFallback });
const RoomsSection = dynamic(() => import('@/components/sections/RoomsSection'), { ssr: false, loading: SectionFallback });
const RestaurantSection = dynamic(() => import('@/components/sections/RestaurantSection'), { ssr: false, loading: SectionFallback });
const RelaxationSection = dynamic(() => import('@/components/sections/RelaxationSection'), { ssr: false, loading: SectionFallback });
const PoolSection = dynamic(() => import('@/components/sections/PoolSection'), { ssr: false, loading: SectionFallback });
const ResortMap = dynamic(() => import('@/components/map/ResortMap'), { ssr: false, loading: SectionFallback });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: false, loading: SectionFallback });

export default function HomeSections() {
  const [hydrateSections, setHydrateSections] = useState(false);

  useEffect(() => {
    if (hydrateSections) return;
    const hash = window.location.hash;
    if (hash === '#rooms' || hash === '#pool') {
      setHydrateSections(true);
      return;
    }

    const onUserIntent = () => setHydrateSections(true);
    window.addEventListener('scroll', onUserIntent, { once: true, passive: true });
    window.addEventListener('pointerdown', onUserIntent, { once: true, passive: true });
    window.addEventListener('touchstart', onUserIntent, { once: true, passive: true });
    window.addEventListener('keydown', onUserIntent, { once: true, passive: true });

    return () => {
      window.removeEventListener('scroll', onUserIntent);
      window.removeEventListener('pointerdown', onUserIntent);
      window.removeEventListener('touchstart', onUserIntent);
      window.removeEventListener('keydown', onUserIntent);
    };
  }, [hydrateSections]);

  if (!hydrateSections) {
    return (
      <>
        <div className="section-padding" aria-hidden="true" />
        <div id="rooms" />
        <div id="pool" />
      </>
    );
  }

  return (
    <>
      <AboutSection />

      <div id="rooms">
        <RoomsSection />
      </div>

      <RestaurantSection />
      <RelaxationSection />

      <div id="pool">
        <PoolSection />
      </div>

      <ResortMap />
      <TestimonialsSection />
    </>
  );
}

