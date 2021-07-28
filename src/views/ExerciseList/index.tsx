import React from 'react'
import { useParams } from 'react-router-dom'
import { ExerciseCard, Wrapper } from '../../components'
import { Container } from './styles'

interface IParams {
  slug: string
}

const ExerciseList = () => {
  const { slug }: IParams = useParams()

  return (
    <Wrapper>
      <Container>
        <ExerciseCard
          exercise={'(UFRGS 2015) - Era uma vez...'}
          slug={slug}
          id={'12dsadsadsada856973'}
          tags={['Produto notável', 'Cálculo exponencial']}
          alreadySolved
        />
      </Container>
    </Wrapper>
  )
}

export default ExerciseList
