import React from 'react'
import { Container } from './styles'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Container>
      <Link to='/'>
        <img src={logo} alt='Supermática' />
      </Link>
    </Container>
  )
}
