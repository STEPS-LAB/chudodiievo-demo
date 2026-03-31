'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useHeader } from './HeaderContext';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '@/components/booking/BookingModal';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/#about', key: 'about' },
  { href: '/#rooms', key: 'rooms' },
  { href: '/restaurant', key: 'restaurant' },
  { href: '/activities', key: 'activities' },
  { href: '/#pool', key: 'pool' },
  { href: '/contacts', key: 'contacts' },
] as const;

interface HeaderProps {
  variant?: 'light' | 'dark';
}

export default function Header({ variant: pageVariant }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const { variant: contextVariant } = useHeader();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [menuDragX, setMenuDragX] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const panelTouchStartXRef = useRef<number | null>(null);
  const panelTouchStartYRef = useRef<number | null>(null);
  const panelDragXRef = useRef(0);
  const edgeTouchStartXRef = useRef<number | null>(null);
  const edgeTouchStartYRef = useRef<number | null>(null);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
    panelDragXRef.current = 0;
    setMenuDragX(0);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const handleNav = useCallback((href: string) => {
    handleCloseMenu();
    const [pathPart, hashPart] = href.split('#');
    const targetPath = pathPart || '/';
    const hashId = hashPart || '';
    const hash = hashPart ? `#${hashPart}` : '';

    if (!hash) {
      router.push(targetPath);
      return;
    }

    if (pathname === targetPath) {
      requestAnimationFrame(() => {
        const targetEl = document.getElementById(hashId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        history.replaceState(null, '', `${targetPath}${hash}`);
      });
      return;
    }

    router.push(`${targetPath}${hash}`);
  }, [handleCloseMenu, pathname, router]);

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Use page variant if provided, otherwise use context variant
  const effectiveVariant = pageVariant || contextVariant;
  
  // Force dark variant when specified (for pages without hero)
  const forceDark = effectiveVariant === 'dark';
  const useDarkHeader = forceDark || isScrolled;

  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) return;
    const EDGE_THRESHOLD = 40;
    const SWIPE_OPEN_DISTANCE = 70;

    const onTouchStart = (e: TouchEvent) => {
      const x = e.touches[0]?.clientX;
      const y = e.touches[0]?.clientY;
      if (typeof x !== 'number') return;
      if (typeof y !== 'number') return;
      edgeTouchStartXRef.current = window.innerWidth - x <= EDGE_THRESHOLD ? x : null;
      edgeTouchStartYRef.current = y;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const startX = edgeTouchStartXRef.current;
      const startY = edgeTouchStartYRef.current;
      edgeTouchStartXRef.current = null;
      edgeTouchStartYRef.current = null;
      if (typeof startX !== 'number') return;
      if (typeof startY !== 'number') return;
      const endX = e.changedTouches[0]?.clientX;
      const endY = e.changedTouches[0]?.clientY;
      if (typeof endX !== 'number') return;
      if (typeof endY !== 'number') return;
      const deltaX = startX - endX;
      const deltaY = Math.abs(startY - endY);
      if (deltaX > SWIPE_OPEN_DISTANCE && deltaX > deltaY) {
        handleOpenMenu();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [menuOpen, handleOpenMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 h-[4.5rem] min-h-[4.5rem] ${
          useDarkHeader
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent backdrop-blur-md'
        }`}
      >
        <div className="container flex items-center justify-between h-[4.5rem] min-h-[4.5rem]">
          {/* Logo */}
          <Link
            href="/"
            className={`transition-colors ${
              useDarkHeader ? 'text-[var(--color-neutral-900)]' : 'text-white'
            }`}
          >
            <Image
              src="/images/logo.svg"
              alt={locale === 'ua' ? 'Чудодієво' : 'Chudodievo'}
              width={120}
              height={32}
              className="h-8 w-auto transition-all duration-300"
              style={{
                filter: useDarkHeader ? 'grayscale(100%) brightness(0)' : 'none',
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`group relative text-sm font-light tracking-[0.06em] transition hover:opacity-80 ${
                  useDarkHeader ? 'text-[var(--color-neutral-900)]' : 'text-white'
                }`}
              >
                {t(`common.${key}`)}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <div className={`flex items-center gap-1 rounded-sm p-0 ${
              useDarkHeader ? 'bg-neutral-200' : 'bg-white/10 backdrop-blur border border-white/30'
            }`}>
              {(['ua', 'en'] as const).map((code) => (
                <button
                  key={code}
                  className={`flex h-9 min-w-[2.75rem] items-center justify-center rounded-sm px-3 text-xs uppercase tracking-[0.14em] transition ${
                    locale === code
                      ? 'bg-primary text-white'
                      : useDarkHeader ? 'text-neutral-600 hover:bg-neutral-300' : 'text-white/90 hover:bg-white/20'
                  }`}
                  onClick={() => setLocale(code)}
                  type="button"
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Book Button */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="hidden items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-primary-900 md:inline-flex cursor-pointer"
            >
              {t('common.bookNow')}
            </button>

            {/* Burger Menu (Mobile) */}
            <button
              type="button"
              onClick={handleOpenMenu}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`h-[1.5px] w-5 rounded-full transition-colors ${
                  useDarkHeader ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded-full transition-colors ${
                  useDarkHeader ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded-full transition-colors ${
                  useDarkHeader ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md md:hidden"
              aria-hidden="true"
              onClick={handleCloseMenu}
            />

            <button
              key="close-btn"
              type="button"
              onClick={handleCloseMenu}
              className="fixed right-6 top-6 z-[62] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-neutral-900)] shadow-lg outline-none md:hidden ios-no-flicker"
              aria-label="Close menu"
            >
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden>
                <span
                  className="absolute h-[1.5px] w-5 rounded-full bg-[var(--color-neutral-900)]"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <span
                  className="absolute h-[1.5px] w-5 rounded-full bg-[var(--color-neutral-900)]"
                  style={{ transform: 'rotate(-45deg)' }}
                />
              </span>
            </button>

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: menuDragX }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed inset-y-0 right-0 z-[61] w-[min(88vw,320px)] bg-[var(--color-surface)] shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onTouchStart={(e) => {
                panelTouchStartXRef.current = e.touches[0]?.clientX ?? null;
                panelTouchStartYRef.current = e.touches[0]?.clientY ?? null;
                panelDragXRef.current = 0;
              }}
              onTouchMove={(e) => {
                const startX = panelTouchStartXRef.current;
                const startY = panelTouchStartYRef.current;
                if (typeof startX !== 'number') return;
                if (typeof startY !== 'number') return;
                const currentX = e.touches[0]?.clientX;
                const currentY = e.touches[0]?.clientY;
                if (typeof currentX !== 'number') return;
                if (typeof currentY !== 'number') return;
                const verticalDelta = Math.abs(currentY - startY);
                const delta = Math.max(0, currentX - startX);
                if (delta <= verticalDelta) return;
                const clamped = Math.min(160, delta);
                panelDragXRef.current = clamped;
                setMenuDragX(clamped);
              }}
              onTouchEnd={() => {
                if (panelDragXRef.current > 80) {
                  handleCloseMenu();
                } else {
                  panelDragXRef.current = 0;
                  setMenuDragX(0);
                }
                panelTouchStartXRef.current = null;
                panelTouchStartYRef.current = null;
              }}
            >
              <nav className="flex flex-col gap-4 pt-24 pb-8 pl-8 pr-6" aria-label="Mobile">
                {NAV_ITEMS.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(href);
                    }}
                    className="font-light leading-relaxed text-[var(--color-neutral-900)] tracking-[0.04em] hover:opacity-70"
                    style={{ fontWeight: 300, fontSize: '1.05rem' }}
                  >
                    {t(`common.${key}`)}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Booking Modal — only loaded when opened */}
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
