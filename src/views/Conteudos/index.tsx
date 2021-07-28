import React from 'react'
import { Container } from './styles'
import { SubjectCard, Wrapper } from '../../components'

const Conteudos = () => {
  return (
    <Wrapper>
      <Container>
        <SubjectCard subject='Matemática básica' exercises={10} slug='matematica-basica' />
      </Container>
    </Wrapper>
  )
}

export default Conteudos
