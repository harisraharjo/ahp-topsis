/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
}
