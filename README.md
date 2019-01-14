# Browserify Modules: Practice: Contact List

Browserify allows you to build modules of JavaScript logic that export functionality that can be imported by any other module. When building a modular application, consider that each module is an independent utility that does one specific thing. When another module needs the functionality of one of the other utilities, they can import it.

Build four components:

1. A **ContactCollection** component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
1. A **Contact** component that displays a person's name, phone number, and address.
1. A **ContactList** component that displays all contacts. It should import the **Contact** component and the **ContactCollection** component.
1. A **ContactForm** component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the **ContactCollection** component.

In `main.js`, import the **ContactList** component and the **ContactForm** component.

The user should see the contact form at the top of the view, and the list of contacts underneath it.

> **Bonus:** Are there any other modules that could be made? Do any modules have more than one possible responsibility? Perhaps something that is a general utility function.
