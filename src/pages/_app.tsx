import { type AppProps } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { api } from "../utils/api"

import "../styles/globals.css"
import { Navigation } from "@components"
import type { NextPage } from "next"
import Head from "next/head"

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  // getLayout?: (page: ReactElement) => ReactNode
  hideNav?: true | undefined
  head?: {
    title: string
    desc: string
  }
}
type AppPropsWithLayout<P = unknown> = AppProps<P> & {
  Component: NextPageWithLayout
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session | null }>) {
  const { hideNav, head } = Component

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{head?.title || "Hada"}</title>
        <meta property="og:title" content={head?.title || "Hada"} key="title" />
        <meta
          name="description"
          content={head?.desc || "SMP 1 Negeri Waru App"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`${!hideNav ? "xl:ml-68.5" : ""}`}>
        {!hideNav && <Navigation />}
        <Component {...pageProps} />
      </section>
    </SessionProvider>
  )
}

export default api.withTRPC(App)
