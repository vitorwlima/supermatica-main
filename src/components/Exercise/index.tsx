import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../'
import { getAccessToken } from '../../AuthenticationToken'
import { useAuth } from '../../hooks/UseAuth'
import { IAlternative } from '../../interfaces'
import api from '../../services/api'
import { Player } from '../Player'
import { Alternative, Container } from './styles'

interface IExerciseProps {
  question: string
  alternatives: IAlternative[]
  resolution: string
}

interface IParams {
  id: string
}

export const Exercise = ({ question, alternatives, resolution }: IExerciseProps) => {
  const { id }: IParams = useParams()
  const { user, getUser } = useAuth()

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const [selectedAlternative, setSelectedAlternative] = useState('')
  const [alternativeStatus, setAlternativeStatus] = useState<'initial' | 'correct' | 'incorrect'>('initial')
  const [showResolution, setShowResolution] = useState(false)

  const handleFinishQuestion = async () => {
    const alternative = alternatives.find(alternative => alternative.alternativeText === selectedAlternative)
    if (alternative?.isCorrect) {
      setAlternativeStatus('correct')
      if (!user?.answeredQuestions.some(answered => answered.questionId === id)) {
        await api.post('/question-answer', { questionId: id, isCorrect: true })
      }
    } else {
      setAlternativeStatus('incorrect')
      if (!user?.answeredQuestions.some(answered => answered.questionId === id)) {
        await api.post('/question-answer', { questionId: id, isCorrect: false })
      }
    }

    getUser()
  }

  const handleTryAgain = useCallback(() => {
    setAlternativeStatus('initial')
    setSelectedAlternative('')
  }, [])

  return (
    <Container hasFinished={alternativeStatus === 'correct' || alternativeStatus === 'incorrect'}>
      <h2 className='question'>{question}</h2>
      <div className='alternatives'>
        {alternatives.map((alt, index) => (
          <Alternative
            key={alt._id}
            onClick={alternativeStatus === 'initial' ? () => setSelectedAlternative(alt.alternativeText) : () => {}}
            isSelected={alt.alternativeText === selectedAlternative}
            isCorrectAndFinished={
              (alternativeStatus === 'correct' && alt.alternativeText === selectedAlternative) ||
              (alternativeStatus === 'incorrect' && showResolution && alt.isCorrect)
            }
            isIncorrectAndSelected={alternativeStatus === 'incorrect' && selectedAlternative === alt.alternativeText}
          >
            <div className='circleToMark'></div>
            <span className='alternativeLetter'>
              {index === 0 && 'a)'}
              {index === 1 && 'b)'}
              {index === 2 && 'c)'}
              {index === 3 && 'd)'}
              {index === 4 && 'e)'}
            </span>
            <span>{alt.alternativeText}</span>
          </Alternative>
        ))}
      </div>
      {selectedAlternative && alternativeStatus === 'initial' && !showResolution && (
        <Button onClick={handleFinishQuestion}>Terminar</Button>
      )}
      {alternativeStatus === 'correct' && !showResolution && (
        <div className='correctLabelWrapper'>
          <span className='statusLabel'>Parabéns, você acertou!</span>
          <Button onClick={() => setShowResolution(true)}>Ver resolução</Button>
        </div>
      )}
      {alternativeStatus === 'incorrect' && !showResolution && (
        <div>
          <span className='statusLabel'>Resposta incorreta.</span>
          <div className='buttonsWrapper'>
            <Button onClick={handleTryAgain}>Tentar novamente</Button>
            <Button onClick={() => setShowResolution(true)}>Ver resolução</Button>
          </div>
        </div>
      )}
      {showResolution && (
        <div className='resolution'>
          <h3>Resolução:</h3>
          <Player url={resolution} />
        </div>
      )}
    </Container>
  )
}
