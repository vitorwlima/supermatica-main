import React from 'react'
import { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, ExerciseCard, Wrapper } from '../../components'
import { Container } from './styles'

interface IParams {
  slug: string
}

const AdminExerciseList = () => {
  const { slug }: IParams = useParams()
  const history = useHistory()

  const breadCrumbs = [{ label: 'Admin', path: '/admin' }, { label: 'Matemática Básica' }]

  const handleRedirectNew = useCallback(() => {
    history.push(`/admin/${slug}/new`)
  }, [history, slug])

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        <Button onClick={handleRedirectNew}>Novo exercício</Button>
        <div>
          <ExerciseCard
            exercise={'(UFRGS 2015) - Era uma vez...'}
            slug={slug}
            id={'12dsadsadsada856973'}
            tags={['Produto notável', 'Cálculo exponencial']}
            isAdmin
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default AdminExerciseList
