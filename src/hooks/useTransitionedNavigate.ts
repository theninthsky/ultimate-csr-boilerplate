import { useTransition } from 'react'
import { useNavigate, To } from 'react-router-dom'

const useTransitionedNavigate = () => {
  const [, startTransition] = useTransition()
  const navigate = useNavigate()

  return (to: To) => startTransition(() => navigate(to))
}

export default useTransitionedNavigate
