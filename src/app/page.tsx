import Hero from '@/components/layout/Hero';
import AboutSection from '@/components/sections/AboutSection';
import RoomsSection from '@/components/sections/RoomsSection';
import RestaurantSection from '@/components/sections/RestaurantSection';
import SpaSection from '@/components/sections/SpaSection';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ResortMap from '@/components/map/ResortMap';

export const metadata = {
  title: 'Чудодієво | Розкішний відпочинок на природі',
  description: 'Відкрийте для себе ідеальне поєднання розкоші та природи в серці українського Полісся. Преміальний курортний комплекс для незабутнього відпочинку.',
  keywords: 'курорт, відпочинок, природа, розкіш, СПА, ресторан, котеджі, Україна, Полісся',
  openGraph: {
    title: 'Чудодієво | Розкішний відпочинок на природі',
    description: 'Відкрийте для себе ідеальне поєднання розкоші та природи в серці українського Полісся',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Чудодієво',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Rooms Section */}
      <RoomsSection />

      {/* Restaurant Section */}
      <RestaurantSection />

      {/* SPA Section */}
      <SpaSection />

      {/* Experiences Section */}
      <ExperiencesSection />

      {/* Resort Map Section */}
      <ResortMap />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </>
  );
}
