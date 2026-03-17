import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MainWrapper from '@/components/layout/MainWrapper';
import ClientWidgets from '@/components/layout/ClientWidgets';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { HeaderProvider } from '@/components/layout/HeaderContext';
import '@/styles/globals.css';

// Optimize fonts - load only necessary weights and subsets
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chudodiievo-demo.vercel.app'),
  title: {
    default: 'Чудодієво | Розкішний відпочинок на природі',
    template: '%s | Чудодієво',
  },
  description: 'Відкрийте для себе ідеальне поєднання розкоші та природи в серці українського Полісся',
  robots: { index: true, follow: true },
};

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
              <ClientWidgets />
            </div>
          </HeaderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
