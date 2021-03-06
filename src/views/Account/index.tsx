import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { Button, Input, Wrapper } from '../../components'
import { useAuth } from '../../hooks/UseAuth'
import { Container } from './styles'
import { useCallback } from 'react'
import api from '../../services/api'
import { getValidationErrors } from '../../utils'
import { getAccessToken, setAccessToken } from '../../AuthenticationToken'

interface IFormData {
  name: string
}

const Account = () => {
  const history = useHistory()
  const { user, setUser } = useAuth()
  const formRef = useRef<FormHandles>(null)

  const breadCrumbs = [{ label: 'Conta' }]

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const handleChangePassword = async () => {
    try {
      await api.post('/password-change')

      toast.success('Email enviado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      toast.error('Ocorreu um erro.', {
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

  const handleLogout = useCallback(async () => {
    try {
      await api.get('/logout')
      setAccessToken('')
      setUser(undefined)

      history.push('/login')
    } catch (err) {
      console.log('Erro ao desconectar: ', err)
    }
  }, [setUser, history])

  const handleUpdateUserName: SubmitHandler<IFormData> = async formData => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Insira o seu nome.'),
      })

      await schema.validate(formData, { abortEarly: false })

      const { data } = await api.put('/user-name', { name: formData.name })
      setUser(data)
      toast.success('Nome alterado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        return
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
        <div className='emailWrapper'>
          <div>Email:</div>
          <span>{user?.email}</span>
        </div>
        <Form onSubmit={handleUpdateUserName} ref={formRef}>
          <Input name='name' label='Nome:' defaultValue={user?.name} />
          <Button type='submit'>Atualizar</Button>
        </Form>
        <div className='passwordWrapper'>
          <p>Deseja alterar sua senha? Um email ser?? enviado ?? voc?? com o passo a passo necess??rio.</p>
          <Button variant='nobackground' onClick={handleChangePassword}>
            Alterar senha
          </Button>
        </div>
        <div className='logout'>
          <Button variant='nobackground' onClick={handleLogout}>
            Desconectar
          </Button>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Account
