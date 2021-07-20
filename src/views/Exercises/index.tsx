import React from 'react'
import { useParams } from 'react-router-dom'
import { Wrapper } from '../../components'
import { Container } from './styles'

interface IParams {
  slug: string
}

const Exercises = () => {
  const { slug }: IParams = useParams()

  return (
    <Wrapper>
      <Container>{slug}</Container>
    </Wrapper>
  )
}

export default Exercises
