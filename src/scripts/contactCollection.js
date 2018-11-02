/*
A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
*/
import contact from "./contact"
import contactList from "./contactList"

const database = {
  getData: () =>{
    return fetch("http://localhost:8088/contacts")
    .then((contacts)=> contacts.json())
    .then(allContacts => (contactList.displayExistingCards(allContacts)))
  },

  saveData: (contactEntry)=>{
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactEntry)
    })
    .then(entryInfo => entryInfo.json())
    .then(contactInfo => (contact.createContactCard(contactInfo)))
  },

  deleteData: (id) => {
    return fetch(`http://localhost:8088/${id}`)
  }
}
export default database