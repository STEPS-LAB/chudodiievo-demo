import { create } from 'zustand'

export const useUiStore = create((set) => ({
  mobileMenuOpen: false,
  searchPanelOpen: false,

  setMobileMenuOpen: (open) => {
    set({ mobileMenuOpen: open })
    document.body.style.overflow = open ? 'hidden' : ''
  },

  setSearchPanelOpen: (open) => set({ searchPanelOpen: open }),

  toggleMobileMenu: () =>
    set((state) => {
      const next = !state.mobileMenuOpen
      document.body.style.overflow = next ? 'hidden' : ''
      return { mobileMenuOpen: next }
    }),
}))
