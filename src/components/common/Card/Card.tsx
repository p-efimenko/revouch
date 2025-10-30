import { Stack, StackProps } from '@mui/material'

export const Card = ({ children, ...rest }: { children: React.ReactNode } & StackProps) => {
  return (
    <Stack sx={{ borderRadius: 4, p: 16, backgroundColor: 'white.0' }} {...rest}>
      {children}
    </Stack>
  )
}
