import dynamic from 'next/dynamic';
import Hero from '@/components/layout/Hero';

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const RoomsSection = dynamic(() => import('@/components/sections/RoomsSection'));
const RestaurantSection = dynamic(() => import('@/components/sections/RestaurantSection'));
const RelaxationSection = dynamic(() => import('@/components/sections/RelaxationSection'));
const PoolSection = dynamic(() => import('@/components/sections/PoolSection'));
const ResortMap = dynamic(() => import('@/components/map/ResortMap'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));

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
