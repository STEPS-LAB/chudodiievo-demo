'use client';

import AboutSection from '@/components/sections/AboutSection';
import RoomsSection from '@/components/sections/RoomsSection';
import RestaurantSection from '@/components/sections/RestaurantSection';
import RelaxationSection from '@/components/sections/RelaxationSection';
import PoolSection from '@/components/sections/PoolSection';
import ResortMap from '@/components/map/ResortMap';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function HomeSections() {
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

