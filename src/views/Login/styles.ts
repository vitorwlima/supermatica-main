import styled from 'styled-components'
import colors from '../../styles/colors'
import { deviceMaxWidth } from '../../styles/devices'

export const Container = styled.div`
  display: flex;

  @media ${deviceMaxWidth.laptop} {
    flex-direction: column-reverse;
    height: 100vh;
  }
`

export const LoginSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10rem;
  font-size: 1.25rem;
  height: 100vh;

  h1 {
    margin-bottom: 72px;

    @media ${deviceMaxWidth.tablet} {
      margin-bottom: 48px;
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

  .registerSection {
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
  height: 100vh;
  max-width: 40vw;

  img {
    max-width: 60%;

    @media ${deviceMaxWidth.tablet} {
      max-width: 80%;
    }

    @media ${deviceMaxWidth.mobileL} {
      max-width: 100%;
    }
  }

  @media ${deviceMaxWidth.laptop} {
    height: auto;
    max-width: none;
    width: 100%;
    padding: 6rem;
  }

  @media ${deviceMaxWidth.mobileL} {
    padding: 4rem;
  }
`
