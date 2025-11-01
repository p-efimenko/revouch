import { Box, type BoxProps } from '@mui/material'

type CenterProps = BoxProps & {
  children: React.ReactNode
}

export const Center = (props: CenterProps) => {
  const { children, ...rest } = props

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
      minWidth="100%"
      {...rest}
    >
      {children}
    </Box>
  )
}