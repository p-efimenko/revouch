'use client'

// MUI
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/theme/theme'

// Next Intl
import { NextIntlClientProvider } from 'next-intl'
import type { Locale, Messages } from '@/types/locale'

// React Query
import { QueryClientProvider } from '@tanstack/react-query'
// import { TanStackDevtools } from '@tanstack/react-devtools'
// import { FormDevtools } from '@tanstack/react-form-devtools'
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/api/get-query-client'
// aws amplify
import { AmplifyConfig } from '@/config/amplify'
// notistack
import { SnackbarProvider } from 'notistack'
import notistackConfig from '@/config/notistack'

type ProvidersProps = {
  children: React.ReactNode
  locale: Locale
  messages: Messages
}

export default function Providers(props: ProvidersProps) {
  const { children, locale, messages } = props

  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AmplifyConfig />
            <SnackbarProvider {...notistackConfig}>
              {children}

              {/* <TanStackDevtools
                plugins={[
                  {
                    name: 'TanStack Query',
                    render: <ReactQueryDevtoolsPanel />,
                  },
                  {
                    name: 'TanStack Form',
                    render: <FormDevtools />,
                  },
                ]}
              /> */}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  )
}
