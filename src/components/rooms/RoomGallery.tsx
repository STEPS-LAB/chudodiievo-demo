'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface RoomGalleryProps {
  images: string[];
}

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
  };

  return (
    <>
      {/* Gallery Grid */}
      <section className="section-padding bg-surface">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Image */}
            <div
              className="md:col-span-2 image-zoom-container rounded-sm overflow-hidden cursor-pointer aspect-video"
              onClick={() => setSelectedImage(0)}
            >
              <Image
                src={images[0]}
                alt="Room main view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>

            {/* Secondary Images */}
            {images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="image-zoom-container rounded-sm overflow-hidden cursor-pointer aspect-video"
                onClick={() => setSelectedImage(index + 1)}
              >
                <Image
                  src={image}
                  alt={`Room view ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setSelectedImage(0)}
              className="luxury-button-secondary"
              type="button"
            >
              View All Photos
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-900/95 z-50"
              onClick={() => setSelectedImage(null)}
            />

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
              type="button"
            />

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-sm text-white text-sm"
            >
              {selectedImage + 1} / {images.length}
            </motion.div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`Room view ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
