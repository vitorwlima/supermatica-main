import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Button, Input } from '../../components'
import { Container, LoginSection, LogoSection } from './styles'
import logo from '../../assets/logo.png'
import { getValidationErrors } from '../../utils'

interface IFormData {
  email: string
  password: string
}

const Login = () => {
  const formRef = useRef<FormHandles>(null)

  const handleLogin: SubmitHandler<IFormData> = async data => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido.').required('Insira o seu email.'),
        password: Yup.string().required('Insira a sua senha.'),
      })

      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }
    }
  }

  return (
    <Container>
      <LoginSection>
        <h1>FAÇA SEU LOGIN</h1>
        <Form ref={formRef} onSubmit={handleLogin}>
          <Input name='email' type='text' placeholder='Insira seu e-mail:' />
          <Input name='password' type='password' placeholder='Insira sua senha:' />
          <Button type='submit'>ENTRAR</Button>
          <Button variant='nobackground' className='forgotPasswordBtn'>
            Esqueci a senha
          </Button>
          <div className='registerSection'>
            <span>Não possui uma conta Supermática?</span>
            <Button variant='nobackground'>Cadastre-se</Button>
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
