import { DialogContent } from '@mui/material'

interface ModalBodyProps {
  dividers?: boolean
  sx?: Record<string, any>
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
