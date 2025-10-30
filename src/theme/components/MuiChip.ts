import { Components, Theme } from '@mui/material/styles'

export const MuiChip: Components<Theme>['MuiChip'] = {
  defaultProps: {
    variant: 'clean',
  },
  styleOverrides: {},
  variants: [
    {
      props: { variant: 'clean' },
      style: ({ theme }) => ({
        height: '40px',
        padding: '12px',
        borderRadius: '12px',
        backgroundColor: theme.palette.white[0],
        ...theme.typography.p3,

        '& .MuiSvgIcon-root': {
          color: theme.palette.black[1000],
          margin: 0,
        },

        '& .MuiChip-label': {
          padding: '0',
        },
      }),
    },
    {
      props: { variant: 'filled' },
      style: ({ theme }) => ({
        height: '28px',
        padding: '6px 8px',
        borderRadius: '8px',
        backgroundColor: theme.palette.black[200],
        ...theme.typography.p4,

        '& .MuiSvgIcon-root': {
          color: theme.palette.black[1000],
          marginRight: 8,
        },

        '& .MuiChip-label': {
          padding: '0',
        },
      }),
    },
  ],
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    clean: true;
  }
}
