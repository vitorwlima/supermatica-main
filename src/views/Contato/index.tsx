import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Button, TextArea, Wrapper } from '../../components'
import { Container } from './styles'
import { getValidationErrors } from '../../utils'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { getAccessToken } from '../../AuthenticationToken'

interface IFormData {
  message: string
}

const Contato = () => {
  const formRef = useRef<FormHandles>(null)

  const breadCrumbs = [{ label: 'Contato' }]
  api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`

  const handleSubmit: SubmitHandler<IFormData> = async (data, { reset }) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        message: Yup.string().required('Insira a sua mensagem.'),
      })

      await schema.validate(data, { abortEarly: false })

      await api.post('/contact', { message: data.message })

      toast.success('Sua mensagem foi enviada com sucesso!', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setTimeout(reset, 1000)
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
        <div className='contactIntro'>
          <h1>ENTRE EM CONTATO</h1>
          <p>
            Caso queira nos mandar algum feedback sobre a plataforma ou simplesmente nos enviar uma mensagem, fique a
            vontade para enviar pelo campo abaixo!
          </p>
        </div>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <TextArea name='message' rows={10} />
          <Button type='submit'>Enviar</Button>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default Contato
