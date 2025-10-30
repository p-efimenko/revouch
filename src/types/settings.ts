import { IconName } from '@/icons'

export type ListItemData = {
  id: number
  icon: IconName
  title: string
  href?: string
  checked?: boolean
  onChange?: (id?: number) => void
  onClick?: () => void
  isToggle?: boolean
  isCheckbox?: boolean
}
