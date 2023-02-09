export type PATH = {
  title: string
  href: string
  slug: string | null
}

export const PATHS: readonly PATH[] = [
  {
    title: "Dashboard",
    // icon: <HomeIcon />,
    href: "/",
    slug: null,
  },
  {
    title: "Entries",
    // icon: <StatusIcon />,
    href: "/entries",
    slug: "entries",
  },
  {
    title: "Criteria",
    // icon: <StatusIcon />,
    href: "/criteria",
    slug: "criteria",
  },
] as const
