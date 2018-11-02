import makeElement from "./elementFactory"

const makePage = {
  buildForm: (name, Title) => {
    let label = makeElement.elementFactory("label", {for: name}, Title)
    let input = makeElement.elementFactory("input", {type: "text", name: name, id: name, required: true})
    let fieldset = makeElement.elementFactory("fieldset", {}, null, label, input)
    return fieldset
  },

  initiateForm: () => {
    let nameEntry = makePage.buildForm("name", "Name")
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number")
    let addressEntry = makePage.buildForm("address", "Street Address")
    let submitButton = makeElement.elementFactory("button", {type: "submit", id: "submitButton"}, "Save Contact Information")
    let form = makeElement.elementFactory("form", {}, null, nameEntry, phoneNumberEntry, addressEntry, submitButton)
    makePage.appendForm(form)
  },
  appendForm: (form)=>{
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#formDisplay")
    formFragment.appendChild(form)
    formDiv.appendChild(formFragment)
  }
}
export default makePage