import React, { useState } from 'react'
import { Container } from './styles'
import logo from '../../assets/logo.png'
import { ContaIcon, ContatoIcon, ConteudosIcon, FormulasIcon, SidebarIcon, SimuladosIcon } from './styles'
import { Button, MenuButton } from '../'

export const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)

  const handleSidebarInteraction = () => {
    setIsSidebarHidden(!isSidebarHidden)
  }

  return (
    <Container isSidebarHidden={isSidebarHidden}>
      <Button className='sidebarButton' onClick={handleSidebarInteraction}>
        <SidebarIcon />
      </Button>
      <div className='logoSection'>
        <img src={logo} alt='Supermática' />
      </div>
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
    </Container>
  )
}
