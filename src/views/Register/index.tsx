import React from 'react'
import { Form } from '@unform/web'

import { Button, Input } from '../../components'
import { CheckInput, Container, RegisterSection, LogoSection } from './styles'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()

  const [acceptOffers, setAcceptOffers] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  return (
    <Container>
      <RegisterSection>
        <h1>FAÇA SEU CADASTRO</h1>
        <Form onSubmit={() => console.log('oi')}>
          <Input name='name' type='text' label='Como gostaria de ser chamado?' />
          <Input name='email' type='text' label='Insira seu e-mail:' />
          <Input name='password' type='password' label='Insira sua senha:' />
          <Input name='confirmPassword' type='password' label='Confirme sua senha:' />
          <div className='checkInputs'>
            <CheckInput onClick={() => setAcceptOffers(previous => !previous)} isSelected={acceptOffers}>
              <div className='circleToMark'></div>
              <span>Eu aceito receber ofertas do Supermática</span>
            </CheckInput>
            <CheckInput onClick={() => setAcceptTerms(previous => !previous)} isSelected={acceptTerms}>
              <div className='circleToMark'></div>
              <span>Eu li e aceito os Termos de uso e Política de privacidade do Supermática</span>
            </CheckInput>
          </div>
          <Button type='submit'>CADASTRAR</Button>
          <div className='loginSection'>
            <span>Já possui uma conta Supermática?</span>
            <Button variant='nobackground' onClick={() => history.push('/login')}>
              Entrar
            </Button>
          </div>
        </Form>
      </RegisterSection>
      <LogoSection>
        <img src={logo} alt='Supermática' />
      </LogoSection>
    </Container>
  )
}

export default Register
