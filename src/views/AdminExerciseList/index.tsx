import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, ExerciseCard, Wrapper } from '../../components'
import { ISubject } from '../../interfaces'
import api from '../../services/api'
import { Container } from './styles'

interface IParams {
  slug: string
}

const AdminExerciseList = () => {
  const { slug }: IParams = useParams()
  const history = useHistory()
  const [subject, setSubject] = useState<ISubject | null>(null)

  const breadCrumbs = [{ label: 'Admin', path: '/admin' }, { label: subject?.subjectText || slug }]

  useEffect(() => {
    const getSubject = async () => {
      const { data } = await api.get(`/subjects/${slug}`)
      setSubject(data)
    }

    getSubject()
  }, [slug])

  const handleRedirectNew = useCallback(() => {
    history.push(`/admin/${slug}/new`)
  }, [history, slug])

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        <Button onClick={handleRedirectNew}>Novo exercício</Button>
        <div>
          {subject?.questions.length ? (
            subject?.questions.map(question => (
              <ExerciseCard
                exercise={question.questionText.substr(0, 10)}
                slug={slug}
                id={question._id}
                tags={question.tags}
                isAdmin
              />
            ))
          ) : (
            <div>Nenhuma pergunta cadastrada para essa matéria.</div>
          )}
        </div>
      </Container>
    </Wrapper>
  )
}

export default AdminExerciseList
