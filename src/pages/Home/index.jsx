import HeroSection from './sections/HeroSection'
import FeaturedRooms from './sections/FeaturedRooms'
import AboutSection from './sections/AboutSection'
import TestimonialsSection from './sections/TestimonialsSection'
import AmenitiesSection from './sections/AmenitiesSection'
import SearchBar from '@/features/search/SearchBar'

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Floating search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SearchBar />
      </div>

      <FeaturedRooms />
      <AboutSection />
      <AmenitiesSection />
      <TestimonialsSection />
    </>
  )
}
