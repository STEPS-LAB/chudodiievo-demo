import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookingStore = create(
  persist(
    (set, get) => ({
      // State
      selectedRoom: null,
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
      step: 1,
      confirmation: null,

      // Actions
      setSelectedRoom: (room) => set({ selectedRoom: room }),
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (adults, children) => set({ adults, children }),
      setStep: (step) => set({ step }),
      setConfirmation: (confirmation) => set({ confirmation }),

      reset: () => set({
        selectedRoom: null,
        checkIn: null,
        checkOut: null,
        adults: 2,
        children: 0,
        step: 1,
        confirmation: null,
      }),

      // Computed
      getNights: () => {
        const { checkIn, checkOut } = get()
        if (!checkIn || !checkOut) return 0
        return Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)
      },

      getTotalPrice: () => {
        const { selectedRoom } = get()
        const nights = get().getNights()
        if (!selectedRoom || !nights) return 0
        return selectedRoom.price * nights
      },
    }),
    {
      name: 'chudodiievo-booking',
      partialize: (state) => ({
        selectedRoom: state.selectedRoom,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        adults: state.adults,
        children: state.children,
      }),
    }
  )
)
