import React, { ReactNode, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from './styles'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  path: string
  setIsSidebarHidden: () => void
}

export const MenuButton = ({ children, disabled, type, className, path, setIsSidebarHidden }: ButtonProps) => {
  const [isActive, setIsActive] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (window.location.pathname === path) {
      setIsActive(true)
    }
  }, [path])

  const handleRedirect = () => {
    history.push(path)
    setIsSidebarHidden()
  }

  return (
    <Container isActive={isActive}>
      <button onClick={handleRedirect} disabled={disabled} type={type} className={className}>
        {children}
      </button>
    </Container>
  )
}
