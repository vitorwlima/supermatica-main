import React from 'react'
import { Container, CorrectSelector } from './styles'
import * as Yup from 'yup'
import { Button, Input, TextArea, Wrapper } from '../../components'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from '@unform/web'
import { useState } from 'react'
import { ISubject } from '../../interfaces'
import { useEffect } from 'react'
import api from '../../services/api'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { getValidationErrors } from '../../utils'

interface IParams {
  slug: string
}

interface IFormData {
  questionText: string
  resolution: string
  firstAlternative: string
  secondAlternative: string
  thirdAlternative: string
  fourthAlternative: string
  fifthAlternative: string
}

const AdminExerciseCreate = () => {
  const { slug }: IParams = useParams()
  const history = useHistory()

  const formRef = useRef<FormHandles>(null)
  const [subject, setSubject] = useState<ISubject | null>(null)
  const [correctAlternative, setCorrectAlternative] = useState(0)

  useEffect(() => {
    const getSubject = async () => {
      const { data } = await api.get(`/subjects/${slug}`)
      setSubject(data)
    }

    getSubject()
  }, [slug])

  const breadCrumbs = [
    { label: 'Admin', path: '/admin' },
    { label: subject?.subjectText || slug, path: `/admin/${slug}` },
    { label: 'Novo exercício' },
  ]

  const handleCreateQuestion: SubmitHandler<IFormData> = async formData => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        questionText: Yup.string().required('Insira a questão.'),
        resolution: Yup.string().url('Digite um link válido.').required('Insira a resolução.'),
        firstAlternative: Yup.string().required('Insira a alternativa.'),
        secondAlternative: Yup.string().required('Insira a alternativa.'),
        thirdAlternative: Yup.string().required('Insira a alternativa.'),
        fourthAlternative: Yup.string().required('Insira a alternativa.'),
        fifthAlternative: Yup.string().required('Insira a alternativa.'),
      })

      await schema.validate(formData, { abortEarly: false })

      const { data } = await api.post('/question', {
        questionText: formData.questionText,
        resolution: formData.resolution,
        subjectId: subject?._id,
      })

      await api.post('/alternative', {
        alternativeText: formData.firstAlternative,
        isCorrect: correctAlternative === 0,
        questionId: data._id,
      })
      await api.post('/alternative', {
        alternativeText: formData.secondAlternative,
        isCorrect: correctAlternative === 1,
        questionId: data._id,
      })
      await api.post('/alternative', {
        alternativeText: formData.thirdAlternative,
        isCorrect: correctAlternative === 2,
        questionId: data._id,
      })
      await api.post('/alternative', {
        alternativeText: formData.fourthAlternative,
        isCorrect: correctAlternative === 3,
        questionId: data._id,
      })
      await api.post('/alternative', {
        alternativeText: formData.fifthAlternative,
        isCorrect: correctAlternative === 4,
        questionId: data._id,
      })

      toast.success('Exercício criado com sucesso', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      history.push(`/admin/${slug}`)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      } else {
        const errorMessage =
          (error && error.response && error.response.data && error.response.data.error) || 'Ocorreu um erro.'
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  }

  return (
    <Wrapper breadCrumbs={breadCrumbs}>
      <Container>
        <Form onSubmit={handleCreateQuestion} ref={formRef}>
          <div className='question'>
            <TextArea name='questionText' label='Insira a questão:' rows={4} />
          </div>
          <div className='resolution'>
            <Input name='resolution' label='Insira o link da resolução:' />
          </div>
          <div className='alternatives'>
            <div className='alternative'>
              <Input name='firstAlternative' label='Insira a alternativa 1:' />
              <CorrectSelector isSelected={correctAlternative === 0} onClick={() => setCorrectAlternative(0)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input name='secondAlternative' label='Insira a alternativa 2:' />
              <CorrectSelector isSelected={correctAlternative === 1} onClick={() => setCorrectAlternative(1)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input name='thirdAlternative' label='Insira a alternativa 3:' />
              <CorrectSelector isSelected={correctAlternative === 2} onClick={() => setCorrectAlternative(2)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input name='fourthAlternative' label='Insira a alternativa 4:' />
              <CorrectSelector isSelected={correctAlternative === 3} onClick={() => setCorrectAlternative(3)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input name='fifthAlternative' label='Insira a alternativa 5:' />
              <CorrectSelector isSelected={correctAlternative === 4} onClick={() => setCorrectAlternative(4)}>
                <div></div>
              </CorrectSelector>
            </div>
          </div>
          <div className='button'>
            <Button type='submit'>Criar</Button>
          </div>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default AdminExerciseCreate
