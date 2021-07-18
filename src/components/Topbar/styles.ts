import styled from 'styled-components'
import colors from '../../styles/colors'
import { FaUser } from 'react-icons/fa'
import { deviceMaxWidth } from '../../styles/devices'

interface IContainerProps {
  sidebarWidth: number
  isSidebarHidden: boolean
}

export const Container = styled.div<IContainerProps>`
  background-color: ${colors.lightGray2};
  width: 100%;
  height: 100px;
  padding: 0 1rem;
  position: absolute;
  z-index: -1;
  transition: 1s;
  padding-left: ${props => !props.isSidebarHidden && `${props.sidebarWidth + 16}px`};

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    color: ${colors.terciary};
  }

  @media ${deviceMaxWidth.laptop} {
    display: ${props => (!props.isSidebarHidden ? 'none' : 'flex')};
  }
`

export const ContaIcon = styled(FaUser)`
  font-size: 1.5rem;
  fill: ${colors.black};
`
