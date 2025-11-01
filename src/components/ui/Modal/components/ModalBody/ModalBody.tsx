import { DialogContent, type Theme, type SxProps } from '@mui/material'

interface ModalBodyProps {
  dividers?: boolean
  sx?: SxProps<Theme>
  children: React.ReactNode
}

export const ModalBody = (props: ModalBodyProps) => {
  const { children, dividers = true, sx } = props

  return (
    <DialogContent dividers={dividers} sx={sx}>
      {children}
    </DialogContent>
  )
}
