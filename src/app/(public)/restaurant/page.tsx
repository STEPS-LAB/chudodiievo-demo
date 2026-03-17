import { Metadata } from 'next';
import RestaurantPage from './RestaurantClient';

export const metadata: Metadata = {
  title: 'Ресторан | Чудодієво',
  description: 'Авторська кухня з місцевих продуктів. Ресторан відкритий щодня 08:00–22:00.',
  openGraph: { title: 'Ресторан | Чудодієво', description: 'Авторська кухня у серці природи', type: 'website' },
};

export default RestaurantPage;
