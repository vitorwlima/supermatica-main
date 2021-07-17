import React, { useState } from 'react'
import { Container } from './styles'
import logo from '../../assets/logo.png'
import { ContaIcon, ContatoIcon, ConteudosIcon, FormulasIcon, SidebarIcon, SimuladosIcon } from './styles'
import { Button, MenuButton } from '../'

export const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)

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
          <MenuButton path='/conteudos'>
            <ConteudosIcon />
            Conteúdos
          </MenuButton>
          <MenuButton path='/formulas'>
            <FormulasIcon />
            Fórmulas
          </MenuButton>
          <MenuButton path='/simulados'>
            <SimuladosIcon />
            Simulados
          </MenuButton>
        </div>
        <div className='secondButtons'>
          <MenuButton path='/contato'>
            <ContatoIcon />
            Contato
          </MenuButton>
          <MenuButton path='/conta'>
            <ContaIcon />
            Conta
          </MenuButton>
        </div>
      </div>
    </Container>
  )
}
