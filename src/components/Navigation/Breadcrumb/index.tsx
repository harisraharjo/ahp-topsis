export const Breadcrumb = () => (
  <div>
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
    <h6 className="font-bold capitalize">Dashboard</h6>
  </div>
)
