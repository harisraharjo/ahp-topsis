"use client"

import { signIn, signOut } from "next-auth/react"
import { useState } from "react"

export function SignOut() {
  const [error, setError] = useState<unknown>()

  return (
    <button
      className="flex rounded-md border-gray-800 bg-black text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={() => {
        console.log("Logging out...")
        signOut({ callbackUrl: "/signin" })
          .then(() => undefined)
          .catch((e: unknown) => {
            setError(e)
          })
      }}
    >
      <>
        Sign out
        {error && (
          <p>
            <>{error}</>
          </p>
        )}
      </>
    </button>
  )
}

export function SignIn() {
  const [error, setError] = useState<unknown>()

  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={() => {
        signIn("discord", { callbackUrl: "/" })
          .then((r) => {
            console.log("Sign in...", r)
          })
          .catch((e: unknown) => {
            setError(e)
          })
      }}
    >
      <>
        <div className="ml-3">Sign in with Discord</div>
        {error && (
          <p>
            <>{error}</>
          </p>
        )}
      </>
    </button>
  )
}
