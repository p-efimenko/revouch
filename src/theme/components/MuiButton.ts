import { Components, Theme } from '@mui/material/styles'

export const MuiButtonBase: Components<Theme>['MuiButtonBase'] = {
  defaultProps: {
    disableRipple: true,
  },
}

export const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    size: 'medium',
  },
  styleOverrides: {
    root: () => ({
      borderRadius: '8px',
      textTransform: 'none',
      boxShadow: 'none',

      '&.MuiButton-loading': {
        color: 'transparent !important',
        transition: 'color 150ms linear, opacity 150ms linear',

        '.MuiButton-icon': {
          opacity: 0,
        },
      },

      '&:hover': {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
    }),
  },
  variants: [
    {
      props: { variant: 'contained' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.blue[500],
        color: theme.palette.white[0],

        '&:hover': {
          backgroundColor: theme.palette.blue[600],
        },

        '&:active': {
          backgroundColor: theme.palette.blue[700],
        },

        '&.Mui-disabled': {
          backgroundColor: theme.palette.blue[200],
          color: theme.palette.white[0],
        },

        '.MuiButton-loadingIndicator': {
          color: 'rgb(255 255 255 / 50%);',
        },
      }),
    },
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.white[0],
        color: theme.palette.black[900],
        border: `1px solid ${theme.palette.black[400]}`,
        '&:hover': {
          backgroundColor: theme.palette.black[100],
        },
        '&:active': {
          backgroundColor: theme.palette.black[300],
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.white[0],
        },
      }),
    },
    {
      props: { variant: 'warning' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.red[500],
        color: theme.palette.white[0],
        '&:hover': {
          backgroundColor: theme.palette.red[600],
        },
        '&:active': {
          backgroundColor: theme.palette.red[700],
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.red[200],
          color: theme.palette.white[0],
        },
      }),
    },
    {
      props: { size: 'extra-large' },
      style: ({ theme }) => ({
        height: '48px',
        padding: '12px 24px',
        ...theme.typography.p2,
      }),
    },
    {
      props: { size: 'large' },
      style: ({ theme }) => ({
        height: '40px',
        padding: '8px 24px',
        ...theme.typography.p2,
      }),
    },
    {
      props: { size: 'medium' },
      style: ({ theme }) => ({
        height: '32px',
        padding: '4px 16px',
        ...theme.typography.p3,
      }),
    },
    {
      props: { size: 'small' },
      style: ({ theme }) => ({
        height: '24px',
        padding: '4px 12px',
        ...theme.typography.p4,
      }),
    },
  ],
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    warning: true
  }

  interface ButtonPropsSizeOverrides {
    'extra-large': true
  }
}
