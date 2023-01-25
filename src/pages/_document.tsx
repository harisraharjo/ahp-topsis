import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
      </Head>
      <body className="m-0 bg-gray-50 font-sans text-base font-normal leading-default text-slate-500 xl:ml-68.5">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
