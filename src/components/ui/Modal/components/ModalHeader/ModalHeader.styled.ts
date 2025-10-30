import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(props => {
  const { theme } = props

  return {
    position: 'relative',
    color: theme.palette.text.primary,
    padding: 24,
  }
})
