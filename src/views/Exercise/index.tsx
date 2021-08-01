import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccessToken } from '../../AuthenticationToken'
import { Wrapper, Exercise as ExerciseComponent } from '../../components'
import { IQuestion, ISubject } from '../../interfaces'
import api from '../../services/api'
import { Container } from './styles'

interface IParams {
  slug: string
  id: string
}

const Exercise = () => {
  const { slug, id }: IParams = useParams()
  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [subject, setSubject] = useState<ISubject | null>(null)

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const breadCrumbs = [
    { label: 'Conteúdos', path: '/conteudos' },
    { label: subject?.subjectText || 'Conteúdo', path: `/conteudos/${slug}` },
    { label: question?.questionText.substr(0, 10) || 'Exercício' },
  ]

  useEffect(() => {
    const getQuestion = async () => {
      const { data } = await api.get(`/question/${id}`)
      setQuestion(data)
    }

    const getSubject = async () => {
      const { data } = await api.get(`/subjects/${slug}`)
      setSubject(data)
    }

    getSubject()
    getQuestion()
  }, [id, slug])

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        <ExerciseComponent
          question={question?.questionText || ''}
          alternatives={question?.alternatives || []}
          resolution={question?.resolution || ''}
        />
      </Container>
    </Wrapper>
  )
}

export default Exercise
