/*
In main.js, import the ContactList component and the ContactForm component.
*/

import contactForm from "./contactForm"
import database from "./contactCollection";
import makePage from "./pageLayout"

if (document.readyState === "loading"){
  makePage.initiateForm();
  database.getData();
  document.querySelector("#submitButton").addEventListener("click", (event)=> contactForm.formSubmit(event))
}


