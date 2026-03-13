export interface MapLocation {
  id: string;
  title: {
    ua: string;
    en: string;
  };
  description: {
    ua: string;
    en: string;
  };
  coordinates: {
    x: number;
    y: number;
  };
  icon: 'restaurant' | 'spa' | 'cottage' | 'lake' | 'reception' | 'activity';
  page: string;
  aiPrompt?: {
    ua: string;
    en: string;
  };
}

export const mapLocations: MapLocation[] = [
  {
    id: 'reception',
    title: {
      ua: 'Рецепція',
      en: 'Reception',
    },
    description: {
      ua: 'Центр обслуговування гостей. Реєстрація, інформація та консьєрж-сервіс.',
      en: 'Guest service center. Check-in, information and concierge service.',
    },
    coordinates: { x: 50, y: 50 },
    icon: 'reception',
    page: '/contacts',
    aiPrompt: {
      ua: 'Які послуги доступні на рецепції?',
      en: 'What services are available at reception?',
    },
  },
  {
    id: 'restaurant',
    title: {
      ua: 'Ресторан',
      en: 'Restaurant',
    },
    description: {
      ua: 'Вибачте dining з локальних інгредієнтів. Авторська кухня від нашого шеф-кухаря.',
      en: 'Fine dining with local ingredients. Author\'s cuisine from our chef.',
    },
    coordinates: { x: 180, y: 80 },
    icon: 'restaurant',
    page: '/restaurant',
    aiPrompt: {
      ua: 'Які страви ви рекомендуєте спробувати?',
      en: 'What dishes do you recommend trying?',
    },
  },
  {
    id: 'spa',
    title: {
      ua: 'СПА-центр',
      en: 'SPA Center',
    },
    description: {
      ua: 'Центр велнесу та релаксації. Масажі, сауна, хаммам та косметологічні процедури.',
      en: 'Wellness and relaxation center. Massages, sauna, hammam and cosmetic treatments.',
    },
    coordinates: { x: 280, y: 120 },
    icon: 'spa',
    page: '/activities',
    aiPrompt: {
      ua: 'Яка найкраща програма релаксації?',
      en: 'What is the best relaxation program?',
    },
  },
  {
    id: 'lake-house',
    title: {
      ua: 'Озерний Будинок',
      en: 'Lake House',
    },
    description: {
      ua: 'Приватний котедж біля озера з панорамними вікнами.',
      en: 'Private cottage by the lake with panoramic windows.',
    },
    coordinates: { x: 320, y: 200 },
    icon: 'cottage',
    page: '/rooms/lake-house',
    aiPrompt: {
      ua: 'Чим особливий Озерний Будинок?',
      en: 'What makes the Lake House special?',
    },
  },
  {
    id: 'forest-cottage',
    title: {
      ua: 'Лісовий Котедж',
      en: 'Forest Cottage',
    },
    description: {
      ua: 'Затишний котедж у серці вікового лісу.',
      en: 'Cozy cottage in the heart of ancient forest.',
    },
    coordinates: { x: 100, y: 180 },
    icon: 'cottage',
    page: '/rooms/forest-cottage',
    aiPrompt: {
      ua: 'Чи є у Лісовому Котеджі сауна?',
      en: 'Does the Forest Cottage have a sauna?',
    },
  },
  {
    id: 'premium-suite',
    title: {
      ua: 'Преміум Люкс',
      en: 'Premium Suite',
    },
    description: {
      ua: 'Розкішний люкс з приватною спа-зоною.',
      en: 'Luxury suite with private spa zone.',
    },
    coordinates: { x: 220, y: 160 },
    icon: 'cottage',
    page: '/rooms/premium-suite',
    aiPrompt: {
      ua: 'Що входить у послуги консьєржа для Преміум Люксу?',
      en: 'What concierge services are included for Premium Suite?',
    },
  },
  {
    id: 'lake',
    title: {
      ua: 'Озеро',
      en: 'Lake',
    },
    description: {
      ua: 'Природне озеро з зоною відпочинку. Риболовля, каякинг та пікніки.',
      en: 'Natural lake with recreation area. Fishing, kayaking and picnics.',
    },
    coordinates: { x: 380, y: 240 },
    icon: 'lake',
    page: '/experiences',
    aiPrompt: {
      ua: 'Які активності доступні на озері?',
      en: 'What activities are available at the lake?',
    },
  },
  {
    id: 'yoga-pavilion',
    title: {
      ua: 'Йога-павільйон',
      en: 'Yoga Pavilion',
    },
    description: {
      ua: 'Відкритий павільйон для йоги та медитації на природі.',
      en: 'Open pavilion for yoga and meditation in nature.',
    },
    coordinates: { x: 150, y: 280 },
    icon: 'activity',
    page: '/experiences',
    aiPrompt: {
      ua: 'Коли проходять групові заняття з йоги?',
      en: 'When are the group yoga sessions?',
    },
  },
  {
    id: 'hiking-trail',
    title: {
      ua: 'Піша стежка',
      en: 'Hiking Trail',
    },
    description: {
      ua: 'Еко-стежка крізь вікові ліси з оглядовими майданчиками.',
      en: 'Eco-trail through ancient forests with viewpoints.',
    },
    coordinates: { x: 60, y: 220 },
    icon: 'activity',
    page: '/experiences',
    aiPrompt: {
      ua: 'Яка довжина пішої стежки?',
      en: 'How long is the hiking trail?',
    },
  },
  {
    id: 'event-lawn',
    title: {
      ua: 'Поляна для подій',
      en: 'Event Lawn',
    },
    description: {
      ua: 'Відкритий простір для весіль та приватних заходів на природі.',
      en: 'Open space for weddings and private events in nature.',
    },
    coordinates: { x: 250, y: 300 },
    icon: 'activity',
    page: '/events',
    aiPrompt: {
      ua: 'Яка максимальна кількість гостей для події на поляні?',
      en: 'What is the maximum guest count for events on the lawn?',
    },
  },
];

export function getLocationById(id: string): MapLocation | undefined {
  return mapLocations.find(location => location.id === id);
}

export function getLocationsByIcon(icon: string): MapLocation[] {
  return mapLocations.filter(location => location.icon === icon);
}
