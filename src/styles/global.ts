import { createGlobalStyle } from 'styled-components'
import colors from './colors'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    background-color: ${colors.pureWhite};
    color: ${colors.black};
  }

  button, input, label, textarea {
    font-size: inherit;
    font-family: inherit;
    outline: none;
    border: none;
  }

  ul, ol {
    list-style: none;
  }
`
