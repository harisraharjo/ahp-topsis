import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
      </Head>
      <body className="leading-default m-0 bg-gray-50 font-sans text-base font-normal text-slate-500 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
