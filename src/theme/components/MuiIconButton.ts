import { Components, Theme } from '@mui/material/styles'

export const MuiIconButton: Components<Theme>['MuiIconButton'] = {
  defaultProps: {
    size: 'medium',
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover': {
        backgroundColor: theme.palette.black[100],
      },

      '&:active': {
        backgroundColor: theme.palette.black[100],
      },
    }),
  },
  variants: [
    {
      props: {
        size: 'extra-large',
      },
      style: ({ theme }) => ({
        height: 48,
        width: 48,
        borderRadius: 20,
      }),
    },
  ],
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    'extra-large': true;
  }
}
