import { Metadata } from 'next';
import FAQPage from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ | Чудодієво',
  description: 'Відповіді на поширені запитання про бронювання, розміщення та послуги курорту Чудодієво.',
  openGraph: { title: 'Поширені запитання | Чудодієво', type: 'website' },
};

export default FAQPage;
