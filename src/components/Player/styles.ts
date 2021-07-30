import styled from 'styled-components'
import colors from '../../styles/colors'
import { deviceMaxWidth } from '../../styles/devices'

interface IContainerProps {
  isPlaying: boolean
  isCursorVisible: boolean
}

interface IFooterOverlayProps {
  show: boolean
  videoProgress: number
}

interface IOverlayProps {
  showPlayButton: boolean
}

interface IPlayerButtonProps {
  showModal?: boolean
}

interface IOptionProps {
  isSelected: boolean
}

interface ILoadingProps {
  show: boolean
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  padding-top: 56.25%;
  cursor: ${props => !props.isCursorVisible && 'none'};

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16/9 !important;

    transition: filter 0.4s;
    filter: ${props => !props.isPlaying && 'brightness(0.3)'};
  }
`

export const Overlay = styled.div<IOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: ${colors.darkWhite};
    font-size: 2rem;
    cursor: pointer;
    opacity: ${props => !props.showPlayButton && 0};
    transition: opacity 0.4s;
  }
`

export const Loading = styled.div<ILoadingProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 20;
  display: ${props => !props.show && 'none'};

  div {
    width: 60px;
    height: 60px;
    background-color: #000;
    border: 4px solid ${colors.primary};
    border-bottom: 4px solid transparent;
    border-radius: 50%;

    animation: rotateLoading 1s infinite;
  }

  @keyframes rotateLoading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const FooterOverlay = styled.div<IFooterOverlayProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  transition: opacity 0.4s;
  padding: 0 1rem;
  z-index: 10;
  opacity: ${props => !props.show && 0};

  display: flex;
  align-items: center;
  justify-content: space-between;

  .progress-bar {
    position: absolute;
    bottom: 48px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.opaqueGray};

    div {
      width: ${props => (props.videoProgress ? `${props.videoProgress * 100}%` : '0%')};
      background-color: ${colors.primary};
      height: 2px;
    }
  }
`

export const PlayerButton = styled.button<IPlayerButtonProps>`
  background-color: transparent;
  margin-right: 1rem;
  padding: 0.2em;
  cursor: pointer;
  position: relative;

  svg {
    font-size: 1.25rem;
    color: ${colors.darkWhite};

    @media ${deviceMaxWidth.mobileL} {
      font-size: 1rem;
    }

    @media ${deviceMaxWidth.mobileS} {
      font-size: 0.8rem;
    }
  }

  &:last-child {
    margin-right: 0;
  }

  .volume-input {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }

    input {
      height: 5px;
      width: ${props => (props.showModal ? '90px' : '0px')};
      opacity: ${props => (props.showModal ? 1 : 0)};
      transition: 0.3s;
    }
  }

  .speed-modal,
  .quality-modal {
    position: absolute;
    display: ${props => (props.showModal ? 'flex' : 'none')};
    flex-direction: column;
    bottom: 36px;
    right: 10px;
    width: 144px;
    background-color: ${colors.dark};
    color: ${colors.pureWhite};
    border-radius: 0.4em;
  }

  .quality-modal {
    width: 169px;
  }
`

export const Option = styled.div<IOptionProps>`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;

  .circleToMark {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: ${props => (props.isSelected ? `1.5px solid ${colors.primary}` : `1.5px solid ${colors.pureWhite}`)};
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
