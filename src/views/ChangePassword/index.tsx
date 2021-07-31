import React, { useRef, useState } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Button, Header, Input } from '../../components'
import { Container } from './styles'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { getValidationErrors } from '../../utils'
import { getAccessToken } from '../../AuthenticationToken'
import { useHistory, useParams } from 'react-router-dom'

interface IFormData {
  password: string
  passwordConfirmation: string
}

interface IParams {
  token: string
}

const ChangePassword = () => {
  const formRef = useRef<FormHandles>(null)
  const [stateChange, setStateChange] = useState(false)
  const { token }: IParams = useParams()
  const history = useHistory()

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const handleChangePassword: SubmitHandler<IFormData> = async formData => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        password: Yup.string().required('Insira a sua senha.').min(6, 'Sua senha precisa ter no mínimo 6 caracteres.'),
        passwordConfirmation: Yup.string()
          .required('Confirme a sua senha.')
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta.'),
      })

      await schema.validate(formData, { abortEarly: false })

      await api.put('/password-change', { password: formData.password, urlToken: token })

      toast.success('Sua senha foi alterada com sucesso!', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      history.push('/login')
      window.location.reload()
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
        <Form onSubmit={handleChangePassword} ref={formRef}>
          <Input name='password' type='password' label='Insira sua nova senha:' onChange={() => setStateChange(true)} />
          <Input name='passwordConfirmation' type='password' label='Confirme sua senha:' />
          <Button type='submit'>Alterar</Button>
        </Form>
      </main>
    </Container>
  )
}

export default ChangePassword
