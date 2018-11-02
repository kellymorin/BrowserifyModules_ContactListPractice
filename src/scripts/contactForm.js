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
      contactObj.address = document.querySelector("#address").value
      database.saveData(contactObj)
    } else {
      console.log("the form is invalid")
    }
  },
}
export default contactForm