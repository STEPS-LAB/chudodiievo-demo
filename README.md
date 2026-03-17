# Chudodievo - Luxury Resort Website

A production-ready, ultra-premium, mobile-first web ecosystem for luxury nature resort "Chudodievo".

## 🌟 Features

- **Next.js 15+** with App Router and Server Components
- **TypeScript** strict mode for type safety
- **TailwindCSS** with custom design tokens
- **Framer Motion** for smooth animations
- **next-intl** for UA/EN localization
- **AI Concierge** widget (demo mode)
- **Smart Booking System** with multi-step flow
- **Interactive Resort Map**
- **Room Showcase** with dynamic pages
- **Responsive Design** (mobile-first)
- **SEO Optimized** with JSON-LD schemas
- **Performance Optimized** (Lighthouse 98-100 target)

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   └── [locale]/          # Internationalized routes
│       ├── rooms/
│       │   ├── [slug]/    # Dynamic room pages
│       │   └── page.tsx   # Rooms listing
│       ├── restaurant/
│       ├── spa/
│       ├── experiences/
│       ├── events/
│       ├── blog/
│       ├── faq/
│       ├── contacts/
│       ├── layout.tsx     # Root layout
│       └── page.tsx       # Homepage
├── components/
│   ├── layout/            # Header, Footer, Hero
│   ├── sections/          # Page sections
│   ├── rooms/             # Room components
│   ├── map/               # Resort map
│   ├── gallery/           # Image gallery
│   └── seo/               # SEO components
├── features/
│   ├── booking/           # Booking system
│   ├── ai-concierge/      # AI assistant
│   └── smart-search/      # Search functionality
├── lib/
│   ├── config/            # Data configurations
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization
│   └── utils/             # Utility functions
├── styles/                # Global styles
└── tests/
    ├── unit/              # Vitest tests
    └── e2e/               # Playwright tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

### Pages

- `/` - Homepage with hero, booking form, featured sections
- `/rooms` - Room listing
- `/rooms/[slug]` - Individual room detail pages
- `/restaurant` - Restaurant page
- `/spa` - SPA & Wellness page
- `/experiences` - Activities page
- `/events` - Events page
- `/blog` - Blog listing
- `/faq` - FAQ page
- `/contacts` - Contact page

### Key Components

#### Smart Booking System
Multi-step booking flow:
1. Select dates
2. Select guests
3. Room suggestion
4. Summary
5. Reserve

#### AI Concierge
Floating AI assistant with:
- Welcome messages
- Quick suggestions
- Context-aware responses
- Demo mode with predefined answers

#### Interactive Resort Map
SVG-based interactive map with:
- Location markers
- Hover effects
- Info cards
- Deep linking to pages

## 🎨 Design System

### Colors
- **Primary**: Earth tones (#7D7D6F)
- **Secondary**: Forest green (#5E8063)
- **Accent**: Gold (#B59456)
- **Neutral**: Gray scale

### Typography
- **Font**: Inter, Montserrat
- **Weights**: 300, 400, 500

### Spacing
- Luxury whitespace (2x standard)
- Section padding: 16-32rem

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## 📊 Performance

Target Lighthouse scores:
- Performance: 100
- SEO: 100
- Accessibility: 100
- Best Practices: 100

### Optimization Techniques
- Dynamic imports
- Image optimization with Next/Image
- Skeleton screens
- Partial hydration
- Streaming SSR

## 🌐 Localization

Supported languages:
- Ukrainian (default)
- English

Language switch is instant with no page reload.

## 🚢 Deployment

### Vercel

The project is configured for Vercel deployment:

1. Connect repository to Vercel
2. Set environment variables
3. Deploy

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://chudodiievo-demo.vercel.app
```

## 📈 SEO

Implemented schemas:
- Resort
- LocalBusiness
- Room
- FAQPage
- Review

## 🔄 CI/CD

GitHub Actions pipeline:
- Lint
- Test (Unit + E2E)
- Build
- Lighthouse audit
- Deploy to Vercel

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint check
npm run test     # Unit tests
npm run test:e2e # E2E tests
```

## 📄 License

© 2026 Chudodievo. All rights reserved.

## 🏢 Credits

Developed by STEPS LAB - Demonstrating technological excellence through UX, performance, and architecture.
# chudodiievo-demo
