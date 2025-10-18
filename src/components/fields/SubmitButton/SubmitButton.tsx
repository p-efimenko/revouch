import { Button as MuiButton } from '@mui/material'

import { useFormContext } from '@/hooks/form'

type SubmitButtonProps = {
  label: string
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { label } = props

  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <MuiButton
          disabled={isSubmitting}
          onClick={() => form.handleSubmit({ submitAction: 'continue' })}
        >
          {label}
        </MuiButton>
      )}
    </form.Subscribe>
  )
}
