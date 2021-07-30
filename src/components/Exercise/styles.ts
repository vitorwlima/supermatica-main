import styled from 'styled-components'
import colors from '../../styles/colors'

interface IAlternativeProps {
  isSelected: boolean
  isCorrectAndFinished: boolean
  isIncorrectAndSelected: boolean
}

interface IContainerProps {
  hasFinished?: boolean
}

export const Container = styled.div<IContainerProps>`
  .question {
    font-weight: 400;
    margin-bottom: 2rem;
    font-size: 1.25rem;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .alternatives {
    width: 100%;
    margin-bottom: 2rem;
    filter: ${props => props.hasFinished && 'brightness(0.75)'};

    div {
      cursor: ${props => props.hasFinished && 'default'};
      &:hover {
        .circleToMark {
          border: ${props => props.hasFinished && `1.5px solid ${colors.black}`};
        }
      }
    }
  }

  .statusLabel {
    font-weight: 700;
  }

  .buttonsWrapper {
    margin-top: 1rem;
    display: flex;

    button:first-child {
      margin-right: 1rem;
    }
  }

  .correctLabelWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    div {
      margin-top: 1rem;
    }
  }

  .resolution {
    width: 100%;

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
  }
`

export const Alternative = styled.div<IAlternativeProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.3em;

  background-color: ${props => props.isCorrectAndFinished && colors.success};
  background-color: ${props => props.isIncorrectAndSelected && colors.warningSoft};

  .circleToMark {
    width: 20px;
    height: 20px;
    aspect-ratio: 1;
    border-radius: 50%;

    border: 1.5px solid ${colors.black};
    margin-right: 1em;
    transition: 0.2s;

    background-color: ${props => props.isSelected && `${colors.primary}`};
    background-color: ${props => props.isCorrectAndFinished && colors.successSecondary};
    background-color: ${props => props.isIncorrectAndSelected && colors.warningSoftSecondary};
  }

  .alternativeLetter {
    margin-right: 0.75rem;
  }

  &:hover {
    .circleToMark {
      border: 1.5px solid ${colors.primary};
    }
  }
`
