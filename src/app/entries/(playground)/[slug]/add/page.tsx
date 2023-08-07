import { MutationDialogTitle } from "../MutationDialogTitle"

export default function Page() {
  return (
    <>
      <MutationDialogTitle type="add" />
      <form action="/entries" method="dialog">
        <div>
          <label htmlFor="nama">Nama</label>
          <input name="nama" id="nama" placeholder="Nama kriteria" />
        </div>
        <button>Ok</button>
      </form>
      {/* <ButtonLink
        destination="/"
        query={{ data: "Hello There" }}
        className="bg-blue-700"
      >
        Tambah
      </ButtonLink> */}
    </>
  )
}
