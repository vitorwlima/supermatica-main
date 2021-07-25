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

  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const handleLogout = useCallback(async () => {
    await api.get('/logout')
    setAccessToken('')
    history.push('/login')
  }, [history])

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
    <Wrapper>
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
          <p>Deseja alterar sua senha? Um email será enviado à você com o passo a passo necessário.</p>
          <Button variant='nobackground'>Alterar senha</Button>
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
