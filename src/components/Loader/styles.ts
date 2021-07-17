import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    animation: rotateLoading 1s infinite;
    border: 8px solid ${colors.lightGray};
    border-top: 8px solid ${colors.primary};
    width: 100px;
    aspect-ratio: 1;
    border-radius: 50%;
  }

  @keyframes rotateLoading {
    to {
      transform: rotate(360deg);
    }
  }
`
