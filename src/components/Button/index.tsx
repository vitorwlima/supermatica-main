import React, { ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps {
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'default' | 'nobackground'
  className?: string
}

export const Button = ({ onClick, children, disabled, type, variant, className }: ButtonProps) => {
  return (
    <Container variant={variant || 'default'}>
      <button onClick={onClick} disabled={disabled} type={type} className={className}>
        {children}
      </button>
    </Container>
  )
}
