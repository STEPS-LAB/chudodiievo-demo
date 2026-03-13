import { Link, NavLink } from 'react-router-dom'
import { TreePine, Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useUiStore } from '@/store/uiStore'
import { NAV_LINKS } from '@/constants'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import MobileNav from './MobileNav'

export default function Header() {
  const { scrolled } = useScrollPosition()
  const { mobileMenuOpen, toggleMobileMenu } = useUiStore()

  return (
    <>
      <header
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
                Чудодієво
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 text-sm font-medium font-display rounded-sm transition-colors duration-200 relative group',
                      scrolled
                        ? isActive
                          ? 'text-primary-900'
                          : 'text-neutral-600 hover:text-primary-900'
                        : isActive
                          ? 'text-white'
                          : 'text-white/80 hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={cn(
                        'absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-200 origin-left',
                        scrolled ? 'bg-primary-900' : 'bg-white',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+380000000000"
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
                  scrolled ? 'text-neutral-600 hover:text-primary-900' : 'text-white/80 hover:text-white'
                )}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">+38 (000) 000-00-00</span>
              </a>
              <Link to="/rooms">
                <Button
                  size="sm"
                  variant={scrolled ? 'primary' : 'light'}
                >
                  Забронювати
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-sm transition-colors duration-200',
                scrolled
                  ? 'text-primary-900 hover:bg-primary-50'
                  : 'text-white hover:bg-white/10'
              )}
              onClick={toggleMobileMenu}
              aria-label="Відкрити меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  )
}
