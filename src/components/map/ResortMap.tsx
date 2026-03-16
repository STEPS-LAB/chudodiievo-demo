'use client';

import { motion } from 'framer-motion';
import { mapLocations } from '@/lib/config/map';
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
  const { locale } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900">
            {locale === 'ua' ? 'Мапа курорту' : 'Resort Map'}
          </h2>
        </motion.div>

        {/* Map Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Map SVG */}
          <div className="aspect-square sm:aspect-[16/10] bg-gradient-to-br from-neutral-50 to-white rounded-sm overflow-hidden shadow-lg relative">
            {/* Decorative Map Background */}
            <svg
              viewBox="0 0 500 320"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Terrain Features */}
              <defs>
                <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="#F5F7F5" />
                  <circle cx="2" cy="2" r="0.5" fill="#E0E8E0" />
                  <circle cx="12" cy="12" r="0.5" fill="#E0E8E0" />
                </pattern>
                <pattern id="water" patternUnits="userSpaceOnUse" width="10" height="10">
                  <rect width="10" height="10" fill="#F0F7FB" />
                  <path d="M0 5 Q2.5 3,5 5 T10 5" stroke="#C0D8E8" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Base Terrain */}
              <rect width="500" height="320" fill="url(#grass)" />

              {/* Forest Areas */}
              <ellipse cx="100" cy="150" rx="80" ry="100" fill="#E8F0E8" opacity="0.5" />
              <ellipse cx="350" cy="100" rx="100" ry="80" fill="#E8F0E8" opacity="0.5" />

              {/* Lake */}
              <ellipse cx="400" cy="240" rx="70" ry="50" fill="url(#water)" />
              <ellipse cx="400" cy="240" rx="70" ry="50" fill="none" stroke="#A0C8D8" strokeWidth="1.5" />

              {/* Paths */}
              <path
                d="M50 50 Q150 80 250 100 T450 120"
                stroke="#D8C8B0"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
              />
              <path
                d="M250 100 Q280 180 320 200"
                stroke="#D8C8B0"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
              />
              <path
                d="M250 100 Q200 200 150 280"
                stroke="#D8C8B0"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
              />

              {/* Location Markers */}
              {mapLocations.map((location) => (
                <motion.g
                  key={location.id}
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {/* Pulse Effect */}
                  <circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="4"
                    className={`${iconColors[location.icon]} opacity-30`}
                    fill="currentColor"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="6"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Marker Dot */}
                  <circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="3"
                    className={`${iconColors[location.icon]}`}
                    fill="currentColor"
                  />

                  {/* Label Text */}
                  <text
                    x={location.coordinates.x + 6}
                    y={location.coordinates.y + 4}
                    className="text-[10px] font-medium"
                    style={{ fontSize: '10px', fontFamily: 'inherit' }}
                    fill={location.icon === 'lake' ? '#5B8BA8' : '#404040'}
                  >
                    {locale === 'ua' ? location.title.ua : location.title.en}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
