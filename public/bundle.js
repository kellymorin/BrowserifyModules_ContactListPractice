(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactList = _interopRequireDefault(require("./contactList"));

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A Contact component that displays a person's name, phone number, and address.
*/
const contact = {
  makeContact: something => {
    let title = _elementFactory.default.elementFactory("h1", {
      id: "contactCardtitle"
    }, "Contact Card");

    let name = _elementFactory.default.elementFactory("p", {
      id: "contactCardName"
    }, something.name);

    let phoneNumber = _elementFactory.default.elementFactory("p", {
      id: "contactCardPhone"
    }, something.phoneNumber);

    let address = _elementFactory.default.elementFactory("p", {
      id: "contactCardAddress"
    }, something.address);

    let deleteButton = _elementFactory.default.elementFactory("input", {
      type: "button",
      id: `deleteButton-${something.id}`,
      value: "Delete Contact Information"
    }, null);

    deleteButton.addEventListener("click", () => {
      let eventID = event.target.id.substring(13, 15);

      _contactList.default.deleteListItem(eventID);

      _contactCollection.default.deleteData(eventID);
    });

    let cardDiv = _elementFactory.default.elementFactory("div", {
      id: `contactCardDiv-${something.id}`
    }, null, title, name, phoneNumber, address, deleteButton);

    return cardDiv;
  },
  createContactCard: contactInfo => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(contact.makeContact(contactInfo));

    _contactList.default.addToList(fragment);
  }
};
var _default = contact;
exports.default = _default;

},{"./contactCollection":2,"./contactList":4,"./elementFactory":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact"));

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
*/
const database = {
  getData: () => {
    return fetch("http://localhost:8088/contacts").then(contacts => contacts.json()).then(allContacts => _contactList.default.displayExistingCards(allContacts));
  },
  saveData: contactEntry => {
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactEntry)
    }).then(entryInfo => entryInfo.json()).then(contactInfo => _contact.default.createContactCard(contactInfo));
  },
  deleteData: id => {
    return fetch(`http://localhost:8088/contacts/${id}`, {
      method: "DELETE"
    }).then(alert("Your contact information was deleted"));
  }
};
var _default = database;
exports.default = _default;

},{"./contact":1,"./contactList":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
*/
const contactForm = {
  formSubmit: event => {
    event.preventDefault();
    let form = document.querySelector("form");

    if (form.checkValidity() === true) {
      let contactObj = {};
      contactObj.name = document.querySelector("#name").value;
      contactObj.phoneNumber = document.querySelector("#phoneNumber").value;
      contactObj.address = document.querySelector("#address").value;

      _contactCollection.default.saveData(contactObj);

      contactForm.clearForm();
    } else {
      console.log("the form is invalid");
    }
  },
  clearForm: () => {
    let name = document.querySelector("#name");
    let phoneNumber = document.querySelector("#phoneNumber");
    let address = document.querySelector("#address");
    name.value = "";
    phoneNumber.value = "";
    address.value = "";
  }
};
var _default = contactForm;
exports.default = _default;

},{"./contactCollection":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.*/
const contactList = {
  displayExistingCards: entries => {
    let originalFragment = document.createDocumentFragment();
    entries.forEach(entry => {
      originalFragment.appendChild(_contact.default.makeContact(entry));
    });
    contactList.addToList(originalFragment);
  },

  addToList(finalFragment) {
    let displayContact = document.querySelector("#displayContact");
    displayContact.appendChild(finalFragment);
  },

  deleteListItem(id) {
    let deleteCard = document.querySelector(`#contactCardDiv-${id}`);
    let displayContact = document.querySelector("#displayContact");
    displayContact.removeChild(deleteCard);
  }

};
var _default = contactList;
exports.default = _default;

},{"./contact":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const makeElement = {
  elementFactory: (el, attributesObj, content, ...children) => {
    let element = document.createElement(el); // Set Attributes

    for (let attr in attributesObj) {
      element.setAttribute(attr, attributesObj[attr]);
    }

    element.textContent = content || null;
    children.forEach(child => {
      element.appendChild(child);
    });
    return element;
  }
};
var _default = makeElement;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _pageLayout = _interopRequireDefault(require("./pageLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
In main.js, import the ContactList component and the ContactForm component.
*/
if (document.readyState === "loading") {
  _pageLayout.default.initiateForm();

  _contactCollection.default.getData();

  document.querySelector("#submitButton").addEventListener("click", event => _contactForm.default.formSubmit(event));
}

},{"./contactCollection":2,"./contactForm":3,"./pageLayout":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePage = {
  buildForm: (name, Title) => {
    let label = _elementFactory.default.elementFactory("label", {
      for: name
    }, Title);

    let input = _elementFactory.default.elementFactory("input", {
      type: "text",
      name: name,
      id: name,
      required: true
    });

    let fieldset = _elementFactory.default.elementFactory("fieldset", {}, null, label, input);

    return fieldset;
  },
  addressEntryForm: (name, Title) => {
    let label = _elementFactory.default.elementFactory("label", {
      for: name
    }, Title);

    let input = _elementFactory.default.elementFactory("input", {
      type: "text",
      name: name,
      id: name,
      required: true
    });

    let wrapperDiv = _elementFactory.default.elementFactory("div", {}, null, label, input);

    return wrapperDiv;
  },
  initiateForm: () => {
    let nameEntry = makePage.buildForm("name", "Name");
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number");
    let streetAddress = makePage.addressEntryForm("address", "Street Address");
    let cityAddress = makePage.addressEntryForm("city", "City");
    let zipAddress = makePage.addressEntryForm("zip", "Zip Code");
    let stateAddress = makePage.addressEntryForm("state", "State");

    let addressEntry = _elementFactory.default.elementFactory("fieldset", {
      id: "addressEntry"
    }, null, streetAddress, cityAddress, zipAddress, stateAddress);

    let submitButton = _elementFactory.default.elementFactory("button", {
      type: "submit",
      id: "submitButton"
    }, "Save Contact Information");

    let form = _elementFactory.default.elementFactory("form", {}, null, nameEntry, phoneNumberEntry, addressEntry, submitButton);

    makePage.appendForm(form);
  },
  appendForm: form => {
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#formDisplay");
    formFragment.appendChild(form);
    formDiv.appendChild(formFragment);
  }
};
var _default = makePage;
exports.default = _default;

},{"./elementFactory":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9wYWdlTGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0dBOztBQUNBOztBQUNBOzs7O0FBTEE7OztBQU9BLE1BQU0sT0FBTyxHQUFHO0FBQ2QsRUFBQSxXQUFXLEVBQUcsU0FBRCxJQUFjO0FBQ3pCLFFBQUksS0FBSyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUM7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWpDLEVBQTJELGNBQTNELENBQVo7O0FBQ0EsUUFBSSxJQUFJLEdBQUcsd0JBQVksY0FBWixDQUEyQixHQUEzQixFQUFnQztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBaEMsRUFBeUQsU0FBUyxDQUFDLElBQW5FLENBQVg7O0FBQ0EsUUFBSSxXQUFXLEdBQUcsd0JBQVksY0FBWixDQUEyQixHQUEzQixFQUFnQztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBaEMsRUFBMEQsU0FBUyxDQUFDLFdBQXBFLENBQWxCOztBQUNBLFFBQUksT0FBTyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWhDLEVBQTRELFNBQVMsQ0FBQyxPQUF0RSxDQUFkOztBQUNBLFFBQUksWUFBWSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsT0FBM0IsRUFBb0M7QUFBQyxNQUFBLElBQUksRUFBRSxRQUFQO0FBQWlCLE1BQUEsRUFBRSxFQUFHLGdCQUFlLFNBQVMs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R0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBbkI7QUFDQSxRQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFkO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixDQUF5QixJQUF6QjtBQUNBLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsWUFBcEI7QUFDRDtBQW5DYyxDQUFqQjtlQXFDZSxRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbkEgQ29udGFjdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3MuXG4qL1xuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcbmltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIjtcblxuY29uc3QgY29udGFjdCA9IHtcbiAgbWFrZUNvbnRhY3Q6IChzb21ldGhpbmcpID0+e1xuICAgIGxldCB0aXRsZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaDFcIiwge2lkOiBcImNvbnRhY3RDYXJkdGl0bGVcIn0sIFwiQ29udGFjdCBDYXJkXCIpXG4gICAgbGV0IG5hbWUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2lkOiBcImNvbnRhY3RDYXJkTmFtZVwifSwgc29tZXRoaW5nLm5hbWUpXG4gICAgbGV0IHBob25lTnVtYmVyID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtpZDogXCJjb250YWN0Q2FyZFBob25lXCJ9LCBzb21ldGhpbmcucGhvbmVOdW1iZXIpXG4gICAgbGV0IGFkZHJlc3MgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2lkOiBcImNvbnRhY3RDYXJkQWRkcmVzc1wifSwgc29tZXRoaW5nLmFkZHJlc3MpXG4gICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwiYnV0dG9uXCIsIGlkOiBgZGVsZXRlQnV0dG9uLSR7c29tZXRoaW5nLmlkfWAsIHZhbHVlOiBcIkRlbGV0ZSBDb250YWN0IEluZm9ybWF0aW9uXCJ9LCBudWxsKVxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBldmVudElEID0gZXZlbnQudGFyZ2V0LmlkLnN1YnN0cmluZygxMywgMTUpXG4gICAgICBjb250YWN0TGlzdC5kZWxldGVMaXN0SXRlbShldmVudElEKVxuICAgICAgZGF0YWJhc2UuZGVsZXRlRGF0YShldmVudElEKVxuICAgIH0pXG4gICAgbGV0IGNhcmREaXYgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImRpdlwiLCB7aWQ6IGBjb250YWN0Q2FyZERpdi0ke3NvbWV0aGluZy5pZH1gfSwgbnVsbCwgdGl0bGUsIG5hbWUsIHBob25lTnVtYmVyLCBhZGRyZXNzLCBkZWxldGVCdXR0b24pXG4gICAgcmV0dXJuIGNhcmREaXZcbiAgfSxcblxuICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCIsIi8qXG5BIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCB0aGF0IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gc3RvcmFnZSwgYW5kIHNhdmVzIG5ldyBvbmVzLiBFYWNoIG5ldyBjb250YWN0IHNob3VsZCBoYXZlIGFuIGF1dG8tZ2VuZXJhdGVkIGlkZW50aWZpZXIuXG4qL1xuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuXG5jb25zdCBkYXRhYmFzZSA9IHtcbiAgZ2V0RGF0YTogKCkgPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXG4gICAgLnRoZW4oKGNvbnRhY3RzKT0+IGNvbnRhY3RzLmpzb24oKSlcbiAgICAudGhlbihhbGxDb250YWN0cyA9PiAoY29udGFjdExpc3QuZGlzcGxheUV4aXN0aW5nQ2FyZHMoYWxsQ29udGFjdHMpKSlcbiAgfSxcblxuICBzYXZlRGF0YTogKGNvbnRhY3RFbnRyeSk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0RW50cnkpXG4gICAgfSlcbiAgICAudGhlbihlbnRyeUluZm8gPT4gZW50cnlJbmZvLmpzb24oKSlcbiAgICAudGhlbihjb250YWN0SW5mbyA9PiAoY29udGFjdC5jcmVhdGVDb250YWN0Q2FyZChjb250YWN0SW5mbykpKVxuICB9LFxuXG4gIGRlbGV0ZURhdGE6IChpZCkgPT4ge1xuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7aWR9YCx7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICB9KVxuICAgIC50aGVuKGFsZXJ0KFwiWW91ciBjb250YWN0IGluZm9ybWF0aW9uIHdhcyBkZWxldGVkXCIpKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBkYXRhYmFzZSIsIi8qXG5BIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuKi9cblxuaW1wb3J0IGRhdGFiYXNlIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcblxuY29uc3QgY29udGFjdEZvcm0gPSB7XG4gIGZvcm1TdWJtaXQ6IChldmVudCk9PntcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuICAgIGlmKGZvcm0uY2hlY2tWYWxpZGl0eSgpPT09dHJ1ZSl7XG4gICAgICBsZXQgY29udGFjdE9iaiA9IHt9XG4gICAgICBjb250YWN0T2JqLm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIikudmFsdWVcbiAgICAgIGNvbnRhY3RPYmoucGhvbmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lTnVtYmVyXCIpLnZhbHVlXG4gICAgICBjb250YWN0T2JqLmFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIikudmFsdWVcbiAgICAgIGRhdGFiYXNlLnNhdmVEYXRhKGNvbnRhY3RPYmopXG4gICAgICBjb250YWN0Rm9ybS5jbGVhckZvcm0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ0aGUgZm9ybSBpcyBpbnZhbGlkXCIpXG4gICAgfVxuICB9LFxuICBjbGVhckZvcm06KCk9PntcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKVxuICAgIGxldCBwaG9uZU51bWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmVOdW1iZXJcIilcbiAgICBsZXQgYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkcmVzc1wiKVxuICAgIG5hbWUudmFsdWUgPSBcIlwiXG4gICAgcGhvbmVOdW1iZXIudmFsdWUgPSBcIlwiXG4gICAgYWRkcmVzcy52YWx1ZSA9IFwiXCJcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm0iLCIvKkEgQ29udGFjdExpc3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC4qL1xuXG5pbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0XCI7XG5cblxuY29uc3QgY29udGFjdExpc3QgPSB7XG4gIGRpc3BsYXlFeGlzdGluZ0NhcmRzOiAoZW50cmllcykgPT57XG4gICAgbGV0IG9yaWdpbmFsRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgb3JpZ2luYWxGcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGVudHJ5KSlcbiAgICB9KVxuICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChvcmlnaW5hbEZyYWdtZW50KVxuICB9LFxuICBhZGRUb0xpc3QgKGZpbmFsRnJhZ21lbnQpe1xuICAgIGxldCBkaXNwbGF5Q29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheUNvbnRhY3RcIilcbiAgICBkaXNwbGF5Q29udGFjdC5hcHBlbmRDaGlsZChmaW5hbEZyYWdtZW50KVxuICB9LFxuICBkZWxldGVMaXN0SXRlbShpZCl7XG4gICAgbGV0IGRlbGV0ZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29udGFjdENhcmREaXYtJHtpZH1gKVxuICAgIGxldCBkaXNwbGF5Q29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheUNvbnRhY3RcIilcbiAgICBkaXNwbGF5Q29udGFjdC5yZW1vdmVDaGlsZChkZWxldGVDYXJkKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBjb250YWN0TGlzdCIsIlxuY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VFbGVtZW50IiwiLypcbkluIG1haW4uanMsIGltcG9ydCB0aGUgQ29udGFjdExpc3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdEZvcm0gY29tcG9uZW50LlxuKi9cblxuaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcbmltcG9ydCBkYXRhYmFzZSBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiO1xuaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL3BhZ2VMYXlvdXRcIlxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpe1xuICBtYWtlUGFnZS5pbml0aWF0ZUZvcm0oKTtcbiAgZGF0YWJhc2UuZ2V0RGF0YSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+IGNvbnRhY3RGb3JtLmZvcm1TdWJtaXQoZXZlbnQpKVxufVxuXG5cbiIsImltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5cbmNvbnN0IG1ha2VQYWdlID0ge1xuICBidWlsZEZvcm06IChuYW1lLCBUaXRsZSkgPT4ge1xuICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogbmFtZX0sIFRpdGxlKVxuICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBuYW1lOiBuYW1lLCBpZDogbmFtZSwgcmVxdWlyZWQ6IHRydWV9KVxuICAgIGxldCBmaWVsZHNldCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGxhYmVsLCBpbnB1dClcbiAgICByZXR1cm4gZmllbGRzZXRcbiAgfSxcbiAgYWRkcmVzc0VudHJ5Rm9ybTogKG5hbWUsIFRpdGxlKT0+e1xuICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogbmFtZX0sIFRpdGxlKVxuICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBuYW1lOiBuYW1lLCBpZDogbmFtZSwgcmVxdWlyZWQ6IHRydWV9KVxuICAgIGxldCB3cmFwcGVyRGl2ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge30sIG51bGwsIGxhYmVsLCBpbnB1dClcbiAgICByZXR1cm4gd3JhcHBlckRpdlxuICB9LFxuXG4gIGluaXRpYXRlRm9ybTogKCkgPT4ge1xuICAgIGxldCBuYW1lRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJuYW1lXCIsIFwiTmFtZVwiKVxuICAgIGxldCBwaG9uZU51bWJlckVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwicGhvbmVOdW1iZXJcIiwgXCJQaG9uZSBOdW1iZXJcIilcbiAgICBsZXQgc3RyZWV0QWRkcmVzcyA9IG1ha2VQYWdlLmFkZHJlc3NFbnRyeUZvcm0oXCJhZGRyZXNzXCIsIFwiU3RyZWV0IEFkZHJlc3NcIilcbiAgICBsZXQgY2l0eUFkZHJlc3MgPSBtYWtlUGFnZS5hZGRyZXNzRW50cnlGb3JtKFwiY2l0eVwiLCBcIkNpdHlcIilcbiAgICBsZXQgemlwQWRkcmVzcyA9IG1ha2VQYWdlLmFkZHJlc3NFbnRyeUZvcm0oXCJ6aXBcIiwgXCJaaXAgQ29kZVwiKVxuICAgIGxldCBzdGF0ZUFkZHJlc3MgPSBtYWtlUGFnZS5hZGRyZXNzRW50cnlGb3JtKFwic3RhdGVcIiwgXCJTdGF0ZVwiKVxuXG5cbiAgICBsZXQgYWRkcmVzc0VudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7aWQ6IFwiYWRkcmVzc0VudHJ5XCJ9LCBudWxsLCBzdHJlZXRBZGRyZXNzLCBjaXR5QWRkcmVzcywgemlwQWRkcmVzcywgc3RhdGVBZGRyZXNzKVxuXG5cbiAgICBsZXQgc3VibWl0QnV0dG9uID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJidXR0b25cIiwge3R5cGU6IFwic3VibWl0XCIsIGlkOiBcInN1Ym1pdEJ1dHRvblwifSwgXCJTYXZlIENvbnRhY3QgSW5mb3JtYXRpb25cIilcbiAgICBsZXQgZm9ybSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZm9ybVwiLCB7fSwgbnVsbCwgbmFtZUVudHJ5LCBwaG9uZU51bWJlckVudHJ5LCBhZGRyZXNzRW50cnksIHN1Ym1pdEJ1dHRvbilcbiAgICBtYWtlUGFnZS5hcHBlbmRGb3JtKGZvcm0pXG4gIH0sXG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1EaXNwbGF5XCIpXG4gICAgZm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm0pXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtRnJhZ21lbnQpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIl19
