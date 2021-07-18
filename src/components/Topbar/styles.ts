import styled from 'styled-components'
import colors from '../../styles/colors'
import { FaUser } from 'react-icons/fa'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  background-color: ${colors.lightGray2};
  width: 100%;
  height: 100px;
  padding: 0 1rem;
  z-index: -1;
  transition: 1s;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    color: ${colors.terciary};
  }

  @media ${deviceMaxWidth.laptop} {
    padding-left: 1rem;
  }
`

export const ContaIcon = styled(FaUser)`
  font-size: 1.5rem;
  fill: ${colors.black};
`
