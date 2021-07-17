import styled from 'styled-components'
import colors from '../../styles/colors'

interface IContainerProps {
  isActive: boolean
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    cursor: pointer;
    transition: 0.3s;
    padding: 0.2em;
    background-color: transparent;
    color: ${props => (props.isActive ? `${colors.secondary}` : `${colors.darkWhite}`)};
    display: flex;
    margin-bottom: 1em;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 700;

    svg {
      margin-right: 1em;
    }

    &:hover {
      color: ${colors.secondary};
    }
  }
`
