import { Components, Theme } from '@mui/material/styles'

export const MuiListItem: Components<Theme>['MuiListItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      height: 56,
      padding: '16px 0',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.black[100],
        '& .MuiListItemText-root': {
          margin: 0,
          '& .MuiTypography-root': {
            color: theme.palette.blue[500],
          },
        },
        '& .MuiListItemButton-root': {
          '& .MuiListItemIcon-root': {
            color: theme.palette.blue[500],
          },
        },
      },
      '& .MuiListItemIcon-root': {
        height: 20,
        width: 20,
        minWidth: 20,
        margin: '0 20px 0 0',
        color: theme.palette.black[900],
      },

      '& .MuiListItemText-root': {
        margin: 0,
      },

      '& .MuiListItemButton-root': {
        transition: 'none',

        '&:hover': {
          backgroundColor: 'inherit',

          '& .MuiListItemIcon-root': {
            color: theme.palette.blue[500],
          },
        },
      },
    }),
  },
}
