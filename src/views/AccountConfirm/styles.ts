import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  .main {
    margin-top: 200px;
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      color: ${colors.primary};
      font-size: 2rem;
      margin-bottom: 1.25rem;
      text-align: center;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    button {
      margin-top: 3rem;
    }
  }
`
