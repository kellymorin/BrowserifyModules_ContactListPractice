/*
A Contact component that displays a person's name, phone number, and address.
*/
import contactList from "./contactList"
import makeElement from "./elementFactory"

const contact = {
  makeContact: (something) =>{
    let title = makeElement.elementFactory("h1", {id: "contactCardtitle"}, "Contact Card")
    let name = makeElement.elementFactory("p", {id: "contactCardName"}, something.name)
    let phoneNumber = makeElement.elementFactory("p", {id: "contactCardPhone"}, something.phoneNumber)
    let address = makeElement.elementFactory("p", {id: "contactCardAddress"}, something.address)
    let deleteButton = makeElement.elementFactory("input", {type: "button", id: `deleteButton-${something.id}`, value: "Delete Contact Information"}, null)
    let cardDiv = makeElement.elementFactory("div", {id: `contactCardDiv-${something.id}`}, null, title, name, phoneNumber, address, deleteButton)
    contact.deleteButton()
    return cardDiv
  },

  createContactCard: (contactInfo) => {
      let fragment = document.createDocumentFragment()
      fragment.appendChild(contact.makeContact(contactInfo));
      contactList.addToList(fragment)
    },

  deleteButton: () => {
    let button = document.querySelectorAll("button")
    button.forEach((button)=> {
      let buttonID = button.id
      // .substring(12, 15)
      console.log(buttonID)
    })
  }
}
export default contact