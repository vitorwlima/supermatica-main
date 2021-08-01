import styled from 'styled-components'
import colors from '../../styles/colors'

interface ICorrectSelectorProps {
  isSelected: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 1rem;
  }

  .alternatives {
    margin-top: 2rem;

    .alternative {
      display: flex;
      align-items: center;
    }
  }

  .resolution {
    margin-top: 2rem;
  }

  .button {
    align-self: flex-start;
    width: fit-content;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`

export const CorrectSelector = styled.div<ICorrectSelectorProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.3em;

  div {
    width: 20px;
    height: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    margin-top: 1rem;

    border: 1.5px solid ${colors.black};
    margin-right: 1em;
    transition: 0.2s;

    background-color: ${props => props.isSelected && `${colors.primary}`};
  }

  &:hover {
    div {
      border: 1.5px solid ${colors.primary};
    }
  }
`
