import {
  enqueueSnackbar,
  closeSnackbar,
  type OptionsObject,
  type SnackbarMessage,
  type VariantType,
} from 'notistack'

type ToastOptions = Omit<OptionsObject, 'variant'>

export const useToast = () => {
  const showToast =
    (variant: VariantType) =>
    (message: SnackbarMessage, options: ToastOptions = {}) =>
      enqueueSnackbar({
        message,
        ...options,
        variant,
      })

  return {
    success: showToast('success'),
    error: showToast('error'),
    info: showToast('info'),
    warning: showToast('warning'),
    close: closeSnackbar,
  }
}
