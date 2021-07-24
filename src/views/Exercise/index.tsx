import React from 'react'
import { useParams } from 'react-router-dom'
import { Wrapper, Exercise as ExerciseComponent } from '../../components'
import { Container } from './styles'

interface IParams {
  slug: string
  id: string
}

const Exercise = () => {
  const { slug, id }: IParams = useParams()
  const alternatives = [
    { alternative: '1', isCorrect: false, _id: '1' },
    { alternative: '2', isCorrect: true, _id: '2' },
    { alternative: '3', isCorrect: false, _id: '3' },
    { alternative: '4', isCorrect: false, _id: '4' },
    { alternative: '5', isCorrect: false, _id: '5' },
  ]

  const resolution =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

  return (
    <Wrapper>
      <Container>
        <ExerciseComponent
          question='UFRGS (2020) - A concentração de alguns medicamentos no organismo está relacionada com a meia
-vida,
ou seja, o tempo necessário para que a
 quantidade inicial do medicamento no
organismo seja reduzida pela metade.
Considere que a meia
-vida de determinado
medicamento é de 6 horas. Sabendo que um
paciente ingeriu 120 mg desse medicamento
às 10 horas, assinale a alternativa que
representa a melhor aproximação para a
concentração desse medicamento, no
organismo desse paciente, às 16 horas do dia
seguinte.'
          alternatives={alternatives}
          resolution={resolution}
        />
      </Container>
    </Wrapper>
  )
}

export default Exercise
