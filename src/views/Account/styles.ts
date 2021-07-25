import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  .emailWrapper {
    margin-bottom: 4rem;
    div {
      margin-bottom: 0.5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 4rem;

    button {
      margin-top: 1rem;
    }
  }

  .passwordWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 4rem;

    button {
      padding-left: 0;
    }
  }

  .logout {
    display: flex;
    justify-content: flex-start;

    button {
      padding-left: 0;
      color: ${colors.warning};

      &:hover {
        color: ${colors.warningSecondary};
      }
    }
  }
`
