import React, { useState } from 'react'
import { Container } from './styles'
import { SubjectCard, Wrapper } from '../../components'
import { useEffect } from 'react'
import api from '../../services/api'
import { ISubject } from '../../interfaces'
import { getAccessToken } from '../../AuthenticationToken'

const Conteudos = () => {
  const breadCrumbs = [{ label: 'Conteúdos' }]
  const [subjects, setSubjects] = useState<ISubject[]>([])

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await api.get(`/subjects`)
      if (data) {
        setSubjects(data)
      }
    }

    getQuestions()
  }, [])

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        {subjects.map(subject => (
          <SubjectCard
            key={subject._id}
            subject={subject.subjectText}
            exercises={subject.questions.length}
            slug={subject.slug}
          />
        ))}
      </Container>
    </Wrapper>
  )
}

export default Conteudos
