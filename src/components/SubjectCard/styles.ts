import styled from 'styled-components'
import colors from '../../styles/colors'

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
  margin-bottom: 0.75rem;

  svg {
    font-size: 1.25rem;
  }

  &:hover {
    transform: scale(1);
  }
`
