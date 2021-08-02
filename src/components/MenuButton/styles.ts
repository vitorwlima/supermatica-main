import styled from 'styled-components'
import colors from '../../styles/colors'

interface IContainerProps {
  isActive: boolean
  isClickable: boolean
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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
    cursor: ${props => !props.isClickable && 'default'};

    svg {
      margin-right: 1em;
    }

    &:hover {
      color: ${props => props.isClickable && colors.secondary};
    }
  }

  .soon {
    font-size: 0.75rem;
    position: absolute;
    bottom: 10px;
    right: 53px;
    color: ${colors.secondary};
  }
`
