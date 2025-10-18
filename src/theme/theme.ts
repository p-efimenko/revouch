'use client'
import { createTheme } from '@mui/material/styles'
import { palette } from './palette'
import { breakpoints } from './breakpoints'
import { typography } from './typography'
import * as components from './components'

export const theme = createTheme({
  breakpoints,
  palette,
  spacing: 1,
  typography,
  components: {
    ...components,
  },
})

export default theme
