'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useHeader } from './HeaderContext';
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
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const { variant: contextVariant } = useHeader();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [shouldHideCloseBtn, setShouldHideCloseBtn] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleCloseMenu = useCallback(() => {
    setShouldHideCloseBtn(true);
    setMenuOpen(false);
    setTimeout(() => setShouldHideCloseBtn(false), 400);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setShouldHideCloseBtn(false);
    setMenuOpen(true);
  }, []);

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
            <img
              src="/images/logo.svg"
              alt={locale === 'ua' ? 'Чудодієво' : 'Chudodievo'}
              className="h-8 w-auto transition-all duration-300"
              style={{
                filter: useDarkHeader ? 'grayscale(100%) brightness(0)' : 'none',
              }}
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
            <div className={`flex items-center gap-2 rounded-sm p-1 ${
              useDarkHeader ? 'bg-neutral-200' : 'bg-white/10 backdrop-blur border border-white/30'
            }`}>
              {(['ua', 'en'] as const).map((code) => (
                <button
                  key={code}
                  className={`rounded-sm px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition ${
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
              className="flex flex-col justify-center gap-1.5 rounded p-2 md:hidden"
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
      {menuOpen && (
        <AnimatePresence>
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md md:hidden"
              aria-hidden="true"
              onTouchEnd={handleCloseMenu}
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            />

            {/* Menu Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[61] w-[min(88vw,320px)] bg-[var(--color-surface)] shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <nav className="flex flex-col gap-4 pt-24 pb-8 pl-8 pr-6" aria-label="Mobile">
                {NAV_ITEMS.map(({ key, href }, i) => (
                  <motion.a
                    key={key}
                    href={href}
                    onClick={handleCloseMenu}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                    className="font-light leading-relaxed text-[var(--color-neutral-900)] tracking-[0.04em] hover:opacity-70"
                    style={{ fontWeight: 300, fontSize: '1.05rem' }}
                  >
                    {t(`common.${key}`)}
                  </motion.a>
                ))}
              </nav>
            </motion.aside>
          </>
        </AnimatePresence>
      )}

      {/* Close Button - hidden immediately on close to prevent flicker, but menu animates */}
      {menuOpen && !shouldHideCloseBtn && (
        <div
          className="fixed right-6 top-6 z-[62] md:hidden"
          style={{ 
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            pointerEvents: 'auto',
          }}
        >
          <div
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCloseMenu();
              return false;
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCloseMenu();
              return false;
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-neutral-900)] shadow-lg outline-none ios-no-flicker"
            role="button"
            aria-label="Close menu"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              WebkitAppearance: 'none',
              cursor: 'default',
              touchAction: 'none',
              pointerEvents: 'auto',
            }}
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
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
