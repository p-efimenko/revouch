import Image from 'next/image'
import NextLink from 'next/link'
import { Box } from '@mui/material'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        alignItems: 'center',
        margin: '0 auto',
        py: 70,
        px: 20,
      }}
    >
      <NextLink href="/">
        <Image src="/logo.svg" alt="Revouch" width={128} height={34} />
      </NextLink>

      <Box
        display="flex"
        flex={1}
        alignItems="center"
        justifyContent="center"
        mt={40}
        width="100%"
        maxWidth={360}
      >
        {children}
      </Box>
    </Box>
  )
}
