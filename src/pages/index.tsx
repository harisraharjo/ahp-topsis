import { type NextPage } from "next"
import Head from "next/head"
// import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

import { api } from "../utils/api"
// import { Sidebar } from "@components"
// import { Card } from "@components/Card"

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" })

  return (
    <>
      <Head>
        <title>Hada</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Sidebar />
      <Navbar /> */}
      <main className="relative h-full max-h-screen rounded-xl transition-all duration-200 ease-soft-in-out ">
        MAIN INDEX
      </main>
    </>
  )
}

// import { type NextPage } from "next"

// const Signin = () => <div>Sign IN</div>

// Signin.layout = null

// export default Signin

export default Home

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession()

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  )

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  )
}
