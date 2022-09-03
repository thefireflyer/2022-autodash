// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
const withPlugins = require('next-compose-plugins')

const withTM = require("next-transpile-modules")([
  "@cloudscape-design/components",
  "@cloudscape-design/global-styles",
])
const TMplugin = withTM(nextConfig)

const withPWA = require('next-pwa');
const pwaPlugin = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
});
module.exports = withTM(
  pwaPlugin
)
/*(_phase, { defaultConfig }) => {
  const plugins = [withPWA, withTM]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...nextConfig })
}*/
//withPlugins([pwaPlugin, TMplugin])
