import { SvgIcon, SvgIconProps, type Theme } from '@mui/material'
import { Breakpoint, SxProps } from '@mui/system'

import { type IconName } from '@/icons'

export { type IconName }

export type ResponsiveSize = Partial<Record<Breakpoint, number | string>>

const href = './icons/sprite.svg'

export type IconProps = {
  name: IconName
  size?: number | ResponsiveSize
  sx?: SxProps<Theme>
} & SvgIconProps

export const Icon = ({ name, size = 24, sx, ...props }: IconProps) => {
  return (
    <SvgIcon sx={{ width: size, height: size, ...sx }} {...props}>
      <use href={`${href}#${name}`} />
    </SvgIcon>
  )
}
