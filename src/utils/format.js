import { format, differenceInDays, addDays } from 'date-fns'
import { uk } from 'date-fns/locale'

export function formatPrice(price, currency = 'UAH') {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date, fmt = 'd MMMM yyyy') {
  if (!date) return ''
  return format(new Date(date), fmt, { locale: uk })
}

export function formatDateShort(date) {
  if (!date) return ''
  return format(new Date(date), 'd MMM', { locale: uk })
}

export function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  return differenceInDays(new Date(checkOut), new Date(checkIn))
}

export function getMinCheckOut(checkIn) {
  if (!checkIn) return addDays(new Date(), 1)
  return addDays(new Date(checkIn), 1)
}

export function formatGuests(adults, children = 0) {
  const total = adults + children
  if (total === 1) return '1 гість'
  if (total < 5) return `${total} гості`
  return `${total} гостей`
}
