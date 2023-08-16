/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
}
export default config
