import styled from 'styled-components'
import colors from '../../styles/colors'
import { deviceMaxWidth } from '../../styles/devices'

interface ICheckInputProps {
  isSelected?: boolean
}

export const Container = styled.div`
  display: flex;

  @media ${deviceMaxWidth.laptop} {
    flex-direction: column-reverse;
    min-height: 100vh;
  }
`

export const RegisterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 10rem;
  font-size: 1.25rem;
  min-height: 100vh;

  h1 {
    margin-bottom: 72px;

    @media ${deviceMaxWidth.tablet} {
      margin-bottom: 48px;
    }

    @media ${deviceMaxWidth.mobileL} {
      margin-bottom: 24px;
    }
  }

  label {
    margin-top: 24px;
  }

  button {
    width: 100%;
    margin-top: 36px;
    font-weight: bold;
  }

  .forgotPasswordBtn {
    width: fit-content;
    margin-top: 16px;
    color: ${colors.terciary};

    &:hover {
      color: ${colors.primary};
    }
  }

  .loginSection {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 72px;

    button {
      margin: 0;
      padding: 0 0.25em;
    }

    @media ${deviceMaxWidth.tablet} {
      flex-direction: column;
      margin-top: 48px;
      button {
        margin-top: 12px;
      }
    }
  }

  .checkInputs {
    margin: 2rem 0;
  }

  @media ${deviceMaxWidth.laptopL} {
    padding: 5rem;
  }

  @media ${deviceMaxWidth.tablet} {
    font-size: 1rem;
    padding: 4rem;
  }

  @media ${deviceMaxWidth.mobileL} {
    padding: 1rem;
  }
`

export const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, ${colors.primary}, ${colors.secondary});
  max-width: 40vw;

  img {
    max-width: 60%;

    @media ${deviceMaxWidth.tablet} {
      max-width: 80%;
      max-height: 100px;
    }

    @media ${deviceMaxWidth.mobileL} {
      max-width: 100%;
      max-height: 80px;
    }
  }

  @media ${deviceMaxWidth.laptop} {
    height: auto;
    max-width: none;
    width: 100%;
    padding: 3rem;
  }

  @media ${deviceMaxWidth.mobileL} {
    padding: 2rem;
  }
`

export const CheckInput = styled.div<ICheckInputProps>`
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
