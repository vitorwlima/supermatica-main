import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { Button, Input } from '../../components'
import { Container, LoginSection, LogoSection } from './styles'
import logo from '../../assets/logo.svg'
import { getValidationErrors } from '../../utils'
import api from '../../services/api'
import { setAccessToken } from '../../AuthenticationToken'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/UseAuth'

interface IFormData {
  email: string
  password: string
}

const Login = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const { setUser } = useAuth()

  const handleLogin: SubmitHandler<IFormData> = async formData => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido.').required('Insira o seu email.'),
        password: Yup.string().required('Insira a sua senha.'),
      })

      await schema.validate(formData, { abortEarly: false })

      const { data } = await api.post('/authenticate', { email: formData.email, password: formData.password })
      setAccessToken(data.token)
      setUser(data.user)
      history.push('/conteudos')
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
      <LoginSection>
        <h1>FAÇA SEU LOGIN</h1>
        <Form ref={formRef} onSubmit={handleLogin}>
          <Input name='email' type='text' label='Insira seu e-mail:' />
          <Input name='password' type='password' label='Insira sua senha:' />
          <Button type='submit'>ENTRAR</Button>
          <Button variant='nobackground' className='forgotPasswordBtn' type='button'>
            Esqueci a senha
          </Button>
          <div className='registerSection'>
            <span>Não possui uma conta Supermática?</span>
            <Button variant='nobackground' onClick={() => history.push('/cadastro')}>
              Cadastre-se
            </Button>
          </div>
        </Form>
      </LoginSection>
      <LogoSection>
        <img src={logo} alt='Supermática' />
      </LogoSection>
    </Container>
  )
}

export default Login
