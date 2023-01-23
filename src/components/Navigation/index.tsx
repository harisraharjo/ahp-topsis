import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export * from "./Sidebar/index"

type SidebarSwitch = Omit<
  ComponentPropsWithRef<"button">,
  | "children"
  | "type"
  | "aria-expanded"
  | "aria-label"
  | "Toggle sidenav"
  | "className"
>

export const SidebarSwitch = forwardRef<HTMLButtonElement, SidebarSwitch>(
  ({ onClick, ...props }, ref) => {
    return (
      <button
        type="button"
        aria-expanded="false"
        aria-label="Toggle sidebar"
        onClick={onClick}
        className="text-4xl text-white focus:outline-none"
        ref={ref}
        {...props}
      >
        &#8801;
      </button>
    )
  },
)

SidebarSwitch.displayName = "SidebarSwitch"

// export {}
