import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'

import { Button, Input } from '../../components'
import { CheckInput, Container, RegisterSection, LogoSection } from './styles'
import logo from '../../assets/logo.svg'
import { getValidationErrors } from '../../utils'
import api from '../../services/api'

interface IFormData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const Register = () => {
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [termsError, setTermsError] = useState(false)

  const handleRegister: SubmitHandler<IFormData> = async (formData, { reset }) => {
    try {
      formRef.current?.setErrors({})
      setTermsError(false)

      const schema = Yup.object().shape({
        name: Yup.string().required('Insira o seu nome.'),
        email: Yup.string().email('Digite um email válido.').required('Insira o seu email.'),
        password: Yup.string().required('Insira a sua senha.').min(6, 'Sua senha precisa ter no mínimo 6 caracteres.'),
        passwordConfirmation: Yup.string()
          .required('Confirme a sua senha.')
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta.'),
      })

      await schema.validate(formData, { abortEarly: false })

      if (!acceptTerms) {
        setTermsError(true)
        return
      }

      await api.post('/register', { email: formData.email, password: formData.password, name: formData.name })

      toast.success('Sua conta foi criada com sucesso, e um email de confirmação foi enviado!', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setTimeout(() => {
        reset()
        setAcceptTerms(false)
      }, 1000)
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
      <RegisterSection>
        <h1>FAÇA SEU CADASTRO</h1>
        <Form onSubmit={handleRegister} ref={formRef}>
          <Input name='name' type='text' label='Como gostaria de ser chamado?' />
          <Input name='email' type='text' label='Insira seu e-mail:' />
          <Input name='password' type='password' label='Insira sua senha:' />
          <Input name='passwordConfirmation' type='password' label='Confirme sua senha:' />
          <div className='checkInputs'>
            <CheckInput onClick={() => setAcceptTerms(previous => !previous)} isSelected={acceptTerms}>
              <div className='circleToMark'></div>
              <span>Eu li e aceito os Termos de uso e Política de privacidade do Supermática</span>
            </CheckInput>
            {termsError && (
              <span className='termsError'>
                É preciso concordar com os termos acima para criar sua conta Supermática.
              </span>
            )}
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
