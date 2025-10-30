import { Components, Theme } from '@mui/material/styles'
import type { TextFieldProps } from '@mui/material/TextField'

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
    size: 'large',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      // Default border styling
      '& .MuiInputBase-root': {
        borderRadius: '8px',
      },

      '.MuiInputBase-input': {
        borderRadius: '0px !important',
      },

      '& .MuiIconButton-root': {
        color: theme.palette.black[1000],
      },

      '& .MuiOutlinedInput-root': {
        lineHeight: 0,
        backgroundColor: theme.palette.white[0],

        '& fieldset': {
          borderColor: theme.palette.black[300],
          borderWidth: '1px',
          transition: 'border-color 150ms linear',
        },

        '&:hover fieldset': {
          borderColor: theme.palette.black[400],
          borderWidth: '1px',
        },

        '&.Mui-focused fieldset': {
          borderColor: theme.palette.black[400],
          borderWidth: '1px',
        },

        '&.Mui-error fieldset': {
          borderColor: theme.palette.red[500],
          borderWidth: '1px',
        },

        // Make icons in .MuiInputAdornment-positionEnd red[500] when error
        '&.Mui-error .MuiInputAdornment-positionEnd': {
          color: theme.palette.red[500],
        },
      },
      // Autofill background color override
      '& input:-webkit-autofill, & input:-webkit-autofill:focus, & input:-webkit-autofill:hover, & input:-internal-autofill-selected':
      {
        boxShadow: `0 0 0 100px ${theme.palette.white[0]} inset !important`,
        WebkitBoxShadow: `0 0 0 100px ${theme.palette.white[0]} inset !important`,
        backgroundColor: `${theme.palette.white[0]} !important`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: theme.palette.black[900],
      },

      '& .MuiInputAdornment-root': {
        margin: 0,
        color: theme.palette.black[1000],
      },

      '& .MuiInputAdornment-positionStart': {
        marginRight: 8,
      },

      '& .MuiInputAdornment-positionEnd': {
        marginLeft: 8,
      },

      // Error state text color and icon color
      '&.Mui-error .MuiInputBase-input': {
        color: theme.palette.red[500],
      },

      // Error state for input text color (ensure input text is red[500] when error)
      '& .MuiInputBase-root.Mui-error .MuiInputBase-input': {
        color: theme.palette.red[500],
      },

      '& .MuiInputBase-root.Mui-error .MuiIconButton-root .MuiSvgIcon-root': {
        color: theme.palette.red[500],
      },
    }),
  },
  variants: [
    {
      props: { variant: 'filled' },
      style: ({ theme }) => ({
        color: theme.palette.black[900],
        borderRadius: '41px',
        width: '100%',

        // '& .MuiFilledInput-root': {
        //   '&:before, &:after, &:hover:before, &:hover:after, &.Mui-focused:before, &.Mui-focused:after': {
        //     borderWidth: '0 !important',
        //   },
        // },

        '& .MuiInputBase-root': {
          padding: '12px 16px',
          boxShadow: '0 0 10px 0 #1616160D',
          background: theme.palette.black[100],
          borderRadius: '41px',

          '&:before, &:after, &:hover:before, &:hover:after, &.Mui-focused:before, &.Mui-focused:after': {
            borderWidth: '0 !important',
          },

          // Also ensure focused fieldset has no border
          '&.Mui-focused fieldset': {
            borderWidth: 0,
          },

          // Autofill background color override
          '& input:-webkit-autofill, & input:-webkit-autofill:focus, & input:-webkit-autofill:hover, & input:-internal-autofill-selected':
          {
            boxShadow: `0 0 0 100px ${theme.palette.black[100]} inset !important`,
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.black[100]} inset !important`,
            backgroundColor: `${theme.palette.black[100]} !important`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: theme.palette.black[900],
          },

          '& .MuiInputAdornment-positionStart': {
            marginTop: '0 !important',
            marginRight: 8,
          },
        },

        '& .MuiInputBase-input': {
          height: 'auto',
          padding: 0,
          borderRadius: '41px',
          ...theme.typography.p3,

          '&::placeholder': {
            color: theme.palette.black[500],
            ...theme.typography.p3,
          },
        },
      }),
    },
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        color: theme.palette.black[900],

        '& .MuiInputBase-input::placeholder': {
          color: theme.palette.black[500],
        },
      }),
    },
    {
      props: { size: 'medium' },
      style: ({ theme }) => ({
        '& .MuiInputBase-root': {
          padding: 12,
          height: 40,
        },

        '& .MuiInputBase-input': {
          height: 'auto',
          padding: 0,
          ...theme.typography.p4,
        },
      }),
    },
    {
      props: { size: 'large' },
      style: ({ theme }) => ({
        height: 48,

        '& .MuiInputBase-root': {
          padding: 16,
          paddingRight: 8,
          height: 48,
        },

        '& .MuiInputBase-input': {
          height: 'auto',
          padding: 0,
          ...theme.typography.p3,
        },
      }),
    },
    {
      props: { variant: 'standard' },
      style: ({ theme }) => ({
        color: theme.palette.black[900],
        minHeight: 48,
        height: 'auto',
        '& .MuiInputBase-input': {
          ...theme.typography.h4,

          '&::placeholder': {
            color: theme.palette.black[500],
            ...theme.typography.h4,
          },
        },

        '& .MuiInputBase-root': {
          minHeight: 48,
          height: 'auto',
          padding: '16px 0 ',

          '&:before': {
            borderColor: theme.palette.black[500],
            borderWidth: '1px',
          },

          '&:after': {
            borderColor: theme.palette.black[500],
            borderWidth: '1px',
          },

          '&.Mui-focused': {
            borderColor: theme.palette.black[500],
            borderWidth: '1px',
            '&:after': {
              transition: 'none',
              borderColor: theme.palette.black[500],
              borderWidth: '1px',
            },
          },

          '&:hover:before': {
            borderBottom: `solid 1px ${theme.palette.black[500]} !important`,
          },

          '&.Mui-error': {
            borderColor: theme.palette.red[500],
            borderWidth: '1px',

            '&:after': {
              borderColor: theme.palette.red[500],
              borderWidth: '1px',
            },

            '&:before': {
              borderColor: theme.palette.red[500],
              borderWidth: '1px',
            },
          },
        },
      }),
    },
  ],
}

declare module '@mui/material/TextField' {

  interface TextFieldPropsVariantOverrides {
    outlined: true
    standard: true
  }

  interface TextFieldPropsSizeOverrides {
    medium: true
    large: true
  }
}
