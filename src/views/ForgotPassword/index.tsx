import React, { useRef } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Button, Header, Input } from '../../components'
import { Container } from './styles'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { getValidationErrors } from '../../utils'
import { useHistory } from 'react-router-dom'

interface IFormData {
  email: string
}

const ForgotPassword = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const handleForgotPassword: SubmitHandler<IFormData> = async formData => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido.').required('Insira o seu email.'),
      })

      await schema.validate(formData, { abortEarly: false })

      await api.post('/password-forgot', { email: formData.email })

      toast.success('Um email para redefinir a senha foi enviado com sucesso!', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      history.push('/login')
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
    <Container>
      <Header />
      <main>
        <Form onSubmit={handleForgotPassword} ref={formRef}>
          <Input name='email' label='Insira seu email:' />
          <Button type='submit'>Enviar</Button>
        </Form>
      </main>
    </Container>
  )
}

export default ForgotPassword
