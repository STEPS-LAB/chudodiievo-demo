import { Link, useLocation } from 'react-router-dom'
import { TreePine, Menu, X } from 'lucide-react'
import { useRef } from 'react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useUiStore } from '@/store/uiStore'
import { NAV_LINKS, NAV_LABELS } from '@/constants'
import { cn } from '@/utils/cn'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/ui/Button'
import MobileNav from './MobileNav'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { pathname, hash } = useLocation()
  const { scrolled } = useScrollPosition()
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUiStore()
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const touchStartX = useRef(null)

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/' && !hash
    if (href.startsWith('/#')) return pathname === '/' && hash === href.slice(1)
    return pathname === href
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (mobileMenuOpen || touchStartX.current == null) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const swipeDistance = touchStartX.current - endX
    const startsFromRightEdge = touchStartX.current > window.innerWidth - 36

    if (startsFromRightEdge && swipeDistance > 60) {
      setMobileMenuOpen(true)
    }
  }

  return (
    <>
      <header
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-100'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className={cn(
                'p-2 rounded-sm transition-colors duration-200',
                scrolled ? 'bg-primary-100' : 'bg-white/20 backdrop-blur-sm'
              )}>
                <TreePine className={cn(
                  'w-5 h-5 transition-colors duration-200',
                  scrolled ? 'text-primary-900' : 'text-white'
                )} />
              </div>
              <span className={cn(
                'text-lg font-bold font-display tracking-tight transition-colors duration-200',
                scrolled ? 'text-primary-900' : 'text-white'
              )}>
                {isUa ? 'Готель' : 'Hotel'}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium font-display rounded-sm transition-colors duration-200 relative',
                    scrolled
                      ? isLinkActive(link.href)
                        ? 'text-primary-900'
                        : 'text-neutral-600 hover:text-primary-900'
                      : isLinkActive(link.href)
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  {NAV_LABELS[language][link.key]}
                  <span
                    className={cn(
                      'absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-200',
                      scrolled ? 'bg-primary-900' : 'bg-transparent',
                      isLinkActive(link.href) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher dark={scrolled} />
              <Link to="/rooms">
                <Button size="sm" variant={scrolled ? 'primary' : 'light'}>
                  {isUa ? 'Забронювати' : 'Book now'}
                </Button>
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher dark={scrolled} />
              <button
                className={cn(
                  'p-2 rounded-sm transition-colors duration-200',
                  scrolled
                    ? 'text-primary-900 hover:bg-primary-50'
                    : 'text-white hover:bg-white/10'
                )}
                onClick={toggleMobileMenu}
                aria-label={isUa ? 'Відкрити меню' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  )
}
