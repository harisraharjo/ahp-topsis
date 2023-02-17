// import { z } from "zod"

// import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

// export const criteria = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       }
//     }),

//   removeCriteria: protectedProcedure
//     .input(z.object({ msg: z.string() }))
//     .mutation(({ ctx, input }) => {
//       console.log("Input...", input)
//       console.log("Removing...", ctx.session)
//       return "Removing success!"
//     }),

//   getSecretMessage: publicProcedure.query(() => {
//     return "you can now see this secret message!"
//   }),
// })

export {}
