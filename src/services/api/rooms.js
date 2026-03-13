import { ROOMS } from '@/constants'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const roomsApi = {
  async getAll({ category, sort, guests, minPrice, maxPrice } = {}) {
    await delay(600)
    let rooms = [...ROOMS]

    if (category && category !== 'all') {
      rooms = rooms.filter((r) => r.category === category)
    }
    if (guests) {
      rooms = rooms.filter((r) => r.maxGuests >= Number(guests))
    }
    if (minPrice) {
      rooms = rooms.filter((r) => r.price >= Number(minPrice))
    }
    if (maxPrice) {
      rooms = rooms.filter((r) => r.price <= Number(maxPrice))
    }
    if (sort === 'price_asc') rooms.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') rooms.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') rooms.sort((a, b) => b.rating - a.rating)
    else rooms.sort((a, b) => b.reviewCount - a.reviewCount)

    return rooms
  },

  async getBySlug(slug) {
    await delay(400)
    const room = ROOMS.find((r) => r.slug === slug)
    if (!room) throw new Error('Номер не знайдено')
    return room
  },

  async getFeatured() {
    await delay(400)
    return ROOMS.filter((r) => r.featured)
  },
}
