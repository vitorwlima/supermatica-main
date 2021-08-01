import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import React, { useRef } from 'react'
import { Button, Input, Wrapper } from '../../components'
import { Container } from './styles'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { getValidationErrors } from '../../utils'
import { getAccessToken } from '../../AuthenticationToken'

interface IFormData {
  subjectText: string
}

const AdminConteudo = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const breadCrumbs = [{ label: 'Admin', path: '/admin' }, { label: 'Novo conteúdo' }]

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const handleCreateNewSubject: SubmitHandler<IFormData> = async formData => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        subjectText: Yup.string().required('Insira o conteúdo.'),
      })

      await schema.validate(formData, { abortEarly: false })

      await api.post('/subject', { subjectText: formData.subjectText })

      toast.success('O conteúdo foi criado com sucesso!', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      history.push('/admin')
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
        <Form onSubmit={handleCreateNewSubject} ref={formRef}>
          <Input name='subjectText' label='Insira o conteúdo:' />
          <Button type='submit'>Criar</Button>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default AdminConteudo
