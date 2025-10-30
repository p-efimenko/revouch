'use client'

import { useTransition } from 'react'
import { Stack, Typography, Button, Box } from '@mui/material'

export type ErrorProps = {
  reset: () => void
}

export default function Error(props: ErrorProps) {
  const { reset } = props

  const [isPending, startTransition] = useTransition()

  const handleRetry = () => {
    startTransition(() => {
      reset()
    })
  }

  return (
    <Stack minHeight='100%' justifyContent="center" alignItems="center">
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box width={120} height={86} bgcolor="white.0" borderRadius={2}></Box>

        <Typography variant="h4" gutterBottom mt={16}>
          Something went wrong
        </Typography>
        <Typography variant="p3" mb={4} >
          Try a bit later
        </Typography>

        <Button
          size="medium"
          variant="outlined"
          sx={{ mt: 16 }}
          onClick={handleRetry}
          disabled={isPending}
        >
          Retry
        </Button>
      </Stack>
    </Stack>
  )
}
