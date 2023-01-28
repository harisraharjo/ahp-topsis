// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
      },
      //     {
      // test: /\.svg$/,
      // use: [
      //   { loader: 'svg-sprite-loader', options: { ... } },
      //   'svg-transform-loader',
      //   'svgo-loader'
      // ]
      //     }
    )

    return config
  },
  // modularizeImports: {
  //   "@components": {
  //     transform: "@components/{{member}}",
  //     preventFullImport: true,
  //     skipDefaultConversion: true,
  //   },
  // },
}
export default config