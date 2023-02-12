import { z } from "zod"

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

export const criteria = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  removeCriteria: protectedProcedure
    .input(z.object({ msg: z.string() }))
    .mutation(({ ctx, input }) => {
      console.log("Removing...", ctx.session)
      return "Removing success!"
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!"
  }),
})
