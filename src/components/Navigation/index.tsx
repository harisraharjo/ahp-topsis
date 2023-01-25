import { createContext, useState } from "react"
import type { SetStateAction, Dispatch, PropsWithChildren } from "react"
import { Sidebar } from "./Sidebar"

// import { useState, useMemo } from "react"

// export function useToggle(initialState = false, isToggle = false) {
//   const [isOpen, setIsOpen] = useState(() => initialState)
//   const toggle = useMemo(() => {
//     if (isToggle) return () => setIsOpen((prev) => !prev)

//     return Object.freeze({
//       handleClose: () => setIsOpen(() => false),
//       handleOpen: () => setIsOpen(() => true),
//     })
//   }, [isToggle])

//   return Object.freeze({
//     isOpen,
//     toggle,
//   })
// }

export const SidebarContext = createContext<Dispatch<SetStateAction<boolean>>>(
  () => false,
)
const SidebarContextProvider = SidebarContext.Provider

type NavigationProps = PropsWithChildren<{ a?: "" }>
export const Navigation = ({ children }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SidebarContextProvider value={setIsOpen}>
        {children}
      </SidebarContextProvider>
      {/* <Navbar hamburger={} /> */}
      {/* <Hamburger /> */}
      <Sidebar isOpen={isOpen} />
    </>
  )
}

// type SidebarSwitch = Omit<
//   ComponentPropsWithRef<"button">,
//   | "children"
//   | "type"
//   | "aria-expanded"
//   | "aria-label"
//   | "Toggle sidenav"
//   | "className"
// >

// export const SidebarSwitch = forwardRef<HTMLButtonElement, SidebarSwitch>(
//   ({ onClick, ...props }, ref) => {
//     return (
//       <button
//         type="button"
//         aria-expanded="false"
//         aria-label="Toggle sidebar"
//         onClick={onClick}
//         className="text-4xl text-white focus:outline-none"
//         ref={ref}
//         {...props}
//       >
//         &#8801;
//       </button>
//     )
//   },
// )

// SidebarSwitch.displayName = "SidebarSwitch"

// export {}
