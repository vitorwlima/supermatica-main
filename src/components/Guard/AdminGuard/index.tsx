import React, { ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../../hooks/UseAuth'

interface IAdminProps {
  children: ReactNode
}

export const AdminGuard = ({ children }: IAdminProps) => {
  const { user } = useAuth()

  if (!user || !user.admin) {
    return <Redirect to='/conteudos' />
  }

  return <>{children}</>
}
