import styled from 'styled-components'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  .contactIntro {
    text-align: center;
    p {
      max-width: 75%;
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 4rem;

      @media ${deviceMaxWidth.tablet} {
        max-width: 100%;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      margin-top: 2rem;
      padding: 0.75em 2em;
    }
  }

  @media ${deviceMaxWidth.mobileL} {
    padding: 0;
  }
`
