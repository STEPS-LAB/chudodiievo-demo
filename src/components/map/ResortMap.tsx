'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mapLocations, type MapLocation } from '@/lib/config/map';
import { useIntersectionObserver } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

const iconColors = {
  restaurant: 'fill-orange-500',
  spa: 'fill-secondary-500',
  cottage: 'fill-primary-500',
  lake: 'fill-blue-400',
  reception: 'fill-neutral-500',
  activity: 'fill-green-500',
};

const iconPaths: Record<string, React.JSX.Element> = {
  restaurant: (
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M17 15v7M13 15v7M21 15v7M15 2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2z" />
  ),
  spa: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM8 11h8M8 15h8M10 7h4" />
  ),
  cottage: (
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />
  ),
  lake: (
    <path d="M2 12c.6 0 1.3.4 2 1s1.4 1 2 1 1.3-.4 2-1 1.4-1 2-1 1.3.4 2 1 1.4 1 2 1 1.3-.4 2-1 1.4-1 2-1M2 17c.6 0 1.3.4 2 1s1.4 1 2 1 1.3-.4 2-1 1.4-1 2-1 1.3.4 2 1 1.4 1 2 1 1.3-.4 2-1 1.4-1 2-1" />
  ),
  reception: (
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  ),
  activity: (
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
  ),
};

export default function ResortMap() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const { locale } = useLanguage();

  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-wide mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
            {locale === 'ua' ? 'Мапа курорту' : 'Resort Map'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4">
            {locale === 'ua' ? 'Мапа курорту' : 'Resort Map'}
          </h2>
        </motion.div>

        {/* Map Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Map SVG */}
          <div className="aspect-[16/10] bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-sm overflow-hidden shadow-medium relative">
            {/* Decorative Map Background */}
            <svg
              viewBox="0 0 500 320"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Terrain Features */}
              <defs>
                <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="#E8F0E8" />
                  <circle cx="2" cy="2" r="1" fill="#D4E0D4" />
                  <circle cx="12" cy="12" r="1" fill="#D4E0D4" />
                </pattern>
                <pattern id="water" patternUnits="userSpaceOnUse" width="10" height="10">
                  <rect width="10" height="10" fill="#E0F0FF" />
                  <path d="M0 5 Q2.5 3,5 5 T10 5" stroke="#B0D0E8" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Base Terrain */}
              <rect width="500" height="320" fill="url(#grass)" />

              {/* Forest Areas */}
              <ellipse cx="100" cy="150" rx="80" ry="100" fill="#DCE8DC" opacity="0.6" />
              <ellipse cx="350" cy="100" rx="100" ry="80" fill="#DCE8DC" opacity="0.6" />

              {/* Lake */}
              <ellipse cx="400" cy="240" rx="70" ry="50" fill="url(#water)" />
              <ellipse cx="400" cy="240" rx="70" ry="50" fill="none" stroke="#90C0D8" strokeWidth="2" />

              {/* Paths */}
              <path
                d="M50 50 Q150 80 250 100 T450 120"
                stroke="#C8B8A0"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
              />
              <path
                d="M250 100 Q280 180 320 200"
                stroke="#C8B8A0"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
              />
              <path
                d="M250 100 Q200 200 150 280"
                stroke="#C8B8A0"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
              />

              {/* Location Markers */}
              {mapLocations.map((location) => (
                <motion.g
                  key={location.id}
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedLocation(location)}
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Pulse Effect */}
                  <circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="8"
                    className={`${iconColors[location.icon]} opacity-20`}
                    fill="currentColor"
                  >
                    <animate
                      attributeName="r"
                      from="5"
                      to="10"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.4"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Marker Icon */}
                  <g
                    transform={`translate(${location.coordinates.x - 6}, ${location.coordinates.y - 6})`}
                    className={`${iconColors[location.icon]}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 drop-shadow-sm"
                      fill="currentColor"
                      stroke="white"
                      strokeWidth="2"
                    >
                      {iconPaths[location.icon]}
                    </svg>
                  </g>
                </motion.g>
              ))}
            </svg>
          </div>

          {/* Info Card */}
          <AnimatePresence>
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 luxury-card p-6"
              >
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${iconColors[selectedLocation.icon].replace('fill-', 'bg-').replace('500', '100')}`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-5 h-5 ${iconColors[selectedLocation.icon].replace('fill-', 'text-')}`}
                      fill="currentColor"
                    >
                      {iconPaths[selectedLocation.icon]}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-neutral-900">
                      {locale === 'ua' ? selectedLocation.title.ua : selectedLocation.title.en}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      {locale === 'ua' ? selectedLocation.description.ua : selectedLocation.description.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href={selectedLocation.page}
                    className="luxury-button py-2 px-4 text-sm"
                  >
                    {locale === 'ua' ? 'Переглянути' : 'View'}
                  </Link>
                  {selectedLocation.aiPrompt && (
                    <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center">
                      <span>{locale === 'ua' ? 'Запитати AI' : 'Ask AI'}</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {Object.entries(iconColors).map(([key, color]) => (
            <div key={key} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm text-neutral-600 capitalize">{locale === 'ua' ? key : key}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
