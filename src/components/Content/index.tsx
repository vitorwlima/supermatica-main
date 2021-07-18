import React, { ReactNode } from 'react'
import { Container } from './styles'

interface IContentProps {
  children?: ReactNode
}

export const Content = ({ children }: IContentProps) => {
  return <Container>{children}</Container>
}
