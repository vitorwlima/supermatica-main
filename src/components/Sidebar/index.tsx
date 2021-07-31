import React, { useState } from 'react'
import { Container } from './styles'
import logo from '../../assets/logo.svg'
import { ContaIcon, ContatoIcon, ConteudosIcon, FormulasIcon, SidebarIcon, SimuladosIcon } from './styles'
import { Button, MenuButton } from '../'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)

  const handleSidebarInteraction = () => {
    setIsSidebarHidden(!isSidebarHidden)
  }

  return (
    <Container isSidebarHidden={isSidebarHidden}>
      <div className='container'>
        <Button className='sidebarButton' onClick={handleSidebarInteraction}>
          <SidebarIcon />
        </Button>
        <Link to='/conteudos'>
          <div className='logoSection'>
            <img src={logo} alt='Supermática' />
          </div>
        </Link>
        <div className='allButtons'>
          <div className='firstButtons'>
            <MenuButton path='/conteudos' setIsSidebarHidden={handleSidebarInteraction}>
              <ConteudosIcon />
              Conteúdos
            </MenuButton>
            <MenuButton path='/formulas' setIsSidebarHidden={handleSidebarInteraction}>
              <FormulasIcon />
              Fórmulas
            </MenuButton>
            <MenuButton path='/simulados' setIsSidebarHidden={handleSidebarInteraction}>
              <SimuladosIcon />
              Simulados
            </MenuButton>
          </div>
          <div className='secondButtons'>
            <MenuButton path='/contato' setIsSidebarHidden={handleSidebarInteraction}>
              <ContatoIcon />
              Contato
            </MenuButton>
            <MenuButton path='/conta' setIsSidebarHidden={handleSidebarInteraction}>
              <ContaIcon />
              Conta
            </MenuButton>
          </div>
        </div>
      </div>
    </Container>
  )
}
