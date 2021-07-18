import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components'
import { Container } from './styles'

const NotFound = () => {
  const history = useHistory()

  const handleRedirectHome = () => {
    history.push('/')
  }

  return (
    <Container>
      <div className='number'>404</div>
      <p>A página que você está procurando não foi encontrada :(</p>
      <Button onClick={handleRedirectHome} className='homeButton'>
        Voltar para a página inicial
      </Button>
    </Container>
  )
}

export default NotFound
