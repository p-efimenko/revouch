import { NextConfig } from 'next'
import createNextIntlSplitPlugin from 'next-intl-split/plugin'

const withNextIntlSplitPlugin = createNextIntlSplitPlugin('./src/messages', './src/i18n/request.ts')

const config: NextConfig = {
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['mui-one-time-password-input'],
}

export default withNextIntlSplitPlugin(config)
