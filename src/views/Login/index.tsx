import React from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import { useRef } from 'react'
import { Button, Input } from '../../components'
import { Container, LoginSection, LogoSection } from './styles'
import logo from '../../assets/logo.png'

interface IFormData {
  email: string
  password: string
}

const Login = () => {
  const formRef = useRef<FormHandles>(null)

  const handleLogin: SubmitHandler<IFormData> = data => {
    console.log(data)
  }

  return (
    <Container>
      <LoginSection>
        <h1>FAÇA SEU LOGIN</h1>
        <Form ref={formRef} onSubmit={handleLogin}>
          <Input name='email' type='text' label='Insira seu e-mail:' />
          <Input name='password' type='password' label='Insira sua senha:' />
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
