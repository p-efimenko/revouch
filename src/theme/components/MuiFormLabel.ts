import { Components, Theme } from '@mui/material/styles'

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.p2,
      color: theme.palette.black[500],
    }),
  },
  variants: [],
}
