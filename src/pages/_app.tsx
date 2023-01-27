import { type AppProps } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { api } from "../utils/api"

import "../styles/globals.css"
import { Navigation } from "@components"
import type { NextPage } from "next"

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  // getLayout?: (page: ReactElement) => ReactNode
  hideNav?: true | undefined
}
type AppPropsWithLayout<P = unknown> = AppProps<P> & {
  Component: NextPageWithLayout
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session | null }>) {
  const { hideNav } = Component
  return (
    <SessionProvider session={session}>
      <section className={`${!hideNav ? "xl:ml-68.5" : ""}`}>
        {!hideNav && <Navigation />}
        <Component {...pageProps} />
      </section>
    </SessionProvider>
  )
}

export default api.withTRPC(App)
