import { Metadata } from 'next';
import ActivitiesPage from './ActivitiesClient';

export const metadata: Metadata = {
  title: 'Дозвілля | Чудодієво',
  description: 'Велопрогулянки, лазня, квадроцикли, риболовля, теніс — активний відпочинок у Чудодієво.',
  openGraph: { title: 'Дозвілля | Чудодієво', description: 'Активний відпочинок у серці Полісся', type: 'website' },
};

export default ActivitiesPage;
