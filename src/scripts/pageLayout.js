import makeElement from "./elementFactory"

const makePage = {
  buildForm: (name, Title) => {
    let label = makeElement.elementFactory("label", {for: name}, Title)
    let input = makeElement.elementFactory("input", {type: "text", name: name, id: name, required: true})
    let fieldset = makeElement.elementFactory("fieldset", {}, null, label, input)
    return fieldset
  },
  addressEntryForm: (name, Title)=>{
    let label = makeElement.elementFactory("label", {for: name}, Title)
    let input = makeElement.elementFactory("input", {type: "text", name: name, id: name, required: true})
    let wrapperDiv = makeElement.elementFactory("div", {}, null, label, input)
    return wrapperDiv
  },

  initiateForm: () => {
    let nameEntry = makePage.buildForm("name", "Name")
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number")
    let streetAddress = makePage.addressEntryForm("address", "Street Address")
    let cityAddress = makePage.addressEntryForm("city", "City")
    let zipAddress = makePage.addressEntryForm("zip", "Zip Code")
    let stateAddress = makePage.addressEntryForm("state", "State")


    let addressEntry = makeElement.elementFactory("fieldset", {id: "addressEntry"}, null, streetAddress, cityAddress, zipAddress, stateAddress)


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