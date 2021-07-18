import React, { ReactNode } from 'react'
import { Content, Sidebar, Topbar } from '../'
import { Container } from './styles'

interface IWrapperProps {
  children?: ReactNode
}

export const Wrapper = ({ children }: IWrapperProps) => {
  return (
    <Container>
      <Sidebar />
      <div className='content'>
        <Topbar />
        <Content>{children}</Content>
      </div>
    </Container>
  )
}
