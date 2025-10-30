import { Components, Theme } from '@mui/material/styles'

export const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => {
      const blue = theme.palette.blue?.[500] || '#2196f3'
      return {
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: blue,
              opacity: 1,
              border: 0,
              ...theme.applyStyles?.('dark', {
                backgroundColor: blue,
              }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: blue,
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles?.('dark', {
              color: theme.palette.grey[600],
            }),
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles?.('dark', {
              opacity: 0.3,
            }),
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 13,
          backgroundColor: theme.palette.black[400],
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
          ...theme.applyStyles?.('dark', {
            backgroundColor: theme.palette.black[400],
          }),
        },
      }
    },
  },
}
