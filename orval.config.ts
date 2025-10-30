import { defineConfig } from 'orval'

export default defineConfig({
  revouch: {
    output: {
      mode: 'tags-split',
      target: './src/api/api.ts',
      schemas: './src/api/models',
      client: 'fetch',
      baseUrl: 'https://dev-revouch.artkai.dev',
      mock: false,
      indexFiles: true,
      headers: false,
      override: {
        mutator: {
          path: './src/utils/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    input: {
      target: 'https://dev-revouch.artkai.dev/api/docs-json',
    },
  },
})