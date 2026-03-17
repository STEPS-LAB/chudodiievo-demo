import { ReactNode } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIConcierge from '@/features/ai-concierge/AIConcierge';
import MobileBookingBar from '@/features/booking/MobileBookingBar';
import MainWrapper from '@/components/layout/MainWrapper';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { HeaderProvider } from '@/components/layout/HeaderContext';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`antialiased font-sans`}>
        <LanguageProvider>
          <HeaderProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <MainWrapper>{children}</MainWrapper>
              <Footer />
              <AIConcierge />
              <MobileBookingBar />
            </div>
          </HeaderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
