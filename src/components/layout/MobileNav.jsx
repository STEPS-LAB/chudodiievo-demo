import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { TreePine, Phone, Mail, X } from 'lucide-react'
import { useUiStore } from '@/store/uiStore'
import { NAV_LINKS } from '@/constants'
import { cn } from '@/utils/cn'

export default function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore()

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-white shadow-xl lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary-100 rounded-sm">
                  <TreePine className="w-5 h-5 text-primary-900" />
                </div>
                <span className="text-lg font-bold font-display text-primary-900">Чудодієво</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-primary-900 hover:bg-primary-50 rounded-sm transition-colors"
                aria-label="Закрити меню"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-6 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <NavLink
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center h-12 px-4 rounded-sm text-base font-medium font-display transition-colors duration-150',
                        isActive
                          ? 'bg-primary-900 text-white'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-900'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-100 space-y-3">
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full h-12 bg-primary-900 text-white font-semibold font-display rounded-sm hover:bg-primary-800 transition-colors"
              >
                Забронювати номер
              </Link>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <Phone className="w-4 h-4" />
                <a href="tel:+380000000000" className="hover:text-primary-900 transition-colors">
                  +38 (000) 000-00-00
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@chudodiievo.com" className="hover:text-primary-900 transition-colors">
                  info@chudodiievo.com
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
