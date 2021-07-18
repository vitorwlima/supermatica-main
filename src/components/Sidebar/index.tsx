import React, { useEffect, useRef } from 'react'
import { Container } from './styles'
import logo from '../../assets/logo.png'
import { ContaIcon, ContatoIcon, ConteudosIcon, FormulasIcon, SidebarIcon, SimuladosIcon } from './styles'
import { Button, MenuButton } from '../'

interface ISidebarProps {
  setSidebarWidth: React.Dispatch<React.SetStateAction<number>>
  setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>
  isSidebarHidden: boolean
}

export const Sidebar = ({ setSidebarWidth, setIsSidebarHidden, isSidebarHidden }: ISidebarProps) => {
  const sidebarRef = useRef<any>(null)

  const handleSidebarInteraction = () => {
    setIsSidebarHidden(!isSidebarHidden)
  }

  useEffect(() => {
    const resize = () => {
      if (sidebarRef && sidebarRef.current && sidebarRef.current.offsetWidth) {
        setSidebarWidth(sidebarRef.current.offsetWidth)
      }
    }
    resize()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [sidebarRef, setSidebarWidth])

  return (
    <Container isSidebarHidden={isSidebarHidden} ref={sidebarRef}>
      <Button className='sidebarButton' onClick={handleSidebarInteraction}>
        <SidebarIcon />
      </Button>
      <div className='logoSection'>
        <img src={logo} alt='Supermática' />
      </div>
      <div className='allButtons'>
        <div className='firstButtons'>
          <MenuButton path='/'>
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
