import { MutationDialogTitle } from "../MutationDialogTitle"

export default function Page() {
  return (
    <>
      <MutationDialogTitle type="add" />
      <form action="/entries" method="dialog">
        <div>
          <label htmlFor="say">What greeting do you want to say?</label>
          <input name="say" id="say" defaultValue="Hi" />
        </div>
        <div>
          <label htmlFor="to">Who do you want to say it to?</label>
          <input name="to" id="to" defaultValue="Mom" />
        </div>
        <button>Send my greetings</button>
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
