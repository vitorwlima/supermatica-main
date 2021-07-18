import styled from 'styled-components'
import { deviceMaxWidth } from '../../styles/devices'

interface IContainerProps {
  sidebarWidth: number
  isSidebarHidden: boolean
}

export const Container = styled.div<IContainerProps>`
  transform: ${props => props.isSidebarHidden && `translateX(-${props.sidebarWidth}px)`};
  transition: 1s;
  margin-top: 100px;
  z-index: -1;

  @media ${deviceMaxWidth.laptop} {
    transform: translateX(0);
  }
`
