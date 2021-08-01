import React, { useCallback } from 'react'
import { ButtonsWrapper, Container, CorrectSelector } from './styles'
import * as Yup from 'yup'
import Modal from 'react-modal'
import { Button, Input, TextArea, Wrapper } from '../../components'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from '@unform/web'
import { useState } from 'react'
import { IQuestion, ISubject } from '../../interfaces'
import { useEffect } from 'react'
import api from '../../services/api'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { getValidationErrors } from '../../utils'

interface IParams {
  slug: string
  id: string
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

const AdminExerciseEdit = () => {
  const { slug, id }: IParams = useParams()
  const history = useHistory()

  const formRef = useRef<FormHandles>(null)
  const [subject, setSubject] = useState<ISubject | null>(null)
  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [correctAlternative, setCorrectAlternative] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  useEffect(() => {
    const getSubject = async () => {
      const { data } = await api.get(`/subjects/${slug}`)
      setSubject(data)
    }

    const getQuestion = async () => {
      const { data } = await api.get<IQuestion>(`/question/${id}`)
      setQuestion(data)

      const isCorrect = data.alternatives.filter(alt => alt.isCorrect)[0]
      setCorrectAlternative(data.alternatives.indexOf(isCorrect))
    }

    getSubject()
    getQuestion()
  }, [slug, id])

  const breadCrumbs = [
    { label: 'Admin', path: '/admin' },
    { label: subject?.subjectText || slug, path: `/admin/${slug}` },
    { label: question?.questionText || 'Editar exercício' },
  ]

  const handleDeleteQuestion = useCallback(async () => {
    try {
      await api.delete(`/question/${id}`)

      toast.success('Exercício deletado com sucesso', {
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
  }, [id, history, slug])

  const handleEditQuestion: SubmitHandler<IFormData> = async formData => {
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

      await api.put(`/question/${id}`, {
        questionText: formData.questionText,
        resolution: formData.resolution,
      })

      if (question) {
        const deleteAnswers = question.alternatives.map(
          async alternative => await api.delete(`/alternative/${alternative._id}`)
        )
        await Promise.all(deleteAnswers)

        await api.post('/alternative', {
          alternativeText: formData.firstAlternative,
          isCorrect: correctAlternative === 0,
          questionId: id,
        })
        await api.post('/alternative', {
          alternativeText: formData.secondAlternative,
          isCorrect: correctAlternative === 1,
          questionId: id,
        })
        await api.post('/alternative', {
          alternativeText: formData.thirdAlternative,
          isCorrect: correctAlternative === 2,
          questionId: id,
        })
        await api.post('/alternative', {
          alternativeText: formData.fourthAlternative,
          isCorrect: correctAlternative === 3,
          questionId: id,
        })
        await api.post('/alternative', {
          alternativeText: formData.fifthAlternative,
          isCorrect: correctAlternative === 4,
          questionId: id,
        })
      }

      toast.success('Exercício atualizado com sucesso', {
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
        <Form onSubmit={handleEditQuestion} ref={formRef}>
          <div className='question'>
            <TextArea name='questionText' label='Insira a questão:' rows={4} defaultValue={question?.questionText} />
          </div>
          <div className='resolution'>
            <Input name='resolution' label='Insira o link da resolução:' defaultValue={question?.resolution} />
          </div>
          <div className='alternatives'>
            <div className='alternative'>
              <Input
                name='firstAlternative'
                label='Insira a alternativa 1:'
                defaultValue={question?.alternatives[0].alternativeText}
              />
              <CorrectSelector isSelected={correctAlternative === 0} onClick={() => setCorrectAlternative(0)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input
                name='secondAlternative'
                label='Insira a alternativa 2:'
                defaultValue={question?.alternatives[1].alternativeText}
              />
              <CorrectSelector isSelected={correctAlternative === 1} onClick={() => setCorrectAlternative(1)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input
                name='thirdAlternative'
                label='Insira a alternativa 3:'
                defaultValue={question?.alternatives[2].alternativeText}
              />
              <CorrectSelector isSelected={correctAlternative === 2} onClick={() => setCorrectAlternative(2)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input
                name='fourthAlternative'
                label='Insira a alternativa 4:'
                defaultValue={question?.alternatives[3].alternativeText}
              />
              <CorrectSelector isSelected={correctAlternative === 3} onClick={() => setCorrectAlternative(3)}>
                <div></div>
              </CorrectSelector>
            </div>
            <div className='alternative'>
              <Input
                name='fifthAlternative'
                label='Insira a alternativa 5:'
                defaultValue={question?.alternatives[4].alternativeText}
              />
              <CorrectSelector isSelected={correctAlternative === 4} onClick={() => setCorrectAlternative(4)}>
                <div></div>
              </CorrectSelector>
            </div>
          </div>
          <ButtonsWrapper>
            <Button type='submit'>Atualizar</Button>
            <Button type='button' onClick={() => setIsOpen(true)}>
              Excluir
            </Button>
          </ButtonsWrapper>
        </Form>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
          <h4>Tem certeza disso? Ao excluir a questão, essa ação não pode ser desfeita.</h4>
          <ButtonsWrapper>
            <Button onClick={() => setIsOpen(false)}>Voltar</Button>
            <Button onClick={handleDeleteQuestion}>Excluir</Button>
          </ButtonsWrapper>
        </Modal>
      </Container>
    </Wrapper>
  )
}

export default AdminExerciseEdit
