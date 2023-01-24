export const Navbar = () => {
  return (
    <nav
      className="duration-250 ease-soft-in relative mx-6 flex flex-wrap items-center justify-between rounded-2xl px-0 py-2 shadow-none transition-all lg:flex-nowrap lg:justify-start"
      //   navbar-main
      //   navbar-scroll="true"
    >
      <div className="flex-wrap-inherit mx-auto flex w-full items-center justify-between px-4 py-1">
        <nav>
          <ol className="mr-12 flex flex-wrap rounded-lg bg-transparent pt-1 sm:mr-16">
            <li className="text-sm leading-normal">
              <a className="text-slate-700 opacity-50" href="javascript:;">
                Pages
              </a>
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
            <div className="ease-soft relative flex w-full flex-wrap items-stretch rounded-lg transition-all">
              <span className="ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center text-sm font-normal text-slate-500 transition-all">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="pl-8.75 focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-sm text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div>
          </div>
          <ul className="md-max:w-full mb-0 flex list-none flex-row justify-end pl-0">
            <li className="flex items-center">
              <a
                href="./pages/sign-in.html"
                className="ease-nav-brand block px-0 py-2 text-sm font-semibold text-slate-500 transition-all"
              >
                <i className="fa fa-user sm:mr-1"></i>
                <span className="hidden sm:inline">Sign In</span>
              </a>
            </li>
            <li className="flex items-center pl-4 xl:hidden">
              <a
                // href="javascript:;"
                className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
                // sidenav-trigger
              >
                <div className="w-4.5 overflow-hidden">
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                </div>
              </a>
            </li>
            <li className="flex items-center px-4">
              <a
                href="javascript:;"
                className="ease-nav-brand p-0 text-sm text-slate-500 transition-all"
              >
                <i
                  //   fixed-plugin-button-nav
                  className="fa fa-cog cursor-pointer"
                ></i>
                {/* <!-- fixed-plugin-button-nav  --> */}
              </a>
            </li>

            {/* <!-- notifications --> */}

            <li className="relative flex items-center pr-2">
              <p className="transform-dropdown-show hidden"></p>
              <a
                // href="javascript:;"
                className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
                dropdown-trigger
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
