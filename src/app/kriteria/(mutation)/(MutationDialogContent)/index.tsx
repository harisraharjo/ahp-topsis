// import type { PropsWithChildren } from "react"

// type MutationDialogContentProps = PropsWithChildren
export const MutationDialogContent = () => {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
    // </div>

    <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
      <div className="md:col-span-5">
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
          value=""
        />
      </div>

      <div className="text-right md:col-span-5">
        <div className="inline-flex items-end">
          <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

//  <div className="md:col-span-5">
//                 <label htmlFor="email">Email Address</label>
//                 <input
//                   type="text"
//                   name="email"
//                   id="email"
//                   className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
//                   value=""
//                   placeholder="email@domain.com"
//                 />
//               </div>

//  <div className="md:col-span-3">
//                 <label htmlFor="address">Address / Street</label>
//                 <input
//                   type="text"
//                   name="address"
//                   id="address"
//                   className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
//                   value=""
//                   placeholder=""
//                 />
//               </div>

//  <div className="md:col-span-2">
//                 <label htmlFor="city">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   id="city"
//                   className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
//                   value=""
//                   placeholder=""
//                 />
//               </div>

//  <div className="md:col-span-2">
//                 <label htmlFor="country">Country / region</label>
//                 <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
//                   <input
//                     name="country"
//                     id="country"
//                     placeholder="Country"
//                     className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
//                     value=""
//                   />
//                   <button
//                     tabIndex={-1}
//                     className="cursor-pointer text-gray-300 outline-none transition-all hover:text-red-600 focus:outline-none"
//                   >
//                     <svg
//                       className="mx-2 h-4 w-4 fill-current"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     >
//                       <line x1="18" y1="6" x2="6" y2="18"></line>
//                       <line x1="6" y1="6" x2="18" y2="18"></line>
//                     </svg>
//                   </button>
//                   <button
//                     tabIndex={-1}
//                     className="cursor-pointer border-l border-gray-200 text-gray-300 outline-none transition-all hover:text-blue-600 focus:outline-none"
//                   >
//                     <svg
//                       className="mx-2 h-4 w-4 fill-current"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     >
//                       <polyline points="18 15 12 9 6 15"></polyline>
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//  <div className="md:col-span-2">
//                 <label htmlFor="state">State / province</label>
//                 <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
//                   <input
//                     name="state"
//                     id="state"
//                     placeholder="State"
//                     className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
//                     value=""
//                   />
//                   <button
//                     tabIndex={-1}
//                     className="cursor-pointer text-gray-300 outline-none transition-all hover:text-red-600 focus:outline-none"
//                   >
//                     <svg
//                       className="mx-2 h-4 w-4 fill-current"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     >
//                       <line x1="18" y1="6" x2="6" y2="18"></line>
//                       <line x1="6" y1="6" x2="18" y2="18"></line>
//                     </svg>
//                   </button>
//                   <button
//                     tabIndex={-1}
//                     className="cursor-pointer border-l border-gray-200 text-gray-300 outline-none transition-all hover:text-blue-600 focus:outline-none"
//                   >
//                     <svg
//                       className="mx-2 h-4 w-4 fill-current"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     >
//                       <polyline points="18 15 12 9 6 15"></polyline>
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//  <div className="md:col-span-1">
//                 <label htmlFor="zipcode">Zipcode</label>
//                 <input
//                   type="text"
//                   name="zipcode"
//                   id="zipcode"
//                   className="mt-1 flex h-10 w-full items-center rounded border bg-gray-50 px-4 transition-all"
//                   placeholder=""
//                   value=""
//                 />
//               </div>

//  <div className="md:col-span-5">
//                 <div className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     name="billing_same"
//                     id="billing_same"
//                     className="form-checkbox"
//                   />
//                   <label htmlFor="billing_same" className="ml-2">
//                     My billing address is different than above.
//                   </label>
//                 </div>
//               </div>

//  <div className="md:col-span-2">
//                 <label htmlFor="soda">How many soda pops?</label>
//                 <div className="mt-1 flex h-10 w-28 items-center rounded border border-gray-200 bg-gray-50">
//                   <button
//                     tabIndex={-1}
//                     className="cursor-pointer border-r border-gray-200 text-gray-500 outline-none transition-all hover:text-blue-600 focus:outline-none"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="mx-2 h-4 w-4"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                         clip-rule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   <input
//                     name="soda"
//                     id="soda"
//                     placeholder="0"
//                     className="w-full appearance-none bg-transparent px-2 text-center text-gray-800 outline-none"
//                     value="0"
//                   />
//                   <button
//                     tabIndex={-1}
//                     className="cursor-pointer border-l border-gray-200 text-gray-500 outline-none transition-all hover:text-blue-600 focus:outline-none"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="mx-2 h-4 w-4 fill-current"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
//                         clip-rule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
