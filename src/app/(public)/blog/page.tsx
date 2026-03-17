import { Metadata } from 'next';
import BlogPage from './BlogClient';

export const metadata: Metadata = {
  title: 'Блог | Чудодієво',
  description: 'Новини, поради та натхнення від курорту Чудодієво — природа, кухня, велнес та події.',
  openGraph: { title: 'Блог | Чудодієво', type: 'website' },
};

export default BlogPage;
