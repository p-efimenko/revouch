import { createFormHook, revalidateLogic, useStore } from '@tanstack/react-form'
import { createFormHookContexts } from '@tanstack/react-form'

import { TextField, SubmitButton, PasswordField, PinInput } from '@/components/fields'

export { useStore }

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const {
  useAppForm: useTanstackAppForm,
  withForm,
  withFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    PinInput,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

// Extract the function signature from useTanstackAppForm automatically
type UseAppFormSignature = typeof useTanstackAppForm

export const useAppForm: UseAppFormSignature = (options) => {
  const form = useTanstackAppForm({
    validationLogic: revalidateLogic(),
    ...options,
  })

  return form
}
