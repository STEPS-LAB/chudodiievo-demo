import Hero from '@/components/layout/Hero';
import AboutSection from '@/components/sections/AboutSection';
import RoomsSection from '@/components/sections/RoomsSection';
import RestaurantSection from '@/components/sections/RestaurantSection';
import RelaxationSection from '@/components/sections/RelaxationSection';
import PoolSection from '@/components/sections/PoolSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ResortMap from '@/components/map/ResortMap';

export const metadata = {
  title: 'Чудодієво | Розкішний відпочинок на природі',
  description: 'Відкрийте для себе ідеальне поєднання розкоші та природи в серці українського Полісся. Преміальний курортний комплекс для незабутнього відпочинку.',
  keywords: 'курорт, відпочинок, природа, розкіш, ресторан, котеджі, Україна, Полісся',
  openGraph: {
    title: 'Чудодієво | Розкішний відпочинок на природі',
    description: 'Відкрийте для себе ідеальне поєднання розкоші та природи в серці українського Полісся',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Чудодієво',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Чудодієво — розкішний курорт' }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Rooms Section */}
      <div id="rooms">
        <RoomsSection />
      </div>

      {/* Restaurant Section */}
      <RestaurantSection />

      {/* Relaxation Section */}
      <RelaxationSection />

      {/* Pool Section */}
      <div id="pool">
        <PoolSection />
      </div>

      {/* Resort Map Section */}
      <ResortMap />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </>
  );
}
