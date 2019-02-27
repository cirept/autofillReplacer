  const settingsPanel = document.createElement("div");
  const autoApply = document.createElement("div");

  autoApply.innerHTML = `
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="form-check-label">Auto Apply</label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="autoApplyOn" autocomplete="off"> Yes
      </label>
      <label class="btn btn-secondary active">
        <input type="radio" name="options" id="autoApplyOff" autocomplete="off"> No
      </label>
    </div>`

let autofillToolBody = document.querySelector('.customEditorTools');

autofillToolBody.append(autoApply);

// function runAutoApply() {
//   document.
// }
