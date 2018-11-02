/*
A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
*/

import database from "./contactCollection"

const contactForm = {
  formSubmit: (event)=>{
    event.preventDefault()
    let form = document.querySelector("form")
    if(form.checkValidity()===true){
      let contactObj = {}
      contactObj.name = document.querySelector("#name").value
      contactObj.phoneNumber = document.querySelector("#phoneNumber").value
      let streetAddress = document.querySelector("#address").value
      let cityAddress = document.querySelector("#city").value
      let zipAddress = document.querySelector("#zip").value
      let stateAddress = document.querySelector("#state").value
      contactObj.address = `${streetAddress}, ${cityAddress}, ${stateAddress} ${zipAddress}`
      console.log(contactObj)
      database.saveData(contactObj)
      contactForm.clearForm();
    } else {
      console.log("the form is invalid")
    }
  },
  clearForm:()=>{
    let name = document.querySelector("#name")
    let phoneNumber = document.querySelector("#phoneNumber")
    let address = document.querySelector("#address")
    let cityAddress = document.querySelector("#city")
    let zipAddress = document.querySelector("#zip")
    let stateAddress = document.querySelector("#state")
    name.value = ""
    phoneNumber.value = ""
    address.value = ""
    cityAddress.value = ""
    zipAddress.value = ""
    stateAddress.value = ""
  }
}
export default contactForm