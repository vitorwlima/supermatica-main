import React from 'react'
import { Container } from './styles'
import { SubjectCard, Wrapper } from '../../components'

const Conteudos = () => {
  const breadCrumbs = [{ label: 'Conteúdos' }]

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        <SubjectCard subject='Matemática básica' exercises={10} slug='matematica-basica' />
      </Container>
    </Wrapper>
  )
}

export default Conteudos
