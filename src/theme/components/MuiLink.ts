import { Components, Theme } from '@mui/material'

export const MuiLink: Components<Theme>['MuiLink'] = {
  defaultProps: {
    color: 'primary',
    underline: 'hover',
  },

  styleOverrides: {
    root: {
      //fontWeight: 600,
    },
  },
}
