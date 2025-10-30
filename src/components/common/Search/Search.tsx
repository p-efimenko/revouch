'use client'

import { ChangeEvent } from 'react'
import { TextField } from '@/components/ui'

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const Search = ({ value, onChange, placeholder = 'Search', autoFocus }: SearchProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <TextField
      variant="filled"
      placeholder={placeholder}
      startIcon="search"
      endIcon={value ? 'close' : undefined}
      value={value}
      onChange={handleChange}
      onEndIconClick={handleClear}
      autoFocus={autoFocus}
    />
  )
}