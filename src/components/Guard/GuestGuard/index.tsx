import React, { ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../../hooks/UseAuth'

interface IGuestGuardProps {
  children: ReactNode
}

export const GuestGuard = ({ children }: IGuestGuardProps) => {
  const { user } = useAuth()

  if (user) {
    return <Redirect to='/' />
  }

  return <>{children}</>
}
