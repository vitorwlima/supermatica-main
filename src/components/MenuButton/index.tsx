import React, { ReactNode, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from './styles'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  path?: string
  setIsSidebarHidden: () => void
}

export const MenuButton = ({ children, disabled, type, className, path, setIsSidebarHidden }: ButtonProps) => {
  const [isActive, setIsActive] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (path) {
      if (
        (window.location.pathname.includes(path) &&
          (window.location.pathname.startsWith('/conteudos') || window.location.pathname.startsWith('/admin'))) ||
        window.location.pathname === path
      ) {
        setIsActive(true)
      }
    }
  }, [path])

  const handleRedirect = () => {
    if (path) {
      history.push(path)
      setIsSidebarHidden()
    }
  }

  return (
    <Container isActive={isActive} isClickable={!!path}>
      <button onClick={handleRedirect} disabled={disabled} type={type} className={className}>
        {children}
      </button>
      {!path && <span className='soon'>Em breve</span>}
    </Container>
  )
}
