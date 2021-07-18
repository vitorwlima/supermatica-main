import React from 'react'
import { ReactNode } from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../Button'
import { Container, ContaIcon } from './styles'

interface ITopbarProps {
  children?: ReactNode
  sidebarWidth: number
  isSidebarHidden: boolean
}

export const Topbar = ({ children, sidebarWidth, isSidebarHidden }: ITopbarProps) => {
  const history = useHistory()

  const handleRedirectAccount = useCallback(() => {
    history.push('/conta')
  }, [history])

  return (
    <Container sidebarWidth={sidebarWidth} isSidebarHidden={isSidebarHidden}>
      {children}
      <div className='breadCrumbs'>
        <Button variant='nobackground'>Conteúdos</Button>
      </div>
      <Button variant='nobackground' onClick={handleRedirectAccount}>
        <ContaIcon />
      </Button>
    </Container>
  )
}
