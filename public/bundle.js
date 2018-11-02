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
    } else {
      console.log("the form is invalid");
    }
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
  initiateForm: () => {
    let nameEntry = makePage.buildForm("name", "Name");
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number");
    let addressEntry = makePage.buildForm("address", "Street Address");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9wYWdlTGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0dBOztBQUNBOztBQUNBOzs7O0FBTEE7OztBQU9BLE1BQU0sT0FBTyxHQUFHO0FBQ2QsRUFBQSxXQUFXLEVBQUcsU0FBRCxJQUFjO0FBQ3pCLFFBQUksS0FBSyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUM7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWpDLEVBQTJELGNBQTNELENBQVo7O0FBQ0EsUUFBSSxJQUFJLEdBQUcsd0JBQVksY0FBWixDQUEyQixHQUEzQixFQUFnQztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBaEMsRUFBeUQsU0FBUyxDQUFDLElBQW5FLENBQVg7O0FBQ0EsUUFBSSxXQUFXLEdBQUcsd0JBQVksY0FBWixDQUEyQixHQUEzQixFQUFnQztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBaEMsRUFBMEQsU0FBUyxDQUFDLFdBQXBFLENBQWxCOztBQUNBLFFBQUksT0FBTyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWhDLEVBQTRELFNBQVMsQ0FBQyxPQUF0RSxDQUFkOztBQUNBLFFBQUksWUFBWSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsT0FBM0IsRUFBb0M7QUFBQyxNQUFBLElBQUksRUFBRSxRQUFQO0FBQWlCLE1BQUEsRUFBRSxFQUFHLGdCQUFlLFNBQVMs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OiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbkEgQ29udGFjdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3MuXG4qL1xuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcbmltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIjtcblxuY29uc3QgY29udGFjdCA9IHtcbiAgbWFrZUNvbnRhY3Q6IChzb21ldGhpbmcpID0+e1xuICAgIGxldCB0aXRsZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaDFcIiwge2lkOiBcImNvbnRhY3RDYXJkdGl0bGVcIn0sIFwiQ29udGFjdCBDYXJkXCIpXG4gICAgbGV0IG5hbWUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2lkOiBcImNvbnRhY3RDYXJkTmFtZVwifSwgc29tZXRoaW5nLm5hbWUpXG4gICAgbGV0IHBob25lTnVtYmVyID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtpZDogXCJjb250YWN0Q2FyZFBob25lXCJ9LCBzb21ldGhpbmcucGhvbmVOdW1iZXIpXG4gICAgbGV0IGFkZHJlc3MgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2lkOiBcImNvbnRhY3RDYXJkQWRkcmVzc1wifSwgc29tZXRoaW5nLmFkZHJlc3MpXG4gICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwiYnV0dG9uXCIsIGlkOiBgZGVsZXRlQnV0dG9uLSR7c29tZXRoaW5nLmlkfWAsIHZhbHVlOiBcIkRlbGV0ZSBDb250YWN0IEluZm9ybWF0aW9uXCJ9LCBudWxsKVxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBldmVudElEID0gZXZlbnQudGFyZ2V0LmlkLnN1YnN0cmluZygxMywgMTUpXG4gICAgICBjb250YWN0TGlzdC5kZWxldGVMaXN0SXRlbShldmVudElEKVxuICAgICAgZGF0YWJhc2UuZGVsZXRlRGF0YShldmVudElEKVxuICAgIH0pXG4gICAgbGV0IGNhcmREaXYgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImRpdlwiLCB7aWQ6IGBjb250YWN0Q2FyZERpdi0ke3NvbWV0aGluZy5pZH1gfSwgbnVsbCwgdGl0bGUsIG5hbWUsIHBob25lTnVtYmVyLCBhZGRyZXNzLCBkZWxldGVCdXR0b24pXG4gICAgcmV0dXJuIGNhcmREaXZcbiAgfSxcblxuICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCIsIi8qXG5BIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCB0aGF0IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gc3RvcmFnZSwgYW5kIHNhdmVzIG5ldyBvbmVzLiBFYWNoIG5ldyBjb250YWN0IHNob3VsZCBoYXZlIGFuIGF1dG8tZ2VuZXJhdGVkIGlkZW50aWZpZXIuXG4qL1xuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuXG5jb25zdCBkYXRhYmFzZSA9IHtcbiAgZ2V0RGF0YTogKCkgPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXG4gICAgLnRoZW4oKGNvbnRhY3RzKT0+IGNvbnRhY3RzLmpzb24oKSlcbiAgICAudGhlbihhbGxDb250YWN0cyA9PiAoY29udGFjdExpc3QuZGlzcGxheUV4aXN0aW5nQ2FyZHMoYWxsQ29udGFjdHMpKSlcbiAgfSxcblxuICBzYXZlRGF0YTogKGNvbnRhY3RFbnRyeSk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0RW50cnkpXG4gICAgfSlcbiAgICAudGhlbihlbnRyeUluZm8gPT4gZW50cnlJbmZvLmpzb24oKSlcbiAgICAudGhlbihjb250YWN0SW5mbyA9PiAoY29udGFjdC5jcmVhdGVDb250YWN0Q2FyZChjb250YWN0SW5mbykpKVxuICB9LFxuXG4gIGRlbGV0ZURhdGE6IChpZCkgPT4ge1xuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7aWR9YCx7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICB9KVxuICAgIC50aGVuKGFsZXJ0KFwiWW91ciBjb250YWN0IGluZm9ybWF0aW9uIHdhcyBkZWxldGVkXCIpKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBkYXRhYmFzZSIsIi8qXG5BIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuKi9cblxuaW1wb3J0IGRhdGFiYXNlIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcblxuY29uc3QgY29udGFjdEZvcm0gPSB7XG4gIGZvcm1TdWJtaXQ6IChldmVudCk9PntcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuICAgIGlmKGZvcm0uY2hlY2tWYWxpZGl0eSgpPT09dHJ1ZSl7XG4gICAgICBsZXQgY29udGFjdE9iaiA9IHt9XG4gICAgICBjb250YWN0T2JqLm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIikudmFsdWVcbiAgICAgIGNvbnRhY3RPYmoucGhvbmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lTnVtYmVyXCIpLnZhbHVlXG4gICAgICBjb250YWN0T2JqLmFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIikudmFsdWVcbiAgICAgIGRhdGFiYXNlLnNhdmVEYXRhKGNvbnRhY3RPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidGhlIGZvcm0gaXMgaW52YWxpZFwiKVxuICAgIH1cbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RGb3JtIiwiLypBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuKi9cblxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xuXG5cbmNvbnN0IGNvbnRhY3RMaXN0ID0ge1xuICBkaXNwbGF5RXhpc3RpbmdDYXJkczogKGVudHJpZXMpID0+e1xuICAgIGxldCBvcmlnaW5hbEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIG9yaWdpbmFsRnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29udGFjdC5tYWtlQ29udGFjdChlbnRyeSkpXG4gICAgfSlcbiAgICBjb250YWN0TGlzdC5hZGRUb0xpc3Qob3JpZ2luYWxGcmFnbWVudClcbiAgfSxcbiAgYWRkVG9MaXN0IChmaW5hbEZyYWdtZW50KXtcbiAgICBsZXQgZGlzcGxheUNvbnRhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3BsYXlDb250YWN0XCIpXG4gICAgZGlzcGxheUNvbnRhY3QuYXBwZW5kQ2hpbGQoZmluYWxGcmFnbWVudClcbiAgfSxcbiAgZGVsZXRlTGlzdEl0ZW0oaWQpe1xuICAgIGxldCBkZWxldGVDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbnRhY3RDYXJkRGl2LSR7aWR9YClcbiAgICBsZXQgZGlzcGxheUNvbnRhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3BsYXlDb250YWN0XCIpXG4gICAgZGlzcGxheUNvbnRhY3QucmVtb3ZlQ2hpbGQoZGVsZXRlQ2FyZClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY29udGFjdExpc3QiLCJcbmNvbnN0IG1ha2VFbGVtZW50ID0ge1xuICBlbGVtZW50RmFjdG9yeTogKGVsLCBhdHRyaWJ1dGVzT2JqLCBjb250ZW50LCAuLi5jaGlsZHJlbik9PntcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpXG4gICAgLy8gU2V0IEF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXNPYmope1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc09ialthdHRyXSlcbiAgICB9XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQgfHwgbnVsbFxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlRWxlbWVudCIsIi8qXG5JbiBtYWluLmpzLCBpbXBvcnQgdGhlIENvbnRhY3RMaXN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RGb3JtIGNvbXBvbmVudC5cbiovXG5cbmltcG9ydCBjb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIjtcbmltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9wYWdlTGF5b3V0XCJcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKXtcbiAgbWFrZVBhZ2UuaW5pdGlhdGVGb3JtKCk7XG4gIGRhdGFiYXNlLmdldERhdGEoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PiBjb250YWN0Rm9ybS5mb3JtU3VibWl0KGV2ZW50KSlcbn1cblxuXG4iLCJpbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuXG5jb25zdCBtYWtlUGFnZSA9IHtcbiAgYnVpbGRGb3JtOiAobmFtZSwgVGl0bGUpID0+IHtcbiAgICBsZXQgbGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IG5hbWV9LCBUaXRsZSlcbiAgICBsZXQgaW5wdXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgbmFtZTogbmFtZSwgaWQ6IG5hbWUsIHJlcXVpcmVkOiB0cnVlfSlcbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBsYWJlbCwgaW5wdXQpXG4gICAgcmV0dXJuIGZpZWxkc2V0XG4gIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IG5hbWVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcIm5hbWVcIiwgXCJOYW1lXCIpXG4gICAgbGV0IHBob25lTnVtYmVyRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJwaG9uZU51bWJlclwiLCBcIlBob25lIE51bWJlclwiKVxuICAgIGxldCBhZGRyZXNzRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJhZGRyZXNzXCIsIFwiU3RyZWV0IEFkZHJlc3NcIilcbiAgICBsZXQgc3VibWl0QnV0dG9uID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJidXR0b25cIiwge3R5cGU6IFwic3VibWl0XCIsIGlkOiBcInN1Ym1pdEJ1dHRvblwifSwgXCJTYXZlIENvbnRhY3QgSW5mb3JtYXRpb25cIilcbiAgICBsZXQgZm9ybSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZm9ybVwiLCB7fSwgbnVsbCwgbmFtZUVudHJ5LCBwaG9uZU51bWJlckVudHJ5LCBhZGRyZXNzRW50cnksIHN1Ym1pdEJ1dHRvbilcbiAgICBtYWtlUGFnZS5hcHBlbmRGb3JtKGZvcm0pXG4gIH0sXG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1EaXNwbGF5XCIpXG4gICAgZm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm0pXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtRnJhZ21lbnQpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIl19
