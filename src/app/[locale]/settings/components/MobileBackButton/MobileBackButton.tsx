'use client'

import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import NextLink from 'next/link'
import { Icon } from '@/components/ui'

interface MobileBackButtonProps {
  href: string
  title: string
}
export const MobileBackButton = (props: MobileBackButtonProps) => {
  const { href, title } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (isMobile) {
    return (
      <IconButton sx={{ alignSelf: 'flex-start' }} component={NextLink} href={href}>
        <Icon name="arrow-left" size={16} sx={{ color: 'black.1000' }} />
        <Typography variant="p4" ml={8}>{title}</Typography>
      </IconButton>
    )
  }

  return <Box height={32} />
}