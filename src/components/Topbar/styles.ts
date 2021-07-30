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
    display: flex;
    align-items: center;

    button {
      color: ${colors.terciary};
      padding: 0;
      display: flex;
      align-items: center;

      svg {
        color: ${colors.dark};
        font-size: 0.75rem;
        margin-left: 0.5em;
        margin-right: 0.75em;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    div:first-child {
      button {
        padding-left: 2em;
      }
    }

    div:last-child {
      button {
        color: ${colors.dark};
      }

      svg:last-child {
        display: none;
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
