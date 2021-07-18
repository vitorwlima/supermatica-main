import React, { ReactNode } from 'react'
import { Container } from './styles'

interface IContentProps {
  children?: ReactNode
  sidebarWidth: number
  isSidebarHidden: boolean
}

export const Content = ({ children, sidebarWidth, isSidebarHidden }: IContentProps) => {
  return (
    <Container sidebarWidth={sidebarWidth} isSidebarHidden={isSidebarHidden}>
      {children}
    </Container>
  )
}
