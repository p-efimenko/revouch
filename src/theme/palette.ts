import type { PaletteOptions } from '@mui/material'
import { black, blue, red, green, white } from './colors'

export const palette: PaletteOptions = {
  primary: {
    main: '#265BF9',
  },

  text: {
    primary: black[900],
    secondary: black[600],
  },

  error: {
    main: red[500],
  },

  success: {
    main: green[500],
  },

  background: {
    default: black[200],
  },

  divider: black[300],

  black: {
    100: black[100],
    200: black[200],
    300: black[300],
    400: black[400],
    500: black[500],
    600: black[600],
    700: black[700],
    800: black[800],
    900: black[900],
    1000: black[1000],
  },

  blue: {
    200: blue[200],
    500: blue[500],
    600: blue[600],
    700: blue[700],
  },

  red: {
    200: red[200],
    500: red[500],
    600: red[600],
    700: red[700],
  },

  green: {
    200: green[200],
    500: green[500],
    600: green[600],
    700: green[700],
  },

  white: {
    0: white[0],
  },
}

type ColorShades = {
  0?: string
  100?: string
  200?: string
  300?: string
  400?: string
  500?: string
  600?: string
  700?: string
  800?: string
  900?: string
  1000?: string
}

declare module '@mui/material/styles' {
  interface Palette {
    black: ColorShades
    blue: ColorShades
    red: ColorShades
    green: ColorShades
    white: ColorShades
  }

  interface PaletteOptions {
    black: ColorShades
    blue: ColorShades
    red: ColorShades
    green: ColorShades
    white: ColorShades
  }
}
