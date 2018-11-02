/*
A Contact component that displays a person's name, phone number, and address.
*/
import contactList from "./contactList"
import makeElement from "./elementFactory"
import database from "./contactCollection";

const contact = {
  makeContact: (something) =>{
    let title = makeElement.elementFactory("h1", {id: "contactCardtitle"}, "Contact Card")
    let name = makeElement.elementFactory("p", {id: "contactCardName"}, something.name)
    let phoneNumber = makeElement.elementFactory("p", {id: "contactCardPhone"}, something.phoneNumber)
    let address = makeElement.elementFactory("p", {id: "contactCardAddress"}, something.address)
    let deleteButton = makeElement.elementFactory("input", {type: "button", id: `deleteButton-${something.id}`, value: "Delete Contact Information"}, null)
    deleteButton.addEventListener("click", ()=>{
      let eventID = event.target.id.substring(13, 15)
      contactList.deleteListItem(eventID)
      database.deleteData(eventID)
    })
    let cardDiv = makeElement.elementFactory("div", {id: `contactCardDiv-${something.id}`}, null, title, name, phoneNumber, address, deleteButton)
    return cardDiv
  },

  createContactCard: (contactInfo) => {
      let fragment = document.createDocumentFragment()
      fragment.appendChild(contact.makeContact(contactInfo));
      contactList.addToList(fragment)
    },
}
export default contact