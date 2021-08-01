import React from 'react'
import { SubjectCard, Wrapper } from '../../components'
import { Container } from './styles'

const HomeAdmin = () => {
  return (
    <Wrapper breadCrumbs={[{ label: 'Admin' }]}>
      <Container>
        <SubjectCard subject='Matemática básica' exercises={10} slug='matematica-basica' isAdmin />
      </Container>
    </Wrapper>
  )
}

export default HomeAdmin
