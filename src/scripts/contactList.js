/*A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.*/

import contact from "./contact";
import database from "./contactCollection";


const contactList = {
  displayExistingCards: (entries) =>{
    let originalFragment = document.createDocumentFragment()
    entries.forEach(entry => {
      originalFragment.appendChild(contact.makeContact(entry))
    })
    contactList.addToList(originalFragment)
  },
  addToList (finalFragment){
    let displayContact = document.querySelector("#displayContact")
    displayContact.appendChild(finalFragment)
  },
  deleteListItem(id){
    let deleteCard = document.querySelector(`#contactCardDiv-${id}`)
    let displayContact = document.querySelector("#displayContact")
    displayContact.removeChild(deleteCard)
    database.deleteData(id);
  }
}
export default contactList