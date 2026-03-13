export interface Room {
  id: string;
  slug: string;
  name: {
    ua: string;
    en: string;
  };
  description: {
    ua: string;
    en: string;
  };
  shortDescription: {
    ua: string;
    en: string;
  };
  price: number;
  currency: string;
  maxGuests: number;
  size: number; // in m²
  images: string[];
  amenities: {
    ua: string[];
    en: string[];
  };
  featured: boolean;
}

export const rooms: Room[] = [
  {
    id: 'lake-house',
    slug: 'lake-house',
    name: {
      ua: 'Озерний Будинок',
      en: 'Lake House',
    },
    description: {
      ua: 'Приватний котедж біля озера з панорамними вікнами та власною терасою. Ідеальне місце для романтичного відпочинку на природі.',
      en: 'Private cottage by the lake with panoramic windows and private terrace. Perfect place for a romantic nature getaway.',
    },
    shortDescription: {
      ua: 'Приватний відпочинок біля води',
      en: 'Private nature retreat near the water',
    },
    price: 8500,
    currency: 'UAH',
    maxGuests: 2,
    size: 65,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=80',
    ],
    amenities: {
      ua: ['King Size ліжко', 'Панорамні вікна', 'Вид на озеро', 'Камін', 'Власна тераса', 'Швидкісний WiFi', 'Міні-бар', 'Кондиціонер'],
      en: ['King Size Bed', 'Panoramic Windows', 'Lake View', 'Fireplace', 'Private Terrace', 'High-Speed WiFi', 'Mini Bar', 'Air Conditioning'],
    },
    featured: true,
  },
  {
    id: 'forest-cottage',
    slug: 'forest-cottage',
    name: {
      ua: 'Лісовий Котедж',
      en: 'Forest Cottage',
    },
    description: {
      ua: 'Затишний котедж у серці вікового лісу. Повна приватність та гармонія з природою для ідеального відпочинку.',
      en: 'Cozy cottage in the heart of ancient forest. Complete privacy and harmony with nature for perfect relaxation.',
    },
    shortDescription: {
      ua: 'Затишок у серці лісу',
      en: 'Cozy retreat in the forest heart',
    },
    price: 7200,
    currency: 'UAH',
    maxGuests: 4,
    size: 85,
    images: [
      'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?w=1920&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1920&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920&q=80',
    ],
    amenities: {
      ua: ['2 спальні', 'Вітальня з каміном', 'Повністю обладнана кухня', 'Ванна кімната', 'Приватна сауна', 'Тераса', 'WiFi', 'Парковка'],
      en: ['2 Bedrooms', 'Living Room with Fireplace', 'Full Kitchen', 'Bathroom', 'Private Sauna', 'Terrace', 'WiFi', 'Parking'],
    },
    featured: true,
  },
  {
    id: 'premium-suite',
    slug: 'premium-suite',
    name: {
      ua: 'Преміум Люкс',
      en: 'Premium Suite',
    },
    description: {
      ua: 'Розкішний люкс з окремим входом, приватною спа-зоною та ексклюзивним сервісом. Максимальний комфорт для вибагливих гостей.',
      en: 'Luxury suite with separate entrance, private spa zone and exclusive service. Maximum comfort for discerning guests.',
    },
    shortDescription: {
      ua: 'Максимальний розкішний комфорт',
      en: 'Maximum luxury comfort',
    },
    price: 15000,
    currency: 'UAH',
    maxGuests: 2,
    size: 120,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80',
      'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=1920&q=80',
    ],
    amenities: {
      ua: ['King Size ліжко', 'Приватна SPA-зона', 'Джакузі', 'Персональний консьєрж', 'Сніданок у номер', 'Вид на озеро', 'Вітальня', 'Міні-бар преміум'],
      en: ['King Size Bed', 'Private SPA Zone', 'Jacuzzi', 'Personal Concierge', 'Breakfast in Room', 'Lake View', 'Living Room', 'Premium Mini Bar'],
    },
    featured: true,
  },
  {
    id: 'family-villa',
    slug: 'family-villa',
    name: {
      ua: 'Сімейна Вілла',
      en: 'Family Villa',
    },
    description: {
      ua: 'Простора вілла для сімейного відпочинку з кількома спальнями, великою вітальнею та приватною територією.',
      en: 'Spacious villa for family vacation with multiple bedrooms, large living room and private territory.',
    },
    shortDescription: {
      ua: 'Простір для всієї родини',
      en: 'Space for the whole family',
    },
    price: 18000,
    currency: 'UAH',
    maxGuests: 8,
    size: 200,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    ],
    amenities: {
      ua: ['4 спальні', '3 ванні кімнати', 'Велика вітальня', 'Повна кухня', 'Камін', 'Приватний дворик', 'Мангал', 'Дитячий майданчик'],
      en: ['4 Bedrooms', '3 Bathrooms', 'Large Living Room', 'Full Kitchen', 'Fireplace', 'Private Yard', 'BBQ Grill', 'Playground'],
    },
    featured: false,
  },
  {
    id: 'garden-room',
    slug: 'garden-room',
    name: {
      ua: 'Садовий Номер',
      en: 'Garden Room',
    },
    description: {
      ua: 'Затишний номер з видом на сад. Ідеальний вибір для тих, хто цінує спокій та комфорт за доступною ціною.',
      en: 'Cozy room with garden view. Ideal choice for those who value peace and comfort at an affordable price.',
    },
    shortDescription: {
      ua: 'Комфорт у садовому оточенні',
      en: 'Comfort in garden setting',
    },
    price: 4500,
    currency: 'UAH',
    maxGuests: 2,
    size: 35,
    images: [
      'https://images.unsplash.com/photo-1616594039964-40891a909d99?w=1920&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1920&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1920&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=80',
    ],
    amenities: {
      ua: ['Queen Size ліжко', 'Вид на сад', 'Робоча зона', 'Ванна кімната', 'WiFi', 'Кондиціонер', 'Міні-бар', 'Сейф'],
      en: ['Queen Size Bed', 'Garden View', 'Work Area', 'Bathroom', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Safe'],
    },
    featured: false,
  },
  {
    id: 'wellness-suite',
    slug: 'wellness-suite',
    name: {
      ua: 'Велнес Люкс',
      en: 'Wellness Suite',
    },
    description: {
      ua: 'Люкс з акцентом на здоровʼя та релаксацію. Включає доступ до приватної велнес-зони з йога-павільйоном.',
      en: 'Suite focused on health and relaxation. Includes access to private wellness zone with yoga pavilion.',
    },
    shortDescription: {
      ua: 'Релаксація та відновлення',
      en: 'Relaxation and restoration',
    },
    price: 12000,
    currency: 'UAH',
    maxGuests: 2,
    size: 90,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80',
    ],
    amenities: {
      ua: ['King Size ліжко', 'Йога-павільйон', 'Медитаційна зона', 'Інфрачервона сауна', 'Масажне крісло', 'Органічні косметичні засоби', 'Детокс-меню', 'Персональний тренер'],
      en: ['King Size Bed', 'Yoga Pavilion', 'Meditation Zone', 'Infrared Sauna', 'Massage Chair', 'Organic Amenities', 'Detox Menu', 'Personal Trainer'],
    },
    featured: true,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find(room => room.slug === slug);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter(room => room.featured);
}

export function getRelatedRooms(currentSlug: string, limit: number = 3): Room[] {
  return rooms
    .filter(room => room.slug !== currentSlug)
    .slice(0, limit);
}
