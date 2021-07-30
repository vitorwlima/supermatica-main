import React, { ReactNode } from 'react'
import { Content, Sidebar, Topbar } from '../'
import { Container } from './styles'

interface IBreadCrumbs {
  label: string
  path?: string
}
interface IWrapperProps {
  children?: ReactNode
  breadCrumbs?: IBreadCrumbs[]
}

export const Wrapper = ({ children, breadCrumbs }: IWrapperProps) => {
  return (
    <Container>
      <Sidebar />
      <div className='content'>
        <Topbar breadCrumbs={breadCrumbs} />
        <Content>{children}</Content>
      </div>
    </Container>
  )
}
