import { getServerSession } from "next-auth"

import { redirect } from "next/navigation"
import { type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
// Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { env } from "@env/server.mjs"
// import { prisma } from "./db"

//SINGLETON
let isAuthorized = false

// ONLY FOR PAGE/Layout (SERVER COMPONENT)
export function redirectIfUnauthorized(): void {
  if (!isAuthorized) return redirect("/signin")
}

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    // TODO: Add Signin callback to only allow a set of emails only
    session({ session, user: _ }) {
      console.log("Retrieving Session...")
      if (session.user) {
        isAuthorized = true
        // session.user.id = user.id
      } else {
        isAuthorized = false
      }

      return session
    },
  },
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider(),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
}

export function getServerAuthSession() {
  return getServerSession(authOptions)
}
