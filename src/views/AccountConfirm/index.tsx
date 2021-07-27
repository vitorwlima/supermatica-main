import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Header, Loader } from '../../components'
import api from '../../services/api'
import { Container } from './styles'

interface IParams {
  token: string
}

const AccountConfirm = () => {
  const { token }: IParams = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [confirmationSuccessful, setConfirmationSuccessful] = useState(false)
  const [seconds, setSeconds] = useState(6)

  api.defaults.headers['Authorization'] = `Bearer ${token}`

  const handleRedirect = () => {
    if (confirmationSuccessful) {
      history.push('/')
    } else {
      history.push('/login')
    }
  }

  const countdown = () => {
    const countdownInterval = setInterval(() => {
      setSeconds(seconds - 1)
      if (seconds === 0) {
        clearInterval(countdownInterval)
        handleRedirect()
      }
    }, 1000)
  }

  useEffect(() => {
    const confirmUser = async () => {
      try {
        await api.put('/confirm')
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
  }, [])

  return (
    <Container>
      {isLoading && <Loader />}
      <Header />
      {confirmationSuccessful ? (
        <div className='main'>
          <h2>Sua conta foi confirmada com sucesso!</h2>
          <p>Você será redirecionado para a plataforma em {seconds} segundos.</p>
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
