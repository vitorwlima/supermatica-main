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
}

export const ExerciseCard = ({ exercise, tags, alreadySolved, slug, id }: IExerciseCardProps) => {
  const history = useHistory()

  const handleRedirect = useCallback(() => {
    history.push(`/conteudos/${slug}/${id}`)
  }, [history, slug, id])

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
