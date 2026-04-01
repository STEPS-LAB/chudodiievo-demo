import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '../layout/RootLayout'
import { PageSpinner } from '@/components/ui/Spinner'

const Home = lazy(() => import('@/pages/Home'))
const Rooms = lazy(() => import('@/pages/Rooms'))
const RoomDetail = lazy(() => import('@/pages/RoomDetail'))
const Booking = lazy(() => import('@/pages/Booking'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Confirmation = lazy(() => import('@/pages/Confirmation'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<PageSpinner />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper><Home /></SuspenseWrapper>,
      },
      {
        path: 'rooms',
        element: <SuspenseWrapper><Rooms /></SuspenseWrapper>,
      },
      {
        path: 'rooms/:slug',
        element: <SuspenseWrapper><RoomDetail /></SuspenseWrapper>,
      },
      {
        path: 'booking',
        element: <SuspenseWrapper><Booking /></SuspenseWrapper>,
      },
      {
        path: 'checkout',
        element: <SuspenseWrapper><Checkout /></SuspenseWrapper>,
      },
      {
        path: 'confirmation',
        element: <SuspenseWrapper><Confirmation /></SuspenseWrapper>,
      },
      {
        path: 'contact',
        element: <SuspenseWrapper><Contact /></SuspenseWrapper>,
      },
      {
        path: '*',
        element: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
      },
    ],
  },
])
