// "use client"

// import { signOut } from "next-auth/react"
// import { useState } from "react"

// export function SignOut() {
//   const [error, setError] = useState<unknown>()

//   return (
//     <button
//       className="flex rounded-md border-gray-800 bg-black text-sm font-semibold text-neutral-200 transition-all hover:text-white"
//       onClick={() => {
//         console.log("Logging out...")
//         signOut({ callbackUrl: "/signin" })
//           .then(() => undefined)
//           .catch((e: unknown) => {
//             setError(e)
//           })
//       }}
//     >
//       <>
//         Sign out
//         {error && (
//           <p>
//             <>{error}</>
//           </p>
//         )}
//       </>
//     </button>
//   )
// }

export {}