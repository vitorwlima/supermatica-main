import React, { useCallback, useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player/vimeo'
import {
  FaPlay,
  FaPause,
  FaUndo,
  FaRedo,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeOff,
  FaTimes,
  FaCog,
  FaExpand,
} from 'react-icons/fa'
import screenfull from 'screenfull'

import { Container, FooterOverlay, Loading, Option, Overlay, PlayerButton } from './styles'

interface IPlayerProps {
  url: string
}

export const Player = ({ url }: IPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const inputRangeVolumeRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState<'volume' | 'speed' | 'quality' | ''>('')

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState({ playedSeconds: 0, played: 0, loaded: 0, loadedSeconds: 0 })
  const [totalDuration, setTotalDuration] = useState(0)
  const [volume, setVolume] = useState(window.innerWidth > 768 ? 0.5 : 1)
  const [currentSpeed, setCurrentSpeed] = useState(1)
  const [currentQuality, setCurrentQuality] = useState('360p')

  const speeds = [2, 1.5, 1, 0.5]
  const qualities = ['Automático', '1080p', '720p', '540p', '360p']

  useEffect(() => {
    if (containerRef.current) {
      let timeout = setTimeout(() => {
        if (showControls) {
          setShowControls(false)
        }
      }, 3000)

      const containerMouseMove = () => {
        if (timeout) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
          if (showControls) {
            setShowControls(false)
          }
        }, 3000)

        if (!showControls) {
          setShowControls(true)
        }
      }

      containerRef.current.addEventListener('mousemove', containerMouseMove)
      containerRef.current.addEventListener('touchmove', containerMouseMove)
    }
  }, [showControls])

  const handleOverlayClick = useCallback(() => {
    if (settingsModalOpen === '') {
      return setIsPlaying(prev => !prev)
    }
    setSettingsModalOpen('')
  }, [settingsModalOpen])

  const handlePlay = useCallback(() => {
    setSettingsModalOpen('')
    setIsPlaying(prev => !prev)
  }, [])

  const handleGoBack = () => {
    setSettingsModalOpen('')
    playerRef.current.seekTo(progress.playedSeconds < 10 ? 0 : progress.playedSeconds - 10, 'seconds')
  }

  const handleGoForward = () => {
    setSettingsModalOpen('')
    playerRef.current.seekTo(
      totalDuration - progress.playedSeconds < 10 ? totalDuration : progress.playedSeconds + 10,
      'seconds'
    )
  }

  const renderVolumeIcon = useCallback(() => {
    if (volume === 0) {
      return <FaVolumeOff />
    }

    if (volume <= 0.3) {
      return <FaVolumeDown />
    }

    return <FaVolumeUp />
  }, [volume])

  const handleRequestFullscreen = useCallback(async () => {
    if (screenfull.isEnabled && containerRef.current) {
      if (screenfull.isFullscreen) {
        await screenfull.exit()
      } else {
        await screenfull.request(containerRef.current)
      }
    }
  }, [containerRef])

  useEffect(
    () => console.log(currentQuality === 'Automático' ? url : `${url}?quality=${currentQuality}`),
    [currentQuality, url]
  )

  return (
    <Container
      isPlaying={isPlaying}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      isCursorVisible={showControls}
      ref={containerRef}
    >
      <Loading show={loading}>
        <div></div>
      </Loading>
      <ReactPlayer
        className='react-player'
        url={currentQuality === 'Automático' ? url : `${url}?quality=${currentQuality}`}
        ref={playerRef}
        playing={isPlaying}
        onProgress={prog => setProgress(prog)}
        onDuration={durat => setTotalDuration(durat)}
        volume={volume}
        playbackRate={currentSpeed}
        onReady={() => setLoading(false)}
      />
      <Overlay onClick={handleOverlayClick} showPlayButton={showControls || !isPlaying}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Overlay>
      <FooterOverlay className='player-footer' show={showControls || !isPlaying} videoProgress={progress.played}>
        <div className='progress-bar'>
          <div></div>
        </div>
        <div>
          <PlayerButton onClick={handlePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</PlayerButton>
          <PlayerButton onClick={handleGoBack}>
            <FaUndo />
          </PlayerButton>
          <PlayerButton onClick={handleGoForward}>
            <FaRedo />
          </PlayerButton>
          {window.innerWidth > 768 && (
            <PlayerButton
              showModal={settingsModalOpen === 'volume'}
              onMouseEnter={() => setSettingsModalOpen('volume')}
              onMouseLeave={() => setSettingsModalOpen('')}
            >
              <div className='volume-input'>
                {renderVolumeIcon()}
                <input
                  ref={inputRangeVolumeRef}
                  type='range'
                  value={volume}
                  onChange={event => setVolume(+event.target.value)}
                  min={0}
                  max={1}
                  step='any'
                />
              </div>
            </PlayerButton>
          )}
        </div>
        <div>
          <PlayerButton showModal={settingsModalOpen === 'speed'}>
            <FaTimes
              onClick={
                settingsModalOpen === 'speed' ? () => setSettingsModalOpen('') : () => setSettingsModalOpen('speed')
              }
            />
            <div className='speed-modal'>
              {speeds.map(speed => (
                <Option key={speed} isSelected={speed === currentSpeed} onClick={() => setCurrentSpeed(speed)}>
                  <div className='circleToMark'></div>
                  {speed} x
                </Option>
              ))}
            </div>
          </PlayerButton>
          <PlayerButton showModal={settingsModalOpen === 'quality'}>
            <FaCog
              onClick={
                settingsModalOpen === 'quality' ? () => setSettingsModalOpen('') : () => setSettingsModalOpen('quality')
              }
            />
            <div className='quality-modal'>
              {qualities.map(quality => (
                <Option
                  key={quality}
                  isSelected={quality === currentQuality}
                  onClick={() => setCurrentQuality(quality)}
                >
                  <div className='circleToMark'></div>
                  {quality}
                </Option>
              ))}
            </div>
          </PlayerButton>
          <PlayerButton onClick={handleRequestFullscreen}>
            <FaExpand />
          </PlayerButton>
        </div>
      </FooterOverlay>
    </Container>
  )
}
