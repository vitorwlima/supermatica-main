import styled from 'styled-components'
import colors from '../../styles/colors'
import { FaUser } from 'react-icons/fa'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  background-color: ${colors.lightGray2};
  width: 100%;
  height: 100px;
  padding: 0 4rem;
  z-index: -1;
  transition: 1s;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .breadCrumbs {
    button {
      color: ${colors.terciary};
      padding: 0.5em 1em;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media ${deviceMaxWidth.laptop} {
    padding: 0 1rem;
  }
`

export const ContaIcon = styled(FaUser)`
  font-size: 1.5rem;
  fill: ${colors.black};
`
