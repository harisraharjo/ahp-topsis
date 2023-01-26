import Image from "next/image"
import logo from "@public/logo-ct.png"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  useRef,
  useContext,
  type PropsWithChildren,
  createContext,
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
  type ComponentPropsWithRef,
  forwardRef,
} from "react"
import "../../../../public/DashboardIcon.svg"
import { Svg } from "@components/Svg"
// import useOnClickOutside from "use-onclickoutside"

type SidebarHandler = Dispatch<SetStateAction<boolean>>
const SidebarHandlerContext = createContext<SidebarHandler>(() => false)

type SidebarState = MutableRefObject<null>
const SidebarStateContext = createContext<SidebarState | undefined>(undefined)

const SidebarHandlerContextProvider = SidebarHandlerContext.Provider
const SidebarStateContextProvider = SidebarStateContext.Provider

export function useSidebarContext() {
  const handler = useContext(SidebarHandlerContext)
  const ref = useContext(SidebarStateContext)
  return { handler, ref }
}

type SidebarContextProviderProps = PropsWithChildren<{
  handler: SidebarHandler
  handlerRef: SidebarState
}>
export const SidebarContextProvider = ({
  handler,
  handlerRef,
  children,
}: SidebarContextProviderProps) => (
  <SidebarHandlerContextProvider value={handler}>
    <SidebarStateContextProvider value={handlerRef}>
      {children}
    </SidebarStateContextProvider>
  </SidebarHandlerContextProvider>
)

type SidebarProps = PropsWithChildren<{
  isOpen: boolean
  handlerRef: MutableRefObject<null>
  handler: SidebarHandler
}>
// SERVER COMPONENT
export const SidebarContainer = ({
  isOpen,
  children,
  handlerRef,
  handler,
}: SidebarProps) => {
  // TODO!  onClick outside
  const ref = useRef(null)
  // const handler = useContext(SidebarHandlerContext)

  // useOnClickOutside(ref, (event) => {
  //   if (!handlerRef.current?.contains(event.target)) {
  //     handler(prev => !prev)
  //   }
  // })

  // const ads: Handler = (event) => {
  //   if (!togglerRef.current.contains(event.target)) {
  //     setOpen(false)
  //   }
  // }

  return (
    <aside
      ref={ref}
      className={`ease-nav-brand fixed inset-y-0 z-990 my-4 ml-4 block w-full max-w-62.5 -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent ${
        isOpen ? "translate-x-0 shadow-soft-xl" : ""
      }`}
    >
      {children}
    </aside>
  )
}

type SidebarHandlerProps = Pick<ComponentPropsWithRef<"button">, "onClick">

// export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ children, ...props }, ref) => {
//     return (
//       <button {...props} className={buttonStyles} ref={ref}>
//         {children}
//       </button>
//     )
//   },
// )

export const SidebarHandler = forwardRef<
  HTMLButtonElement,
  SidebarHandlerProps
>(({ onClick: handler }, ref) => (
  <button
    ref={ref}
    className="w-4.5 cursor-pointer overflow-hidden"
    onClick={handler}
    /**(e) => {
          e.preventDefault()
          e.stopPropagation()
          handler((prev) => !prev)
        } */
  >
    <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
    <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
    <i className="relative block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
  </button>
))
SidebarHandler.displayName = "SidebarHandler"

export const SidebarBody = () => (
  <>
    <Logo />
    <div className="block h-sidenav max-h-screen w-auto grow basis-full items-center overflow-auto">
      <ul className="mb-0 flex flex-col pl-0">
        {/* CLIENT COMPONENT */}
        <SidenavItemContainer />
      </ul>
    </div>
  </>
)

const Logo = () => (
  <>
    <div className="h-19.5">
      <i className="fas fa-times absolute top-0 right-0 hidden cursor-pointer p-4 text-slate-400 opacity-50 xl:hidden"></i>
      <a
        className="m-0 block whitespace-nowrap px-8 py-6 text-sm text-slate-700"
        href="#"
      >
        <Image
          src={logo}
          className="ease-nav-brand inline h-full max-h-8 w-auto max-w-full transition-all duration-200"
          alt="main_logo"
          width={500}
          height={500}
        />
        <span className="ease-nav-brand ml-1 font-semibold transition-all duration-200">
          SMP Negeri 1 Waru
        </span>
      </a>
    </div>

    <hr className="mt-0 h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
  </>
)

type PATH = {
  title: string
  href: string
}

const PATHS: readonly PATH[] = [
  {
    title: "Dashboard",
    // icon: <HomeIcon />,
    href: "/",
  },
  {
    title: "Entries",
    // icon: <StatusIcon />,
    href: "/entries",
  },
]

const activeStyles: { link: ActiveLink; svg: ActiveSVG } = {
  link: "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700",
  svg: "bg-gradient-to-tl from-purple-700 to-pink-500",
}

// CLIENT COMPONENT
const SidenavItemContainer = () => {
  const { asPath } = useRouter()

  return (
    <>
      {PATHS.map((data) => (
        <SidebarItem
          key={data.href}
          activeLink={asPath === data.href ? activeStyles.link : ""}
          activeSVG={asPath === data.href ? activeStyles.svg : ""}
          href={data.href}
          title={data.title}
        />
      ))}
    </>
  )
}

// Server COMPONENT
const SidebarItemName = ({ children }: { children: string }) => (
  <span className="pointer-events-none ml-1 opacity-100 duration-300 ease-soft">
    {children}
  </span>
)

type ActiveLink =
  "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700"
type ActiveSVG = "bg-gradient-to-tl from-purple-700 to-pink-500"

type SidenavItemProps = PropsWithChildren<
  {
    activeLink: ActiveLink | ""
    activeSVG: ActiveSVG | ""
    title: string
    // icon: SVGProps<SVGUseElement>
  } & PATH
>

const SidebarItem = ({
  activeLink = "",
  activeSVG = "",
  // icon,
  // children,
  href,
  title,
}: //   ...props
SidenavItemProps) => {
  return (
    <li className="mt-0.5 w-full">
      <Link
        className={`ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap py-2.7 px-4 text-sm transition-colors ${activeLink}`}
        href={href}
      >
        <Svg
          className={`mr-2 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center shadow-soft-2xl xl:p-2.5 ${activeSVG}`}
        >
          <use xlinkHref={`#${title}Icon`} />
        </Svg>
        <SidebarItemName>{title}</SidebarItemName>
      </Link>
    </li>
  )
}
