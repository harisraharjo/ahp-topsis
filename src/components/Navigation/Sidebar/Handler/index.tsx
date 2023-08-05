import { HandlerContainer } from "./Container"

// https://alvarotrigo.com/blog/hamburger-menu-css/
export const SidebarHandler = () => (
  <HandlerContainer>
    <input id="menu-toggle" className="hidden" type="checkbox" />
    {/*  */}
    {/* <label
      className="flex h-full w-7 cursor-pointer flex-col justify-center"
      htmlFor="menu-toggle"
    >
      <div className="menu-button"></div>
    </label> */}
    {/*  */}
    {/* <svg viewBox="0 0 100 80" width="40" height="40">
      <rect width="100" height="20" rx="8"></rect>
      <rect y="30" width="100" height="20" rx="8"></rect>
      <rect y="60" width="100" height="20" rx="8"></rect>
    </svg> */}
    {/*  */}
    <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
    <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
    <i className="relative block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
  </HandlerContainer>
)
