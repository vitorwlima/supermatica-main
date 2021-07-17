import styled from 'styled-components'

import colors from '../../styles/colors'
import { deviceMaxWidth } from '../../styles/devices'

interface ContainerProps {
  preview?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  span {
    width: 160px;
    background: ${colors.primary};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: ${props => (props.preview ? 1 : 0)};
    transition: opacity 0.4s;
    visibility: ${props => (props.preview ? 'visible' : 'hidden')};

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: ${colors.lightGray};

    @media ${deviceMaxWidth.laptopL} {
      left: -50%;
      transform: translateX(-70%);
    }

    &::before {
      content: '';
      border-style: solid;
      border-color: ${colors.primary} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      @media ${deviceMaxWidth.laptopL} {
        left: 83%;
      }
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
