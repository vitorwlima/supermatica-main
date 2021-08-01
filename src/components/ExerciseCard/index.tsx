import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

import { Container } from './styles'

interface IExerciseCardProps {
  exercise: string
  tags: string[]
  alreadySolved?: boolean
  slug: string
  id: string
  isAdmin?: boolean
}

export const ExerciseCard = ({ exercise, tags, alreadySolved, slug, id, isAdmin }: IExerciseCardProps) => {
  const history = useHistory()

  const handleRedirect = useCallback(() => {
    if (isAdmin) {
      return history.push(`/admin/${slug}/${id}`)
    }

    history.push(`/conteudos/${slug}/${id}`)
  }, [history, slug, id, isAdmin])

  return (
    <Container onClick={handleRedirect}>
      <div className='contentWrapper'>
        <h2>{exercise}</h2>
        <div className='tagWrapper'>
          {tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
      <div>
        <FaChevronRight />
      </div>
      {alreadySolved && <span className='alreadySolved'>Você já resolveu essa questão</span>}
    </Container>
  )
}
