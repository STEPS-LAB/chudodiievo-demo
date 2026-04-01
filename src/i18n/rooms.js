const ROOMS_EN = {
  standard: {
    name: 'Standard Room',
    shortDescription: 'Cozy room with a forest view and all essential amenities for a comfortable stay.',
    description:
      'The Standard Room blends natural beauty with modern comfort. Large windows open panoramic views of the Carpathian forest, while natural materials create a calm and elegant atmosphere.',
    bedType: 'Double bed',
  },
  'forest-suite': {
    name: 'Forest Suite',
    shortDescription: 'Spacious suite with a terrace, open bath, and stunning forest views.',
    description:
      'The Forest Suite immerses you in nature. The 52 m² interior combines Scandinavian minimalism with Carpathian character, plus a lounge area for complete relaxation.',
    bedType: 'King-size bed',
  },
  'lake-house': {
    name: 'Lakeside Cottage',
    shortDescription: 'Private cottage by the lake with its own pier and sauna.',
    description:
      'The Lakeside Cottage offers a unique private retreat on the shore of a natural lake, with a sauna, terrace, and beautiful views for a romantic or family stay.',
    bedType: '2 bedrooms (King + Twin)',
  },
  'family-suite': {
    name: 'Family Suite',
    shortDescription: 'Perfect for families: two bedrooms, kids room, and spacious living area.',
    description:
      'A spacious family-oriented suite with two bedrooms, a shared living area, and child-friendly comfort for a relaxed vacation together.',
    bedType: 'King + Twin + Child bed',
  },
  'spa-penthouse': {
    name: 'SPA Penthouse',
    shortDescription: 'Top-floor suite with 360° view, private SPA, and rooftop jacuzzi.',
    description:
      'The SPA Penthouse is the top luxury experience with panoramic views, private wellness zone, and premium service designed for total privacy and comfort.',
    bedType: 'Emperor-size bed',
  },
  'forest-studio': {
    name: 'Forest Studio',
    shortDescription: 'Compact and stylish studio for those who value minimalism and nature.',
    description:
      'The Forest Studio is a thoughtfully designed 35 m² space for a simple, modern, and comfortable stay close to nature.',
    bedType: 'Queen-size bed',
  },
}

export function localizeRoom(room, language) {
  if (!room || language === 'ua') return room
  const t = ROOMS_EN[room.slug]
  if (!t) return room
  return {
    ...room,
    ...t,
  }
}
