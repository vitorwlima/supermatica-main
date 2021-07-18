import styled from 'styled-components'
import colors from '../../styles/colors'
import { FaFlask, FaCalculator, FaBook, FaPhone, FaUser, FaChevronRight } from 'react-icons/fa'
import { deviceMaxWidth } from '../../styles/devices'

interface IContainerProps {
  isSidebarHidden: boolean
}

export const Container = styled.div<IContainerProps>`
  background-color: ${colors.primary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 16vw;
  position: relative;
  transition: 1s;
  transform: ${props => (props.isSidebarHidden ? 'translateX(-100%)' : 'none')};

  .sidebarButton {
    position: absolute;
    right: -36px;
    background-color: transparent;
    transform: ${props => (!props.isSidebarHidden ? 'rotate(180deg)' : 'none')};

    &:hover {
      background-color: transparent;
    }

    @media ${deviceMaxWidth.laptop} {
      right: ${props => (props.isSidebarHidden ? '-36px' : '0')};
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
    align-items: center;
    position: absolute;
    inset: 0;
  }
`

export const ConteudosIcon = styled(FaFlask)``
export const FormulasIcon = styled(FaCalculator)``
export const SimuladosIcon = styled(FaBook)``
export const ContatoIcon = styled(FaPhone)``
export const ContaIcon = styled(FaUser)``

export const SidebarIcon = styled(FaChevronRight)`
  fill: ${colors.dark};
`
