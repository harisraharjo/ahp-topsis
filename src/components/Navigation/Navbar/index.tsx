import { useContext, type PropsWithChildren, type ReactNode } from "react"
import { SidebarContext } from ".."

export type NavbarProps = PropsWithChildren<{ hamburger?: ReactNode }>
export const Navbar = ({ children: _ }: NavbarProps) => {
  return (
    <nav
      className="relative mx-6 flex flex-wrap items-center justify-between rounded-2xl px-0 py-2 shadow-none transition-all duration-250 ease-soft-in lg:flex-nowrap lg:justify-start"
      //   navbar-main
      //   navbar-scroll="true"
    >
      <div className="flex-wrap-inherit mx-auto flex w-full items-center justify-between px-4 py-1">
        <nav>
          <ol className="mr-12 flex flex-wrap rounded-lg bg-transparent pt-1 sm:mr-16">
            <li className="text-sm leading-normal">
              <a className="text-slate-700 opacity-50">Pages</a>
            </li>
            <li
              className="pl-2 text-sm capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
        </nav>

        <div className="mt-2 flex grow items-center sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <div className="relative flex w-full flex-wrap items-stretch rounded-lg transition-all ease-soft">
              <span className="absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center text-sm font-normal leading-5.6 text-slate-500 transition-all ease-soft">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="relative -ml-px block w-1/100 min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8.75 pr-3 text-sm leading-5.6 text-gray-700 transition-all ease-soft placeholder:text-gray-500 focus:border-fuchsia-300 focus:shadow-soft-primary-outline focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div>
          </div>
          <ul className="mb-0 flex list-none flex-row justify-end pl-0 md-max:w-full">
            <Hamburger />
            {/* <li className="flex items-center px-4">
              <a className="ease-nav-brand p-0 text-sm text-slate-500 transition-all">
                <i
                  //   fixed-plugin-button-nav
                  className="fa fa-cog cursor-pointer"
                ></i>
              </a>
            </li> */}

            {/* <!-- notifications --> */}

            <li className="relative flex items-center pr-2">
              <p className="transform-dropdown-show hidden"></p>
              <a
                className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
                aria-expanded="false"
              >
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const Hamburger = () => {
  const toggleSidebar = useContext(SidebarContext)

  return (
    <li className="flex items-center pl-4 xl:hidden">
      {/* <a
        className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
        // sidenav-trigger
      >
      </a> */}
      <div
        className="w-4.5 cursor-pointer overflow-hidden"
        onClick={() => {
          toggleSidebar((prev) => !prev)
        }}
      >
        <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
        <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
        <i className="relative block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
      </div>
    </li>
  )
}
