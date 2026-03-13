import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIConcierge from '@/features/ai-concierge/AIConcierge';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIConcierge />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
