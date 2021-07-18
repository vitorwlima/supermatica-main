import styled from 'styled-components'
import { deviceMaxWidth } from '../../styles/devices'

interface IContainerProps {
  sidebarWidth: number
  isSidebarHidden: boolean
}

export const Container = styled.div<IContainerProps>`
  transform: ${props => props.isSidebarHidden && `translateX(-${props.sidebarWidth}px)`};
  transition: 1s;
  margin-top: calc(100px + 4rem);
  width: 100%;
  padding: 1rem;

  @media ${deviceMaxWidth.laptop} {
    transform: translateX(0);
  }
`
