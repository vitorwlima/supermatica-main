import React, { ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../../hooks/UseAuth'

interface IAdminProps {
  children: ReactNode
}

export const AdminGuardd = ({ children }: IAdminProps) => {
  const { user } = useAuth()

  if (!user || !user.admin) {
    return <Redirect to='/' />
  }

  return <>{children}</>
}
