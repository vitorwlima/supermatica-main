import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

import { Container } from './styles'

interface ISubjectCardProps {
  subject: string
  exercises: number
  slug: string
  isAdmin?: boolean
}

export const SubjectCard = ({ subject, exercises, slug, isAdmin }: ISubjectCardProps) => {
  const history = useHistory()

  const handleRedirect = useCallback(() => {
    if (isAdmin) {
      return history.push(`/admin/${slug}`)
    }

    history.push(`/conteudos/${slug}`)
  }, [history, slug, isAdmin])

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
