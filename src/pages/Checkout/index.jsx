import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/booking', { replace: true })
  }, [navigate])

  return null
}
