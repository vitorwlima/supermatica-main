import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAccessToken } from '../../AuthenticationToken'
import { Button, SubjectCard, Wrapper } from '../../components'
import { ISubject } from '../../interfaces'
import api from '../../services/api'
import { Container } from './styles'

const HomeAdmin = () => {
  const history = useHistory()
  const [subjects, setSubjects] = useState<ISubject[]>([])

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  useEffect(() => {
    const getSubjects = async () => {
      const { data } = await api.get('/subjects')
      if (data) {
        setSubjects(data)
      }
    }

    getSubjects()
  }, [])

  const handleRedirectNew = useCallback(() => {
    history.push('/admin/new')
  }, [history])

  return (
    <Wrapper breadCrumbs={[{ label: 'Admin' }]}>
      <Container>
        <Button onClick={handleRedirectNew}>Novo conteúdo</Button>
        <div>
          {subjects.map(subject => (
            <SubjectCard
              key={subject.slug}
              subject={subject.subjectText}
              exercises={subject.questions.length}
              slug={subject.slug}
              isAdmin
            />
          ))}
        </div>
      </Container>
    </Wrapper>
  )
}

export default HomeAdmin
