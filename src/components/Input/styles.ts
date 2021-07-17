import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    padding: 0.75em;
    border-radius: 0.5em;
    border: 2px solid ${colors.black};
    margin-top: 1em;
  }
`
