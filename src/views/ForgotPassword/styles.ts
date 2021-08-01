import styled from 'styled-components'
import { deviceMinWidth } from '../../styles/devices'

export const Container = styled.div`
  main {
    padding: 1rem;
    display: flex;
    justify-content: center;

    @media ${deviceMinWidth.tablet} {
      padding: 2rem;
    }

    @media ${deviceMinWidth.laptop} {
      padding: 4rem;
    }

    @media ${deviceMinWidth.laptopL} {
      padding: 4rem 12rem;
    }

    form {
      width: 100%;
      max-width: 960px;

      label {
        margin-top: 1rem;
      }

      button {
        margin-top: 2rem;
      }
    }
  }
`
