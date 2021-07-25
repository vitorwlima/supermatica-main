import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export const useAuth = () => {
  const value = useContext(UserContext)
  return value
}
