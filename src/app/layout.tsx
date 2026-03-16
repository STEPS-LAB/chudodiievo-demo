import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIConcierge from '@/features/ai-concierge/AIConcierge';
import MobileBookingBar from '@/features/booking/MobileBookingBar';
import MainWrapper from '@/components/layout/MainWrapper';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { HeaderProvider } from '@/components/layout/HeaderContext';
import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className="antialiased">
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
