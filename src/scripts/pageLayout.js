import makeElement from "./elementFactory"

const makePage = {
  buildForm: (name, Title) => {
    let label = makeElement.elementFactory("label", {for: name}, Title)
    let input = makeElement.elementFactory("input", {type: "text", name: name, id: name, required: true})
    let wrapperDiv = makeElement.elementFactory("div", {}, null, label, input)
    return wrapperDiv
  },
  // addressEntryForm: (name, Title)=>{
  //   let label = makeElement.elementFactory("label", {for: name}, Title)
  //   let input = makeElement.elementFactory("input", {type: "text", name: name, id: name, required: true})
  //   let wrapperDiv = makeElement.elementFactory("div", {}, null, label, input)
  //   return wrapperDiv
  // },

  initiateForm: () => {
    let formTitle = makeElement.elementFactory("h3", {}, "Enter a New Address")
    let nameEntry = makePage.buildForm("name", "Name")
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number")
    let streetAddress = makePage.buildForm("address", "Street Address")
    let cityAddress = makePage.buildForm("city", "City")
    let stateAddress = makePage.buildForm("state", "State")
    let zipAddress = makePage.buildForm("zip", "Zip Code")

    let addressEntry = makeElement.elementFactory("div", {id: "addressEntry"}, null, streetAddress, cityAddress, stateAddress, zipAddress)


    let submitButton = makeElement.elementFactory("button", {type: "submit", id: "submitButton"}, "Save Contact Information")
    let form = makeElement.elementFactory("form", {id: "contactEntryForm"}, null, formTitle, nameEntry, phoneNumberEntry, addressEntry, submitButton)
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