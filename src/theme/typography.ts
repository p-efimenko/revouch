import type { ThemeOptions } from '@mui/material'
import { fonts } from './fonts'

export const typography: ThemeOptions['typography'] = {
  fontFamily: fonts.inter,

  // Heading / Extra Large
  h1: {
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px',
  },

  // Heading / Large
  h2: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '28px',
  },

  // Heading / Medium
  h3: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '24px',
  },

  // Heading / Normal
  h4: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '24px',
  },

  // Heading / Small
  h5: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '20px',
  },

  // Heading / Extra Small
  h6: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '16px',
  },

  // Paragraph / Extra Large
  p1: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
  },

  // Paragraph / Large
  p2: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
  },

  // Paragraph / Medium
  p3: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
  },

  // Paragraph / Small
  p4: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
  },

  // PARAGRAPH / TINY
  p5: {
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '14px',
    textTransform: 'uppercase',
  },
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    p1: React.CSSProperties
    p2: React.CSSProperties
    p3: React.CSSProperties
    p4: React.CSSProperties
    p5: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    p1?: React.CSSProperties
    p2?: React.CSSProperties
    p3?: React.CSSProperties
    p4?: React.CSSProperties
    p5?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    p1: true
    p2: true
    p3: true
    p4: true
    p5: true
  }
}
