import SectionHeader from '@/components/ui/SectionHeader'

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80',
  'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=1200&q=80',
]

export default function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-max container-padding">
        <SectionHeader
          eyebrow="Галерея"
          title="Атмосфера вашого відпочинку"
          description="Кілька моментів, які передають характер готелю та красу локації."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
          {GALLERY_IMAGES.map((src, index) => (
            <div key={src} className="overflow-hidden rounded-xl shadow-soft">
              <img
                src={src}
                alt={`Галерея готелю ${index + 1}`}
                className="w-full h-44 sm:h-56 lg:h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
