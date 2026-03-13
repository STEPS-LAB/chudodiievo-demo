'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/#about', key: 'about' },
  { href: '/rooms', key: 'rooms' },
  { href: '/restaurant', key: 'restaurant' },
  { href: '/spa', key: 'spa' },
  { href: '/blog', key: 'blog' },
  { href: '/contacts', key: 'contacts' },
] as const;

export default function Header() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent backdrop-blur-md'
        }`}
      >
        <div className="container flex items-center justify-between h-[4.5rem] min-h-[4.5rem]">
          {/* Logo */}
          <Link
            href="/"
            className={`text-sm font-medium tracking-[0.28em] transition-colors ${
              isScrolled ? 'text-[var(--color-neutral-900)]' : 'text-white'
            }`}
          >
            {locale === 'ua' ? 'ЧУДОДІЄВО' : 'CHUDODIEVO'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`group relative text-sm font-light tracking-[0.06em] transition hover:opacity-80 ${
                  isScrolled ? 'text-[var(--color-neutral-900)]' : 'text-white'
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
            <div className="flex items-center gap-2 rounded-sm border border-white/30 bg-black/15 p-1 backdrop-blur">
              {(['ua', 'en'] as const).map((code) => (
                <button
                  key={code}
                  className={`rounded-sm px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition ${
                    locale === code
                      ? 'bg-[#B59456] text-black'
                      : 'text-white/85 hover:bg-white/15'
                  }`}
                  onClick={() => setLocale(code)}
                  type="button"
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Book Button */}
            <Link
              href="/rooms"
              className="hidden items-center justify-center rounded-sm bg-[#4A4A40] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#3D3D35] md:inline-flex"
            >
              {t('common.bookNow')}
            </Link>

            {/* Burger Menu (Mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex flex-col justify-center gap-1.5 rounded p-2 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`h-[1.5px] w-5 rounded-full transition-colors ${
                  isScrolled ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded-full transition-colors ${
                  isScrolled ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded-full transition-colors ${
                  isScrolled ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md md:hidden"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="fixed right-6 top-6 z-[62] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-neutral-900)] shadow-lg outline-none transition-opacity active:opacity-70 md:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
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
            </motion.button>

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
              <nav className="flex flex-col gap-1 pt-24 pb-8 pl-8 pr-6" aria-label="Mobile">
                {NAV_ITEMS.map(({ key, href }, i) => (
                  <motion.a
                    key={key}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                    className="font-light leading-relaxed text-[var(--color-neutral-900)] tracking-[0.04em] hover:opacity-70"
                    style={{ fontWeight: 300, fontSize: '1.05rem' }}
                  >
                    {t(`common.${key}`)}
                  </motion.a>
                ))}
                {/* Mobile Book Button */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + NAV_ITEMS.length * 0.05, duration: 0.3, ease: 'easeOut' }}
                  className="mt-6"
                >
                  <Link
                    href="/rooms"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-sm bg-[#4A4A40] px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white shadow-sm transition-all duration-300 hover:bg-[#3D3D35]"
                  >
                    {t('common.bookNow')}
                  </Link>
                </motion.div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
