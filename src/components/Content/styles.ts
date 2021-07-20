import styled from 'styled-components'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  transition: 1s;
  margin-top: 4rem;
  width: 100%;
  padding: 1rem 4rem;

  @media ${deviceMaxWidth.laptop} {
    padding: 1rem;
  }
`
