'use client'

import type { ReactNode } from 'react'
import { ModalProvider } from './Modal.context'
import { ModalHeader, ModalBody, ModalFooter } from './components'

import { Dialog } from '@mui/material'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
  width?: number | string
  scroll?: 'paper' | 'body'
  isShowClose?: boolean
  onClose: () => void
  onDestroy: () => void
}

const ModalRoot = (props: ModalProps) => {
  const {
    children,
    isOpen,
    isShowClose = true,
    onClose,
    onDestroy,
    width,
    scroll = 'paper',
  } = props

  return (
    <ModalProvider value={{ onClose, isShowClose }}>
      <Dialog
        open={isOpen}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: {
              xs: '95%',
              sm: width,
            },
            maxWidth: {
              xs: '95%',
              sm: width,
            },
            borderRadius: '16px',
          },
        }}
        scroll={scroll}
        onClose={() => onClose()}
        onTransitionExited={onDestroy}
      >
        {children}
      </Dialog>
    </ModalProvider>
  )
}

ModalRoot.displayName = 'ModalRoot'

export const Modal = ModalRoot as typeof ModalRoot & {
  Header: typeof ModalHeader
  Body: typeof ModalBody
  Footer: typeof ModalFooter
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
