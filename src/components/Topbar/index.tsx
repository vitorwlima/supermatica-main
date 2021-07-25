import React, { useCallback, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../'
import { Container, ContaIcon } from './styles'

interface ITopbarProps {
  children?: ReactNode
}

export const Topbar = ({ children }: ITopbarProps) => {
  const history = useHistory()

  const handleRedirectAccount = useCallback(() => {
    history.push('/conta')
  }, [history])

  return (
    <Container>
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
