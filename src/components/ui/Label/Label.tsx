import { FormLabel, InputLabel } from '@mui/material'

type LabelProps = {
  id: string
  type: 'input' | 'form'
  disabled?: boolean
  children: React.ReactNode
  focused?: boolean
  error?: boolean
  required?: boolean
}

export const Label = (props: LabelProps) => {
  const { children, disabled, error = false, focused = false, id, required = false, type } = props

  return (
    <>
      {type === 'input' ? (
        <InputLabel
          id={id}
          shrink={true}
          disabled={disabled}
          focused={focused}
          error={error}
          required={required}
        >
          {children}
        </InputLabel>
      ) : (
        <FormLabel
          htmlFor={id}
          focused={focused}
          error={error}
          disabled={disabled}
          required={required}
        >
          {children}
        </FormLabel>
      )}
    </>
  )
}
