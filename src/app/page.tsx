import Hero from '@/components/layout/Hero';
import BookingForm from '@/features/booking/BookingForm';
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

      {/* Booking Section */}
      <section className="relative -mt-32 z-20 px-4 sm:px-6 lg:px-8">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

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
