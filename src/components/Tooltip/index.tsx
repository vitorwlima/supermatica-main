import React, { useEffect, useState } from 'react'

import { Container } from './styles'

export interface TooltipProps {
  title: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if(title) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
  }, [title])

  return (
    <Container className={className} preview={!!title && visible}>
      {children}
      <span>{title}</span>
    </Container>
  )
}
