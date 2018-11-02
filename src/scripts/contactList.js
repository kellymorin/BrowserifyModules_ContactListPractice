/*A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.*/

import contact from "./contact";


const contactList = {
  displayExistingCards: (entries) =>{
    let originalFragment = document.createDocumentFragment()
    entries.forEach(entry => {
      originalFragment.appendChild(contact.makeContact(entry))
    })
    contactList.addToList(originalFragment)
    // let deleteButton= document.querySelector("#deleteButton")
    // console.log(deleteButton)
    // deleteButton.addEventListener("click", (selectedButton)=>{
    //   ID = selectedButton.target.id.substring(12,30);
    //   console.log(ID)
    // })
  },
  addToList (finalFragment){
    let displayContact = document.querySelector("#displayContact")
    displayContact.appendChild(finalFragment)
    // deleteButton.addEventListener("click", (selectedButton)=>{
    //   ID = selectedButton.target.id.substring(12,30);
    //   console.log(ID)
    // })
  },
}
export default contactList