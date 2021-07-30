import styled from 'styled-components'
import colors from '../../styles/colors'
import { FaFlask, FaCalculator, FaBook, FaPhone, FaUser, FaBars } from 'react-icons/fa'
import { deviceMaxWidth } from '../../styles/devices'

interface IContainerProps {
  isSidebarHidden: boolean
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  max-width: 16vw;

  @media ${deviceMaxWidth.laptopL} {
    max-width: 20vw;
  }

  @media ${deviceMaxWidth.laptop} {
    max-width: 0;
  }

  .container {
    background-color: ${colors.primary};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 16vw;
    position: fixed;
    transition: 1s;
    z-index: 999;

    .sidebarButton {
      position: absolute;
      background-color: transparent;
      transform: ${props => (!props.isSidebarHidden ? 'rotate(90deg)' : 'none')};
      display: none;

      &:hover {
        background-color: transparent;
      }

      @media ${deviceMaxWidth.laptop} {
        right: ${props => (props.isSidebarHidden ? '-54px' : '-22px')};
        display: block;
      }
    }

    .logoSection {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 75%;
      }
    }

    .allButtons {
      width: fit-content;
      margin-top: 6rem;

      .firstButtons {
        margin-bottom: 3rem;
      }
    }

    @media ${deviceMaxWidth.laptopL} {
      max-width: 20vw;
    }

    @media ${deviceMaxWidth.laptop} {
      max-width: 100vw;
      transform: ${props => (props.isSidebarHidden ? 'translateX(-100%)' : 'none')};
      align-items: center;
      position: absolute;
      inset: 0;
    }
  }
`

export const ConteudosIcon = styled(FaFlask)``
export const FormulasIcon = styled(FaCalculator)``
export const SimuladosIcon = styled(FaBook)``
export const ContatoIcon = styled(FaPhone)``
export const ContaIcon = styled(FaUser)``

export const SidebarIcon = styled(FaBars)`
  fill: ${colors.dark};
`
