import React from 'react'
import { useParams } from 'react-router-dom'
import { Wrapper } from '../../components'
import { Container } from './styles'

interface IParams {
  slug: string
  id: string
}

const Exercise = () => {
  const { slug, id }: IParams = useParams()
  return (
    <Wrapper>
      <Container>
        <div>oi</div>
        <div>slug: {slug}</div>
        <div>id: {id}</div>
      </Container>
    </Wrapper>
  )
}

export default Exercise
