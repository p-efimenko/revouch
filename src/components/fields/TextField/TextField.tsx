import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '@/hooks/form'
import { TextField as TextFieldUI, type TextFieldProps } from '@/components/ui'
import { type ZodError } from 'zod'

export const TextField = (props: TextFieldProps) => {
  const { ...rest } = props

  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <TextFieldUI
      {...rest}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={errors.length > 0}
      errors={errors.map((error: ZodError) => error.message)}
    />
  )
}
