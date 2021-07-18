import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Button, TextArea, Wrapper } from '../../components'
import { Container } from './styles'
import { getValidationErrors } from '../../utils'

interface IFormData {
  teste: string
}

const Contato = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<IFormData> = async data => {
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
    <Wrapper>
      <Container>
        <div className='contactIntro'>
          <h1>ENTRE EM CONTATO</h1>
          <p>
            Caso queira nos mandar algum feedback sobre a plataforma ou simplesmente nos enviar uma mensagem, fique a
            vontade para enviar pelo campo abaixo!
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <TextArea name='teste' rows={10} />
          <Button type='submit'>Enviar</Button>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default Contato
