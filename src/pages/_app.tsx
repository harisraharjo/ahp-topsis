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

// const App: AppType<{ session: Session | null }>= ({ Component, pageProps: { session, ...pageProps } }) => {

//   return (
//     //
//     <SessionProvider session={session}>
//       <Navigation />
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

// export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   // Use the layout defined at the page level, if available
//   const getLayout = Component.getLayout ?? ((page) => page)

//   return getLayout(<Component {...pageProps} />)
// }
