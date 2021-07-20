import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

import { Container } from './styles'

interface IExerciseCardProps {
  subject: string
  exercises: number
  slug: string
}

export const ExerciseCard = ({ subject, exercises, slug }: IExerciseCardProps) => {
  const history = useHistory()

  const handleRedirect = useCallback(() => {
    history.push(`/exercicios/${slug}`)
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
