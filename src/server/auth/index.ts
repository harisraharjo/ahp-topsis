import { getServerSession } from "next-auth"

import { redirect } from "next/navigation"
import { type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { env } from "@env/server.mjs"

import type { Adapter as NextAuthAdapter } from "next-auth/adapters"
import { KyselyPlanetscaleAdapter } from "./adapter"

export type { Adapter } from "./adapter"

//SINGLETON
let isAuthorized = false

// ONLY FOR PAGE/Layout (SERVER COMPONENT)
export const redirectIfUnauthorized = () => {
  !isAuthorized && redirect("/signin")
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    // TODO: Add Signin callback to only allow a set of emails only
    session({ session, user }) {
      console.log("Retrieving Session...")
      if (session.user) {
        isAuthorized = true
        session.user.id = user.id
        console.log("Ses:", isAuthorized)
      } else {
        console.log("NOUSE:", session)
        isAuthorized = false
      }

      return session
    },
  },
  adapter: KyselyPlanetscaleAdapter() as unknown as NextAuthAdapter<false>,
  providers: [
    // GoogleProvider(),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
}

export function getServerAuthSession() {
  return isAuthorized
    ? Promise.resolve(isAuthorized)
    : getServerSession(authOptions)
}
