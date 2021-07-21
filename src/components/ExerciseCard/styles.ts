import styled from 'styled-components'
import colors from '../../styles/colors'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 0.5em;
  cursor: pointer;
  transition: transform 0.4s;
  transform: scale(0.98);

  svg {
    font-size: 1.25rem;
  }

  .contentWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tagWrapper {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    display: flex;

    span {
      background-color: ${colors.primary};
      padding: 0.5em 1em;
      border-radius: 0.3em;

      margin-right: 0.75rem;
    }

    @media ${deviceMaxWidth.tablet} {
      flex-direction: column;

      span {
        margin-right: 0;
        margin-bottom: 0.75rem;
        width: 70%;
      }
    }
  }

  .alreadySolved {
    color: ${colors.opaqueGray};
    position: absolute;
    right: 2rem;
    bottom: 1rem;

    @media ${deviceMaxWidth.tablet} {
      left: 0;
      right: 0;
      text-align: center;
    }
  }

  &:hover {
    transform: scale(1);
  }
`
