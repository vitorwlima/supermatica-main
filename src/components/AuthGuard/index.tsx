import React, { ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/UseAuth'

interface IAuthGuardProps {
  children: ReactNode
}

export const AuthGuard = ({ children }: IAuthGuardProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Redirect to='/login' />
  }

  return <>{children}</>
}
