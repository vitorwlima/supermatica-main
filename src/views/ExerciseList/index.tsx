import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccessToken } from '../../AuthenticationToken'
import { ExerciseCard, Wrapper } from '../../components'
import { IQuestion } from '../../interfaces'
import api from '../../services/api'
import { Container } from './styles'

interface IParams {
  slug: string
}

const ExerciseList = () => {
  const { slug }: IParams = useParams()
  const [questions, setQuestions] = useState<IQuestion[]>([])

  const breadCrumbs = [{ label: 'Conteúdos', path: '/conteudos' }, { label: 'Matemática Básica' }]

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await api.get(`/questions/${slug}`)
      if (data) {
        setQuestions(data)
      }
    }

    getQuestions()
  }, [slug])

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        {questions.map(question => (
          <ExerciseCard
            key={question._id}
            exercise={question.questionText.substr(0, 10)}
            slug={slug}
            id={question._id}
            tags={question.tags}
            alreadySolved
          />
        ))}
      </Container>
    </Wrapper>
  )
}

export default ExerciseList
