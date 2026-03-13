const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const bookingApi = {
  async checkAvailability({ roomSlug, checkIn, checkOut }) {
    await delay(800)
    // Mock: always available unless dates overlap a fake blocked range
    return { available: true, nights: Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000) }
  },

  async createBooking(bookingData) {
    await delay(1500)
    // Mock: generate confirmation number
    const confirmationNumber = `CHD-${Date.now().toString(36).toUpperCase()}`
    return {
      id: confirmationNumber,
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
  },
}
