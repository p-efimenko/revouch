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
  label?: string | null;
  labelType?: 'input' | 'form';
  isShowError?: boolean;
  required?: boolean;
  //notched?: boolean
  //shrink?: boolean
  defaultValue?: string | number | readonly string[];
  errors?: string[];
  startIcon?: IconName;
  endIcon?: IconName;
  maxLength?: number;
  onEndIconClick?: () => void;
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
    maxLength,
    onEndIconClick,
    ...rest
  } = props

  const labelId = useId()
  const isHasErrors = error || errors
  const isLengthError = !!maxLength && maxLength < (rest.value as string).length


  const handleEndIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEndIconClick) {
      onEndIconClick()
    }
  }

  return (
    <FormControl fullWidth>
      {label && (
        <Label
          id={labelId}
          type={labelType}
          disabled={disabled}
          required={required}
        >
          {label}
        </Label>
      )}

      <MuiTextField
        ref={ref}
        id={labelId}
        disabled={disabled}
        size={size}
        sx={sx}
        error={!!error || isLengthError}
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
                <Box p={8} onClick={handleEndIconClick} sx={{ cursor: 'pointer' }}>
                  <Icon size={16} aria-label={endIcon} name={endIcon} />
                </Box>
              </InputAdornment>
            ) : undefined,
          },
        }}
        {...rest}
      />

      {isHasErrors && isShowError && (
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

      {maxLength && isHasErrors && (
        <Typography variant="p4" color={isLengthError ? 'error' : 'black.500'} mt={8}>
          {`${rest?.value?.length}/${maxLength} symbols`}
        </Typography>
      )}
    </FormControl>
  )
}

TextField.displayName = 'TextField'
