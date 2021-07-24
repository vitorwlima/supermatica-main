import styled from 'styled-components'
import colors from '../../styles/colors'

interface IAlternativeProps {
  isSelected: boolean
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
    h3 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
    div {
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
`

export const Alternative = styled.div<IAlternativeProps>`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  .circleToMark {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid ${colors.black};
    margin-right: 1em;
    transition: 0.2s;

    background-color: ${props => props.isSelected && `${colors.primary}`};
  }

  .alternativeLetter {
    margin-right: 1rem;
  }

  &:hover {
    .circleToMark {
      border: 1.5px solid ${colors.primary};
    }
  }
`
