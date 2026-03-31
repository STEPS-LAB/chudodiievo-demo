import Script from 'next/script';

interface JsonLdProps {
  schema: Record<string, unknown>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Pre-built schemas for common use cases
export const resortSchema = {
  '@context': 'https://schema.org',
  '@type': 'Resort',
  name: 'Чудодієво',
  alternateName: 'Chudodievo',
  description: 'Luxury escape in nature in the heart of Ukrainian Polissia',
  url: 'https://chudodiievo-demo.vercel.app',
  telephone: '+380123456789',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Чудодієво',
    addressRegion: 'Київська область',
    addressCountry: 'UA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.0,
    longitude: 29.0,
  },
  image: [
    'https://chudodiievo-demo.vercel.app/images/home-hero.webp',
  ],
  priceRange: '₴₴₴',
  starRating: {
    '@type': 'Rating',
    ratingValue: '5',
  },
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'SPA',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Restaurant',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Free WiFi',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Lake Access',
      value: true,
    },
  ],
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Як забронювати номер?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ви можете забронювати номер через наш сайт, зателефонувавши нам або написавши на email. Бронювання підтверджується миттєво.',
      },
    },
    {
      '@type': 'Question',
      name: 'Чи є безкоштовне скасування?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Так, ми пропонуємо безкоштовне скасування бронювання за 48 годин до заїзду.',
      },
    },
    {
      '@type': 'Question',
      name: 'Чи можна з тваринами?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Так, ми pet-friendly. Будь ласка, повідомте нас заздалегідь про вашу тварину.',
      },
    },
  ],
};
