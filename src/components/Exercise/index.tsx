import React, { useCallback, useState } from 'react'
import { Button } from '../'
import { IAlternative } from '../../Interfaces'
import { Alternative, Container } from './styles'

interface IExerciseProps {
  question: string
  alternatives: IAlternative[]
  resolution: string
}

export const Exercise = ({ question, alternatives, resolution }: IExerciseProps) => {
  const [selectedAlternative, setSelectedAlternative] = useState('')
  const [alternativeStatus, setAlternativeStatus] = useState<'initial' | 'correct' | 'incorrect'>('initial')
  const [showResolution, setShowResolution] = useState(false)

  const rightAnswerIndex = alternatives.indexOf(alternatives.find(alternative => alternative.isCorrect)!)
  const rightAnswerLetter =
    (rightAnswerIndex === 0 && 'a)') ||
    (rightAnswerIndex === 1 && 'b)') ||
    (rightAnswerIndex === 2 && 'c)') ||
    (rightAnswerIndex === 3 && 'd)') ||
    (rightAnswerIndex === 4 && 'e)')

  const handleFinishQuestion = () => {
    const alternative = alternatives.find(alternative => alternative.alternative === selectedAlternative)
    if (alternative?.isCorrect) {
      setAlternativeStatus('correct')
    } else {
      setAlternativeStatus('incorrect')
    }
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
            onClick={alternativeStatus === 'initial' ? () => setSelectedAlternative(alt.alternative) : () => {}}
            isSelected={alt.alternative === selectedAlternative}
          >
            <div className='circleToMark'></div>
            <span className='alternativeLetter'>
              {index === 0 && 'a)'}
              {index === 1 && 'b)'}
              {index === 2 && 'c)'}
              {index === 3 && 'd)'}
              {index === 4 && 'e)'}
            </span>
            <span>{alt.alternative}</span>
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
          <div>Resposta correta: {rightAnswerLetter}</div>
          <p>{resolution}</p>
        </div>
      )}
    </Container>
  )
}
