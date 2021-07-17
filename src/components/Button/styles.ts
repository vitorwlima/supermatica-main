import styled from 'styled-components'
import colors from '../../styles/colors'

interface IContainerProps {
  variant?: 'default' | 'nobackground'
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 1em;
    border-radius: 0.3em;
    background-color: ${props => (props.variant === 'default' ? `${colors.primary}` : `${colors.pureWhite}`)};
    color: ${props => (props.variant === 'default' ? `${colors.lightWhite}` : `${colors.primary}`)};
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: ${props => (props.variant === 'default' ? `${colors.terciary}` : `${colors.pureWhite}`)};
      color: ${props => (props.variant === 'default' ? `${colors.lightWhite}` : `${colors.terciary}`)};
    }
  }
`
