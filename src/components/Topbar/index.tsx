import React, { useCallback, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { Button } from '../'
import { Container, ContaIcon } from './styles'

interface IBreadCrumbs {
  label: string
  path?: string
}
interface ITopbarProps {
  children?: ReactNode
  breadCrumbs?: IBreadCrumbs[]
}

export const Topbar = ({ children, breadCrumbs }: ITopbarProps) => {
  const history = useHistory()

  const handleRedirectAccount = useCallback(() => {
    history.push('/conta')
  }, [history])

  const handleRedirect = useCallback(
    (path: string) => {
      if (path) {
        return history.push(path)
      }

      return window.location.reload()
    },
    [history]
  )

  return (
    <Container>
      {children}
      <div className='breadCrumbs'>
        {breadCrumbs?.map(crumb => (
          <Button variant='nobackground' onClick={() => handleRedirect(crumb.path || '')}>
            {crumb.label} <FaChevronRight />
          </Button>
        ))}
      </div>
      <Button variant='nobackground' onClick={handleRedirectAccount} className='button-account'>
        <ContaIcon />
      </Button>
    </Container>
  )
}
