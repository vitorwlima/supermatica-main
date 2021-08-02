import React, { useState } from 'react'
import { AdminIcon, Container } from './styles'
import logo from '../../assets/logo.svg'
import { ContaIcon, ContatoIcon, ConteudosIcon, FormulasIcon, SidebarIcon, SimuladosIcon } from './styles'
import { Button, MenuButton } from '../'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/UseAuth'

export const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)
  const { user } = useAuth()

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
            <MenuButton setIsSidebarHidden={handleSidebarInteraction}>
              <FormulasIcon />
              Fórmulas
            </MenuButton>
            <MenuButton setIsSidebarHidden={handleSidebarInteraction}>
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
          {user?.admin && (
            <div style={{ marginTop: '24px' }}>
              <MenuButton path='/admin' setIsSidebarHidden={handleSidebarInteraction}>
                <AdminIcon />
                Admin
              </MenuButton>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
