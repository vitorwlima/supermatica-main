import React, { ReactNode, useState } from 'react'
import { Content, Sidebar, Topbar } from '../'
import { Container } from './styles'

interface IWrapperProps {
  children?: ReactNode
}

export const Wrapper = ({ children }: IWrapperProps) => {
  const [sidebarWidth, setSidebarWidth] = useState(0)
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)

  React.useEffect(() => console.log(sidebarWidth), [sidebarWidth])

  return (
    <Container>
      <Sidebar
        setSidebarWidth={setSidebarWidth}
        setIsSidebarHidden={setIsSidebarHidden}
        isSidebarHidden={isSidebarHidden}
      />
      <Topbar sidebarWidth={sidebarWidth} isSidebarHidden={isSidebarHidden} />
      <Content sidebarWidth={sidebarWidth} isSidebarHidden={isSidebarHidden}>
        {children}
      </Content>
    </Container>
  )
}