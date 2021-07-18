import styled from 'styled-components'
import colors from '../../styles/colors'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 100vh;

  .number {
    color: ${colors.primary};
    font-weight: bold;
    font-size: 6rem;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }

  @media ${deviceMaxWidth.mobileL} {
    padding: 0 1em;
  }
`
