'use client'

import { Divider, Link, Stack, Typography } from '@mui/material'

type ExpiredLinkStepProps = {
  onBack: () => void
}

export const ExpiredLinkStep = (props: ExpiredLinkStepProps) => {
  const { onBack } = props

  return (
    <Stack width="100%" alignItems="center">
      <Divider>
        <Typography variant="h3">Link has expired</Typography>
        <Typography variant="p3">
          Link has expired we have sent you the new <br />
          link. A new one has been sent to you.
        </Typography>
      </Divider>

      <Stack textAlign="center" pt={24}>
        <Typography variant="p3" color="text.secondary">
          <Link
            component="button"
            onClick={onBack}
            color="text.secondary"
            sx={{ verticalAlign: 'top' }}
          >
            Back
          </Link>
        </Typography>
      </Stack>
    </Stack>
  )
}
