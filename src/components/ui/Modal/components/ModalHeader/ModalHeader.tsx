import * as Styled from './ModalHeader.styled'

import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

import { CloseButton } from '../CloseButton'
import { useModalContext } from '../../Modal.context'

interface ModalHeaderProps {
  children?: React.ReactNode
  inline?: boolean
  title?: string
  sx?: SxProps<Theme>
  fontSize?: string | number
  fontWeight?: string | number
}

export const ModalHeader = (props: ModalHeaderProps) => {
  const { children, fontSize, fontWeight, inline = false, sx, title } = props

  const { isShowClose, onClose } = useModalContext()

  const Wrapper = inline ? Box : Styled.Wrapper

  return (
    <Wrapper sx={{ ...sx }}>
      {title ? (
        <DefaultHeader title={title} fontSize={fontSize} fontWeight={fontWeight} />
      ) : (
        children
      )}

      {isShowClose && <CloseButton onClose={onClose} />}
    </Wrapper>
  )
}

interface DefaultHeaderProps {
  title: string
  fontSize?: string | number
  fontWeight?: string | number
}

const DefaultHeader = (props: DefaultHeaderProps) => {
  const { fontSize, fontWeight, title } = props

  return (
    <Typography variant="h2" fontSize={fontSize} fontWeight={fontWeight}>
      {title}
    </Typography>
  )
}
