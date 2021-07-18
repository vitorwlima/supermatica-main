import styled from 'styled-components'
import colors from '../../styles/colors'
import { Tooltip } from '../Tooltip'

interface IContainerProps {
  isErrored: boolean
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  textarea {
    padding: 0.75em;
    border-radius: 0.5em;
    border: ${props => (props.isErrored ? `2px solid ${colors.warning}` : `2px solid ${colors.black}`)};
    margin-top: 1em;
    resize: none;
  }
`

export const Error = styled(Tooltip)`
  position: absolute;
  right: 10px;
  top: 24px;

  svg {
    margin: 0 auto;
  }

  span {
    background: ${colors.warning};
    color: ${colors.pureWhite};
    text-align: center;

    &::before {
      border-color: ${colors.warning} transparent;
    }
  }
`
