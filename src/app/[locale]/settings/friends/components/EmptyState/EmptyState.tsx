import { Stack, Typography } from '@mui/material'
import { IconName } from '@/components/ui/Icon/Icon'
import { Icon } from '@/components/ui'

interface EmptyStateProps {
  title: string
  description: string
  icon: IconName
}

export const EmptyState = (props: EmptyStateProps) => {
  const { title, description, icon } = props

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="60dvh">
      <Icon name={icon} size={48} />
      <Typography variant="h5" mt={16}>{title}</Typography>
      <Typography variant="p4">{description}</Typography>
    </Stack>
  )
}