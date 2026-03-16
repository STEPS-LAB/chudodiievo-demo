'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MainWrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  const pathname = usePathname();
  const isHeroPage = pathname === '/' || pathname === '/restaurant' || pathname === '/contacts';

  return (
    <main className={`flex-1 ${isHeroPage ? '' : 'pb-20 md:pb-0'}`}>
      {children}
    </main>
  );
}
