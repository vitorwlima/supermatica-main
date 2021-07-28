import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

import { Container } from './styles'

interface ISubjectCardProps {
  subject: string
  exercises: number
  slug: string
}

export const SubjectCard = ({ subject, exercises, slug }: ISubjectCardProps) => {
  const history = useHistory()

  const handleRedirect = useCallback(() => {
    history.push(`/conteudos/${slug}`)
  }, [history, slug])

  return (
    <Container onClick={handleRedirect}>
      <div>
        <h2>{subject}</h2>
        <span>{exercises} Exercícios</span>
      </div>
      <div>
        <FaChevronRight />
      </div>
    </Container>
  )
}
