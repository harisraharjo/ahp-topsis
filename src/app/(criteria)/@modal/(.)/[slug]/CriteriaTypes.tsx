export function CriteriaTypes() {
  return (
    <fieldset>
      <legend>Select type:</legend>

      <div>
        <input
          type="radio"
          id="benefit"
          name="type"
          value="1"
          defaultChecked={true}
        />
        <label htmlFor="benefit">Benefit</label>
      </div>

      <div>
        <input type="radio" id="cost" name="type" value="0" />
        <label htmlFor="cost">Cost</label>
      </div>
    </fieldset>
  )
}
