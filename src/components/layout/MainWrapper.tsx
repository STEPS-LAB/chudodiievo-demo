'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MainWrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <main className="flex-1 pb-20 md:pb-0">
      {children}
    </main>
  );
}
