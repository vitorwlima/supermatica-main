import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { setAccessToken } from '../../AuthenticationToken'
import { Button, Header, Loader } from '../../components'
import { useAuth } from '../../hooks/UseAuth'
import api from '../../services/api'
import { Container } from './styles'

interface IParams {
  token: string
}

const AccountConfirm = () => {
  const { token }: IParams = useParams()
  const history = useHistory()
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [confirmationSuccessful, setConfirmationSuccessful] = useState(false)

  api.defaults.headers['Authorization'] = `Bearer ${token}`

  const handleRedirect = useCallback(() => {
    history.push('/')
    window.location.reload()
  }, [history])

  const countdown = useCallback(() => {
    setTimeout(handleRedirect, 5000)
  }, [handleRedirect])

  useEffect(() => {
    const confirmUser = async () => {
      try {
        const { data } = await api.put('/confirm')
        setUser(data.user)
        setAccessToken(data.token)

        setConfirmationSuccessful(true)
        countdown()
      } catch (err) {
        setConfirmationSuccessful(false)
        countdown()
      } finally {
        setIsLoading(false)
      }
    }
    confirmUser()
  }, [countdown, setUser])

  return (
    <Container>
      {isLoading && <Loader />}
      <Header />
      {confirmationSuccessful ? (
        <div className='main'>
          <h2>Sua conta foi confirmada com sucesso!</h2>
          <p>Você será redirecionado para a plataforma em 5 segundos.</p>
          <Button onClick={handleRedirect}>Ir para a plataforma</Button>
        </div>
      ) : (
        <div className='main'>
          <h2>Link expirado!</h2>
          <p>Este link não é mais válido e por isso sua conta não foi ativada.</p>
          <p>Faça o login novamente para receber um novo email de confirmação.</p>
          <Button onClick={handleRedirect}>Ir para a página de login</Button>
        </div>
      )}
    </Container>
  )
}

export default AccountConfirm
