import { SnackbarProviderProps } from 'notistack'

export default {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  maxSnack: 5,
  autoHideDuration: 3000,
  preventDuplicate: true,
} satisfies SnackbarProviderProps
