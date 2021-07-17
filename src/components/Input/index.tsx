import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { Container, Error } from './styles'
import { FiAlertCircle } from 'react-icons/fi'

interface Props {
  name: string
  label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input = ({ name, label, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input id={fieldName} ref={inputRef} defaultValue={defaultValue} {...rest} />

      {error && (
        <Error title={error}>
          <FiAlertCircle color='#c53030' size={20} />
        </Error>
      )}
    </Container>
  )
}
