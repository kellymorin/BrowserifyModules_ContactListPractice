/*
A Contact component that displays a person's name, phone number, and address.
*/
import contactList from "./contactList"
import makeElement from "./elementFactory"
import database from "./contactCollection";

const contact = {
  makeContact: (something) =>{
    let name = makeElement.elementFactory("h2", {id: "contactCardName"}, something.name)
    let phoneNumber = makeElement.elementFactory("p", {id: "contactCardPhone"}, something.phoneNumber)
    let address = makeElement.elementFactory("p", {id: "contactCardAddress"}, something.address)
    let deleteButton = makeElement.elementFactory("input", {type: "button", id: `deleteButton-${something.id}`, value: "Delete Contact Information"}, null)
    deleteButton.addEventListener("click", ()=>{
      let eventID = event.target.id.substring(13, 15)
      contactList.deleteListItem(eventID)
    })
    let cardDiv = makeElement.elementFactory("div", {id: `contactCardDiv-${something.id}`}, null, name, phoneNumber, address, deleteButton)
    return cardDiv
  },

  createContactCard: (contactInfo) => {
      let fragment = document.createDocumentFragment()
      fragment.appendChild(contact.makeContact(contactInfo));
      contactList.addToList(fragment)
    },
}
export default contact