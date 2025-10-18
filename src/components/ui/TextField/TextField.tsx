import { useId } from 'react'

import {
  FormControl,
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
  Typography,
  Stack,
  Box,
  InputAdornment,
} from '@mui/material'

import { Label, Icon } from '@/components/ui'
import { type IconName } from '@/icons'

export type TextFieldProps = {
  label?: string | null
  labelType?: 'input' | 'form'
  isShowError?: boolean
  required?: boolean
  //notched?: boolean
  //shrink?: boolean
  defaultValue?: string | number | readonly string[]
  errors?: string[]
  startIcon?: IconName
  endIcon?: IconName
} & MuiTextFieldProps

export const TextField = (props: TextFieldProps) => {
  const {
    disabled,
    error,
    errors,
    isShowError = true,
    label,
    labelType = 'form',
    required,
    //notched = true,
    //shrink = true,
    startIcon,
    endIcon,
    size,
    sx,
    ref,
    ...rest
  } = props

  const labelId = useId()

  return (
    <FormControl fullWidth>
      {label && (
        <Label id={labelId} type={labelType} disabled={disabled} required={required}>
          {label}
        </Label>
      )}

      <MuiTextField
        ref={ref}
        id={labelId}
        disabled={disabled}
        size={size}
        sx={sx}
        error={!!error}
        slotProps={{
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start">
                <Icon size={16} aria-label={startIcon} name={startIcon} />
              </InputAdornment>
            ) : undefined,
            endAdornment: endIcon ? (
              <InputAdornment position="end">
                {/* Box to add padding to the icon to be like IconButton */}
                <Box p={8}>
                  <Icon size={16} aria-label={endIcon} name={endIcon} />
                </Box>
              </InputAdornment>
            ) : undefined,
          },
        }}
        {...rest}
      />

      {(error || errors) && isShowError && (
        <>
          {errors?.map((error: string, index: number) => (
            <Stack spacing={4} ml={2} mt={4} key={index}>
              <Typography variant="p4" color="error">
                {error}
              </Typography>
            </Stack>
          ))}
        </>
      )}
    </FormControl>
  )
}

TextField.displayName = 'TextField'
