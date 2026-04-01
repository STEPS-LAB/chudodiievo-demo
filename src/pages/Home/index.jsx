import HeroSection from './sections/HeroSection'
import FeaturedRooms from './sections/FeaturedRooms'
import AboutSection from './sections/AboutSection'
import GallerySection from './sections/GallerySection'
import TestimonialsSection from './sections/TestimonialsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedRooms />
      <GallerySection />
      <TestimonialsSection />
    </>
  )
}
